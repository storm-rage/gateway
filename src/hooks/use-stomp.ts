import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { getSettingUserSchData } from '@/pages/system-manage/methods/index';

const TOPIC = '/topic/realtime-data';

/**
 * 自定义 Hook：用于管理 WebSocket STOMP 连接
 * @returns {Object} 包含连接状态、数据、日志和原始客户端的响应式数据
 */
export const useRealtimeData = () => {
  // 状态定义
  const [connected, setConnected] = useState(false);
  const [realtimeData, setRealtimeData] = useState(null); // 存储解析后的 JSON 数据
  const [logs, setLogs] = useState([]); // 存储运行日志
  const [messageCount, setMessageCount] = useState(0); // 消息计数器

  // 添加日志的辅助函数
  const addLog = (text, type = 'info') => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { id: Date.now(), time, text, type }]);
  };

  useEffect(() => {
    console.log('🚀 RealtimeData Hook 挂载，正在初始化连接...');

    let clientInstance: Client | undefined;
    
    // 异步获取 WebSocket URL 并初始化连接
    const initWebSocket = async () => {
      const businessData = await getSettingUserSchData()
      const WS_URL = businessData?.records?.[0]?.configValue
      
      console.log('📡 WebSocket URL:', WS_URL)
      
      if (!WS_URL || WS_URL.includes('undefined')) {
        console.error('❌ WebSocket URL 获取失败:', WS_URL)
        addLog('WebSocket URL 配置错误', 'error')
        return
      }

      // 1. 初始化 STOMP 客户端
      const client = new Client({
        webSocketFactory: () => new SockJS(WS_URL),
        // 心跳配置
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        reconnectDelay: 3000,

        // 连接成功回调
        onConnect: (frame) => {
          console.log('✅ STOMP 握手成功', frame);
          addLog(`连接建立`, 'success');
          setConnected(true);

          // 2. 订阅主题
          client.subscribe(TOPIC, (message) => {
            setMessageCount(prev => prev + 1);
            addLog(`收到数据 (${message.body.length}字节)`, 'info');
            
            try {
              // 解析 JSON 并更新状态
              const data = JSON.parse(message.body);
              setRealtimeData(data);
            } catch (error) {
              addLog(`数据解析失败: ${error.message}`, 'error');
              console.error('JSON Parse Error:', error);
            }
          });
        },

        // 错误处理
        onStompError: (frame) => {
          addLog(`STOMP 错误: ${frame.headers['message']}`, 'error');
        },
        onWebSocketClose: (evt) => {
          setConnected(false);
          addLog(`连接断开: ${evt.reason || '未知原因'}`, 'warning');
        },
        onWebSocketError: (evt) => {
          addLog(`WebSocket 错误: ${evt.message}`, 'error');
        }
      });

      // 3. 激活连接
      client.activate();

      // 4. 保存 client 引用以便清理
      clientInstance = client;
    };

    initWebSocket();

    // 5. 清理函数 (组件卸载时执行)
    return () => {
      console.log('🛑 RealtimeData Hook 卸载，正在断开连接...');
      if (clientInstance && clientInstance.active) {
        clientInstance.deactivate().then(() => {
          addLog('连接已安全断开', 'info');
        });
      }
    };
  }, []); // 空依赖数组确保只在组件挂载/卸载时执行

  // 暴露数据供组件使用
  return {
    connected,      // Boolean: 当前连接状态
    realtimeData,   // Object: 最新的 JSON 数据
    logs,           // Array: 运行日志列表
    messageCount,   // Number: 接收的消息总数
    // 如果你需要在特殊情况下手动操作（如强制重连），可以暴露 client
    // 注意：通常不需要暴露 client，除非有高级需求
  };
};