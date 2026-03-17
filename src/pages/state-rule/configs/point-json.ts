export default {
  WT: [
    {
      label: "远景大状态模板",
      value: "1",
      pointName: "MState",
      formula: [
    {
        "rule": "Turstatus in (8)||(ConGridsideVoltageL1L2@1m@MAX-ConGridsideVoltageL1L2@1m@MIN==0 && WindSpeed1@1m@MAX-WindSpeed1@1m@MIN==0)",
        "duration": 0,
        "priority": 1,
        "ruleBefore": "",
        "mainStateCode": 7,
        "mainStateName": "通讯中断"
    },
    {
        "rule": "WindSpeed1@1m@AVG==null",
        "duration": 0,
        "priority": 1,
        "ruleBefore": "",
        "mainStateCode": 7,
        "mainStateName": "通讯中断"
    },
    {
        "rule": "Turstatus in (5) ",
        "duration": 0,
        "priority": 2,
        "ruleBefore": "",
        "mainStateCode": 1,
        "mainStateName": "正常发电"
    },
    {
        "rule": "Turstatus in (7)",
        "duration": 0,
        "priority": 3,
        "ruleBefore": "",
        "mainStateCode": 2,
        "mainStateName": "限功率"
    },
    {
        "rule": "Turstatus in (3,6,9)",
        "duration": 0,
        "priority": 4,
        "ruleBefore": "",
        "mainStateCode": 3,
        "mainStateName": "待机"
    },
    {
        "rule": "Turstatus in (11,12) ",
        "duration": 0,
        "priority": 5,
        "ruleBefore": "",
        "mainStateCode": 4,
        "mainStateName": "维护"
    },
    {
        "rule": "Turstatus in (1,4) ",
        "duration": 0,
        "priority": 6,
        "ruleBefore": "",
        "mainStateCode": 5,
        "mainStateName": "停机"
    },
    {
        "rule": "Turstatus in (2) ",
        "duration": 0,
        "priority": 7,
        "ruleBefore": "",
        "mainStateCode": 6,
        "mainStateName": "故障"
    }
      ],
      input_points: "Turstatus,WindSpeed1,ConGridsideVoltageL1L2@1m@MAX,ConGridsideVoltageL1L2@1m@MIN==0,WindSpeed1@1m@MAX,WindSpeed1@1m@MIN,WindSpeed1@1m@AVG",
    },
    {
      label: "远景小状态模板",
      value: "2",
      pointName: "SState",
      formula: [
    {
        "rule": "Turstatus in (8) || (ConGridsideVoltageL1L2@1m@MAX-ConGridsideVoltageL1L2@1m@MIN==0 && WindSpeed1@1m@MAX-WindSpeed1@1m@MIN==0)",
        "duration": 0,
        "priority": 0,
        "ruleBefore": "",
        "subStateCode": 37,
        "subStateName": "通讯中断"
    },
    {
        "rule": "WindSpeed1@1m@AVG == null",
        "duration": 0,
        "priority": 0,
        "ruleBefore": "",
        "subStateCode": 37,
        "subStateName": "通讯中断"
    },
    {
        "rule": "Turstatus in (5)",
        "duration": 0,
        "priority": 10,
        "ruleBefore": "",
        "subStateCode": 1,
        "subStateName": "正常发电"
    },
    {
        "rule": "Turstatus in (7)",
        "duration": 0,
        "priority": 20,
        "ruleBefore": "",
        "subStateCode": 2,
        "subStateName": "电网限功率"
    },
    {
        "rule": "Turstatus in (3,6,9) && AmbientTemp < -15",
        "duration": 0,
        "priority": 30,
        "ruleBefore": "",
        "subStateCode": 8,
        "subStateName": "温度低待机"
    },
    {
        "rule": "Turstatus in (3,6,9) && AmbientTemp > 35",
        "duration": 0,
        "priority": 30,
        "ruleBefore": "",
        "subStateCode": 9,
        "subStateName": "温度高待机"
    },
    {
        "rule": "Turstatus in (3,6,9) && WindSpeed1@10m@AVG > 20",
        "duration": 0,
        "priority": 31,
        "ruleBefore": "",
        "subStateCode": 7,
        "subStateName": "大风切出"
    },
    {
        "rule": "Turstatus in (3,6,9) && WindSpeed1@10m@AVG > 4 && WindSpeed1@10m@AVG < 20",
        "duration": 0,
        "priority": 31,
        "ruleBefore": "",
        "subStateCode": 11,
        "subStateName": "异常待机"
    },
    {
        "rule": "Turstatus in (3,6,9)",
        "duration": 0,
        "priority": 32,
        "ruleBefore": "",
        "subStateCode": 6,
        "subStateName": "小风待机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'101' in signState",
        "subStateCode": 12,
        "subStateName": "检测维护"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'102' in signState",
        "subStateCode": 13,
        "subStateName": "定检维护"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'103' in signState",
        "subStateCode": 14,
        "subStateName": "巡检维护"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'104' in signState",
        "subStateCode": 15,
        "subStateName": "缺陷维护"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'105' in signState",
        "subStateCode": 16,
        "subStateName": "技改维护"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'106' in signState",
        "subStateCode": 17,
        "subStateName": "预警维护"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'107' in signState",
        "subStateCode": 18,
        "subStateName": "覆冰"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'108' in signState",
        "subStateCode": 19,
        "subStateName": "台风"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'109' in signState",
        "subStateCode": 20,
        "subStateName": "地震"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'110' in signState",
        "subStateCode": 21,
        "subStateName": "民事原因"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'111' in signState",
        "subStateCode": 22,
        "subStateName": "新建风机接入"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'112' in signState",
        "subStateCode": 23,
        "subStateName": "扇区管理停机"
    },
    {
        "rule": "WTUR_Bool_Rd_b1_LimPowStopState == 1",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'113' in signState ||",
        "subStateCode": 24,
        "subStateName": "电网限功率停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'114' in signState",
        "subStateCode": 25,
        "subStateName": "现货交易停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'116' in signState",
        "subStateCode": 27,
        "subStateName": "电气检测停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'117' in signState",
        "subStateCode": 28,
        "subStateName": "电气定检停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'118' in signState",
        "subStateCode": 29,
        "subStateName": "电气巡检停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'119' in signState",
        "subStateCode": 30,
        "subStateName": "电气缺陷停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'120' in signState",
        "subStateCode": 31,
        "subStateName": "电气技改停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'121' in signState",
        "subStateCode": 32,
        "subStateName": "电气故障停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'122' in signState",
        "subStateCode": 33,
        "subStateName": "电网故障停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'123' in signState",
        "subStateCode": 34,
        "subStateName": "电网检修停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'124' in signState",
        "subStateCode": 35,
        "subStateName": "故障检修"
    },
    {
        "rule": "Turstatus in (1,4)",
        "duration": 0,
        "priority": 50,
        "ruleBefore": "",
        "subStateCode": 26,
        "subStateName": "其他原因停机"
    },
    {
        "rule": "Turstatus in (2)",
        "duration": 0,
        "priority": 50,
        "ruleBefore": "",
        "subStateCode": 36,
        "subStateName": "故障停机"
    }
    ],
      input_points: "Turstatus,WindSpeed1,ConGridsideVoltageL1L2@1m@MAX,ConGridsideVoltageL1L2@1m@MIN==0,WindSpeed1@1m@MAX,WindSpeed1@1m@MIN,WindSpeed1@1m@AVG,AmbientTemp,WTUR_Bool_Rd_b1_LimPowStopState",
    },
    {
      label: "金风大状态模板",
      value: "1",
      pointName: "MState",
      formula: [
    {
        "rule": "ConGridsideVoltageL1L2@1m@MAX-ConGridsideVoltageL1L2@1m@MIN==0 && WindSpeed1@1m@MAX-WindSpeed1@1m@MIN==0",
        "duration": 0,
        "priority": 1,
        "ruleBefore": "",
        "mainStateCode": 7,
        "mainStateName": "通讯中断"
    },
    {
        "rule": "WindSpeed1@1m@AVG==null",
        "duration": 0,
        "priority": 1,
        "ruleBefore": "",
        "mainStateCode": 7,
        "mainStateName": "通讯中断"
    },
    {
        "rule": "Turstatus in (5) ",
        "duration": 0,
        "priority": 3,
        "ruleBefore": "",
        "mainStateCode": 1,
        "mainStateName": "正常发电"
    },
    {
        "rule": "WTUR_Other_Wn_F32_StopModeWord in (82,83,100,101)",
        "duration": 0,
        "priority": 2,
        "ruleBefore": "",
        "mainStateCode": 2,
        "mainStateName": "限功率"
    },
    {
        "rule": "Turstatus in (3,4)||WTUR_Other_Wn_F32_StopModeWord in (10,11,12,9,15,16,22,38)",
        "duration": 0,
        "priority": 4,
        "ruleBefore": "",
        "mainStateCode": 3,
        "mainStateName": "待机"
    },
    {
        "rule": "Turstatus in (6) ",
        "duration": 0,
        "priority": 5,
        "ruleBefore": "",
        "mainStateCode": 4,
        "mainStateName": "维护"
    },
    {
        "rule": "Turstatus in (0,1,2) ",
        "duration": 0,
        "priority": 7,
        "ruleBefore": "",
        "mainStateCode": 5,
        "mainStateName": "停机"
    },
    {
        "rule": "Turstatus in (1,2)&& WTUR_Flt_Ri_F32_main>0 ",
        "duration": 0,
        "priority": 6,
        "ruleBefore": "",
        "mainStateCode": 6,
        "mainStateName": "故障"
    }
      ],
      input_points: "Turstatus,WindSpeed1,ConGridsidePhaseVolL1L2@1m@MAX,ConGridsidePhaseVolL1L2@1m@MIN,WindSpeed1@1m@MAX,WindSpeed1@1m@MIN,WindSpeed1@1m@AVG,WTUR_Flt_Ri_F32_main,WTUR_Other_Wn_F32_StopModeWord,",
    },
    {
      label: "金风小状态模板",
      value: "2",
      pointName: "SState",
      formula: [
    {
        "rule": "ConGridsideVoltageL1L2@1m@MAX-ConGridsideVoltageL1L2@1m@MIN==0 && WindSpeed1@1m@MAX-WindSpeed1@1m@MIN==0",
        "duration": 0,
        "priority": 0,
        "ruleBefore": "",
        "subStateCode": 37,
        "subStateName": "通讯中断"
    },
    {
        "rule": "WindSpeed1@1m@AVG == null",
        "duration": 0,
        "priority": 0,
        "ruleBefore": "",
        "subStateCode": 37,
        "subStateName": "通讯中断"
    },
    {
        "rule": "WTUR_Other_Wn_F32_StopModeWord in (81)",
        "duration": 0,
        "priority": 10,
        "ruleBefore": "",
        "subStateCode": 1,
        "subStateName": "正常发电"
    },
    {
        "rule": "WTUR_Other_Wn_F32_StopModeWord in (83)",
        "duration": 0,
        "priority": 20,
        "ruleBefore": "",
        "subStateCode": 2,
        "subStateName": "电网限功率"
    },
    {
        "rule": "WTUR_Other_Wn_F32_StopModeWord in (82)",
        "duration": 0,
        "priority": 20,
        "ruleBefore": "",
        "subStateCode": 3,
        "subStateName": "主控限功率"
    },
    {
        "rule": "WTUR_Other_Wn_F32_StopModeWord in (98)",
        "duration": 0,
        "priority": 20,
        "ruleBefore": "",
        "subStateCode": 4,
        "subStateName": "手动限功率"
    },
    {
        "rule": "WTUR_Other_Wn_F32_StopModeWord in (105)",
        "duration": 0,
        "priority": 20,
        "ruleBefore": "",
        "subStateCode": 5,
        "subStateName": "结冰限功率"
    },
    {
        "rule": "WTUR_Other_Wn_F32_StopModeWord in (18)",
        "duration": 0,
        "priority": 30,
        "ruleBefore": "",
        "subStateCode": 8,
        "subStateName": "温度低待机"
    },
    {
        "rule": "WTUR_Other_Wn_F32_StopModeWord in (17)",
        "duration": 0,
        "priority": 30,
        "ruleBefore": "",
        "subStateCode": 9,
        "subStateName": "温度高待机"
    },
    {
        "rule": "WTUR_Other_Wn_F32_StopModeWord in (13)",
        "duration": 0,
        "priority": 31,
        "ruleBefore": "",
        "subStateCode": 7,
        "subStateName": "大风切出"
    },
    {
        "rule": "WTUR_Other_Wn_F32_StopModeWord in (9,15,16,22,38)",
        "duration": 0,
        "priority": 31,
        "ruleBefore": "",
        "subStateCode": 10,
        "subStateName": "技术性待机"
    },
    {
        "rule": "Turstatus in (3,4) && WindSpeed1@10m@AVG > 4 && WindSpeed1@10m@AVG < 20",
        "duration": 0,
        "priority": 32,
        "ruleBefore": "",
        "subStateCode": 11,
        "subStateName": "异常待机"
    },
    {
        "rule": "WTUR_Other_Wn_F32_StopModeWord in (10,11,12,85,86,87)",
        "duration": 0,
        "priority": 31,
        "ruleBefore": "",
        "subStateCode": 6,
        "subStateName": "小风待机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'101' in signState",
        "subStateCode": 12,
        "subStateName": "检测维护"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'102' in signState",
        "subStateCode": 13,
        "subStateName": "定检维护"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'103' in signState",
        "subStateCode": 14,
        "subStateName": "巡检维护"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'104' in signState",
        "subStateCode": 15,
        "subStateName": "缺陷维护"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'105' in signState",
        "subStateCode": 16,
        "subStateName": "技改维护"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'106' in signState",
        "subStateCode": 17,
        "subStateName": "预警维护"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'107' in signState",
        "subStateCode": 18,
        "subStateName": "覆冰"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'108' in signState",
        "subStateCode": 19,
        "subStateName": "台风"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'109' in signState",
        "subStateCode": 20,
        "subStateName": "地震"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'110' in signState",
        "subStateCode": 21,
        "subStateName": "民事原因"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'111' in signState",
        "subStateCode": 22,
        "subStateName": "新建风机接入"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'112' in signState",
        "subStateCode": 23,
        "subStateName": "扇区管理停机"
    },
    {
        "rule": "WTUR_Other_Wn_F32_StopModeWord in (100，101)",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'113' in signState ||",
        "subStateCode": 24,
        "subStateName": "电网限功率停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'114' in signState",
        "subStateCode": 25,
        "subStateName": "现货交易停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'116' in signState",
        "subStateCode": 27,
        "subStateName": "电气检测停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'117' in signState",
        "subStateCode": 28,
        "subStateName": "电气定检停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'118' in signState",
        "subStateCode": 29,
        "subStateName": "电气巡检停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'119' in signState",
        "subStateCode": 30,
        "subStateName": "电气缺陷停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'120' in signState",
        "subStateCode": 31,
        "subStateName": "电气技改停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'121' in signState",
        "subStateCode": 32,
        "subStateName": "电气故障停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'122' in signState",
        "subStateCode": 33,
        "subStateName": "电网故障停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'123' in signState",
        "subStateCode": 34,
        "subStateName": "电网检修停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'124' in signState",
        "subStateCode": 35,
        "subStateName": "故障检修"
    },
    {
        "rule": "Turstatus in (0,1,2)",
        "duration": 0,
        "priority": 50,
        "ruleBefore": "",
        "subStateCode": 26,
        "subStateName": "其他原因停机"
    },
    {
        "rule": "Turstatus in (1,2)&& WTUR_Flt_Ri_F32_main>0",
        "duration": 0,
        "priority": 50,
        "ruleBefore": "",
        "subStateCode": 36,
        "subStateName": "故障停机"
    }
      ],
      input_points: "Turstatus,WindSpeed1,ConGridsidePhaseVolL1L2@1m@MAX,ConGridsidePhaseVolL1L2@1m@MIN,WindSpeed1@1m@MAX,WindSpeed1@1m@MIN,WindSpeed1@1m@AVG,WTUR_Flt_Ri_F32_main,WTUR_Other_Wn_F32_StopModeWord,",
    },
    {
      label: "海装大状态模板",
      value: "1",
      pointName: "MState",
      formula: [
    {
        "rule": "ConGridsideVoltageL1L2@1m@MAX-ConGridsideVoltageL1L2@1m@MIN==0 && WindSpeed1@1m@MAX-WindSpeed1@1m@MIN==0",
        "duration": 0,
        "priority": 1,
        "ruleBefore": "",
        "mainStateCode": 7,
        "mainStateName": "通讯中断"
    },
    {
        "rule": "WindSpeed1@1m@AVG==null",
        "duration": 0,
        "priority": 1,
        "ruleBefore": "",
        "mainStateCode": 7,
        "mainStateName": "通讯中断"
    },
    {
        "rule": "Turstatus in (32) ",
        "duration": 0,
        "priority": 3,
        "ruleBefore": "",
        "mainStateCode": 1,
        "mainStateName": "正常发电"
    },
    {
        "rule": "WTUR_Bool_Rd_b0_0008==1",
        "duration": 0,
        "priority": 2,
        "ruleBefore": "",
        "mainStateCode": 2,
        "mainStateName": "限功率"
    },
    {
        "rule": "Turstatus in (4,8,16)",
        "duration": 0,
        "priority": 4,
        "ruleBefore": "",
        "mainStateCode": 3,
        "mainStateName": "待机"
    },
    {
        "rule": "Turstatus in (64) ",
        "duration": 0,
        "priority": 5,
        "ruleBefore": "",
        "mainStateCode": 4,
        "mainStateName": "维护"
    },
    {
        "rule": "Turstatus in (1,2) ",
        "duration": 0,
        "priority": 7,
        "ruleBefore": "",
        "mainStateCode": 5,
        "mainStateName": "停机"
    },
    {
        "rule": "WTUR_Bool_Rd_b0_0001==1",
        "duration": 0,
        "priority": 6,
        "ruleBefore": "",
        "mainStateCode": 6,
        "mainStateName": "故障"
    }
      ],
      input_points: "Turstatus,WindSpeed1,ConGridsidePhaseVolL1L2@1m@MAX,ConGridsidePhaseVolL1L2@1m@MIN,WindSpeed1@1m@MAX,WindSpeed1@1m@MIN,WindSpeed1@1m@AVG,WTUR_Bool_Rd_b0_0008,WTUR_Bool_Rd_b0_0001",
    },
    {
      label: "海装小状态模板",
      value: "2",
      pointName: "SState",
      formula: [
    {
        "rule": "ConGridsideVoltageL1L2@1m@MAX-ConGridsideVoltageL1L2@1m@MIN==0 && WindSpeed1@1m@MAX-WindSpeed1@1m@MIN==0",
        "duration": 0,
        "priority": 0,
        "ruleBefore": "",
        "subStateCode": 37,
        "subStateName": "通讯中断"
    },
    {
        "rule": "WindSpeed1@1m@AVG == null",
        "duration": 0,
        "priority": 0,
        "ruleBefore": "",
        "subStateCode": 37,
        "subStateName": "通讯中断"
    },
    {
        "rule": "Turstatus in (32) ",
        "duration": 0,
        "priority": 10,
        "ruleBefore": "",
        "subStateCode": 1,
        "subStateName": "正常发电"
    },
    {
        "rule": "WTUR_Bool_Rd_b0_0074==1",
        "duration": 0,
        "priority": 20,
        "ruleBefore": "",
        "subStateCode": 2,
        "subStateName": "电网限功率"
    },
    {
        "rule": "WTUR_Bool_Rd_b0_0072==1",
        "duration": 0,
        "priority": 20,
        "ruleBefore": "",
        "subStateCode": 3,
        "subStateName": "主控限功率"
    },
    {
        "rule": "WTUR_Bool_Rd_b0_0073==1",
        "duration": 0,
        "priority": 20,
        "ruleBefore": "",
        "subStateCode": 4,
        "subStateName": "手动限功率"
    },
    {
        "rule": "Turstatus in (4,8,16) && WTUR_Bool_Rd_b0_0085 ==1",
        "duration": 0,
        "priority": 30,
        "ruleBefore": "",
        "subStateCode": 8,
        "subStateName": "温度低待机"
    },
    {
        "rule": "Turstatus in (4,8,16) && AmbientTemp>40",
        "duration": 0,
        "priority": 30,
        "ruleBefore": "",
        "subStateCode": 9,
        "subStateName": "温度高待机"
    },
    {
        "rule": "Turstatus in (4,8,16) && WindSpeed1@10m@AVG>20",
        "duration": 0,
        "priority": 31,
        "ruleBefore": "",
        "subStateCode": 7,
        "subStateName": "大风切出"
    },
    {
        "rule": "WTUR_Bool_Rd_b0_0616 in (1)",
        "duration": 0,
        "priority": 31,
        "ruleBefore": "",
        "subStateCode": 10,
        "subStateName": "技术性待机"
    },
    {
        "rule": "Turstatus in (4,8,16) && WindSpeed1@10m@AVG > 4 && WindSpeed1@10m@AVG < 20",
        "duration": 0,
        "priority": 32,
        "ruleBefore": "",
        "subStateCode": 11,
        "subStateName": "异常待机"
    },
    {
        "rule": "Turstatus in (4,8,16)",
        "duration": 0,
        "priority": 31,
        "ruleBefore": "",
        "subStateCode": 6,
        "subStateName": "小风待机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'101' in signState",
        "subStateCode": 12,
        "subStateName": "检测维护"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'102' in signState",
        "subStateCode": 13,
        "subStateName": "定检维护"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'103' in signState",
        "subStateCode": 14,
        "subStateName": "巡检维护"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'104' in signState",
        "subStateCode": 15,
        "subStateName": "缺陷维护"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'105' in signState",
        "subStateCode": 16,
        "subStateName": "技改维护"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'106' in signState",
        "subStateCode": 17,
        "subStateName": "预警维护"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'107' in signState",
        "subStateCode": 18,
        "subStateName": "覆冰"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'108' in signState",
        "subStateCode": 19,
        "subStateName": "台风"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'109' in signState",
        "subStateCode": 20,
        "subStateName": "地震"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'110' in signState",
        "subStateCode": 21,
        "subStateName": "民事原因"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'111' in signState",
        "subStateCode": 22,
        "subStateName": "新建风机接入"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'112' in signState",
        "subStateCode": 23,
        "subStateName": "扇区管理停机"
    },
    {
        "rule": "Turstatus in (1,2)&&WTUR_Bool_Rd_b0_0008==1&&GridsideActivePower <1",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'113' in signState ||",
        "subStateCode": 24,
        "subStateName": "电网限功率停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'114' in signState",
        "subStateCode": 25,
        "subStateName": "现货交易停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'116' in signState",
        "subStateCode": 27,
        "subStateName": "电气检测停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'117' in signState",
        "subStateCode": 28,
        "subStateName": "电气定检停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'118' in signState",
        "subStateCode": 29,
        "subStateName": "电气巡检停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'119' in signState",
        "subStateCode": 30,
        "subStateName": "电气缺陷停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'120' in signState",
        "subStateCode": 31,
        "subStateName": "电气技改停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'121' in signState",
        "subStateCode": 32,
        "subStateName": "电气故障停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'122' in signState",
        "subStateCode": 33,
        "subStateName": "电网故障停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'123' in signState",
        "subStateCode": 34,
        "subStateName": "电网检修停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'124' in signState",
        "subStateCode": 35,
        "subStateName": "故障检修"
    },
    {
        "rule": "Turstatus in (1,2)",
        "duration": 0,
        "priority": 50,
        "ruleBefore": "",
        "subStateCode": 26,
        "subStateName": "其他原因停机"
    },
    {
        "rule": "WTUR_Bool_Rd_b0_0001==1",
        "duration": 0,
        "priority": 50,
        "ruleBefore": "",
        "subStateCode": 36,
        "subStateName": "故障停机"
    }
      ],
      input_points: "Turstatus,WindSpeed1,AmbientTemp,GridsideActivePower,ConGridsidePhaseVolL1L2@1m@MAX,ConGridsidePhaseVolL1L2@1m@MIN,WindSpeed1@1m@MAX,WindSpeed1@1m@MIN,WindSpeed1@1m@AVG,WindSpeed1@10m@AVG,WTUR_Bool_Rd_b0_0001,WTUR_Bool_Rd_b0_0008,WTUR_Bool_Rd_b0_0072,WTUR_Bool_Rd_b0_0073,WTUR_Bool_Rd_b0_0074,WTUR_Bool_Rd_b0_0085,WTUR_Bool_Rd_b0_0616",
    },
    {
      label: "北车大状态模板",
      value: "1",
      pointName: "MState",
      formula: [
    {
        "rule": "ConGridsideVoltageL1L2@1m@MAX-ConGridsideVoltageL1L2@1m@MIN==0 && WindSpeed1@1m@MAX-WindSpeed1@1m@MIN==0",
        "duration": 0,
        "priority": 1,
        "ruleBefore": "",
        "mainStateCode": 7,
        "mainStateName": "通讯中断"
    },
    {
        "rule": "WindSpeed1@1m@AVG==null",
        "duration": 0,
        "priority": 1,
        "ruleBefore": "",
        "mainStateCode": 7,
        "mainStateName": "通讯中断"
    },
    {
        "rule": "WTUR_Bool_Rd_b0_4==1",
        "duration": 0,
        "priority": 3,
        "ruleBefore": "",
        "mainStateCode": 1,
        "mainStateName": "正常发电"
    },
    {
        "rule": "WTUR_Bool_Rd_b0_5==1||WTUR_Bool_Rd_b0_6==1||WTUR_Bool_Rd_b0_9==1||WTUR_Bool_Rd_b0_14==1",
        "duration": 0,
        "priority": 2,
        "ruleBefore": "",
        "mainStateCode": 2,
        "mainStateName": "限功率"
    },
    {
        "rule": "WTUR_Bool_Rd_b0_1==1||WTUR_Bool_Rd_b0_2==1||WTUR_Bool_Rd_b0_3==1||WTUR_Bool_Rd_b0_10==1||WTUR_Bool_Rd_b0_11==1||WTUR_Bool_Rd_b0_12==1",
        "duration": 0,
        "priority": 4,
        "ruleBefore": "",
        "mainStateCode": 3,
        "mainStateName": "待机"
    },
    {
        "rule": "WTUR_Bool_Rd_b0_13==1 ",
        "duration": 0,
        "priority": 5,
        "ruleBefore": "",
        "mainStateCode": 4,
        "mainStateName": "维护"
    },
    {
        "rule": "WTUR_Bool_Rd_b0_8==1",
        "duration": 0,
        "priority": 7,
        "ruleBefore": "",
        "mainStateCode": 5,
        "mainStateName": "停机"
    },
    {
        "rule": "WTUR_Bool_Rd_b0_7==1",
        "duration": 0,
        "priority": 6,
        "ruleBefore": "",
        "mainStateCode": 6,
        "mainStateName": "故障"
    }
      ],
      input_points: "WindSpeed1,ConGridsidePhaseVolL1L2@1m@MAX,ConGridsidePhaseVolL1L2@1m@MIN,WindSpeed1@1m@MAX,WindSpeed1@1m@MIN,WindSpeed1@1m@AVG,WTUR_Bool_Rd_b0_1,WTUR_Bool_Rd_b0_2,WTUR_Bool_Rd_b0_3,WTUR_Bool_Rd_b0_4,WTUR_Bool_Rd_b0_5,WTUR_Bool_Rd_b0_6,WTUR_Bool_Rd_b0_7,WTUR_Bool_Rd_b0_8,WTUR_Bool_Rd_b0_9,WTUR_Bool_Rd_b0_10,WTUR_Bool_Rd_b0_10,WTUR_Bool_Rd_b0_11,WTUR_Bool_Rd_b0_12,WTUR_Bool_Rd_b0_13,WTUR_Bool_Rd_b0_14",
    },
    {
      label: "北车小状态模板",
      value: "2",
      pointName: "SState",
      formula: [
    {
        "rule": "ConGridsideVoltageL1L2@1m@MAX-ConGridsideVoltageL1L2@1m@MIN==0 && WindSpeed1@1m@MAX-WindSpeed1@1m@MIN==0",
        "duration": 0,
        "priority": 0,
        "ruleBefore": "",
        "subStateCode": 37,
        "subStateName": "通讯中断"
    },
    {
        "rule": "WindSpeed1@1m@AVG == null",
        "duration": 0,
        "priority": 0,
        "ruleBefore": "",
        "subStateCode": 37,
        "subStateName": "通讯中断"
    },
    {
        "rule": "WTUR_Bool_Rd_b0_4==1",
        "duration": 0,
        "priority": 10,
        "ruleBefore": "",
        "subStateCode": 1,
        "subStateName": "正常发电"
    },
    {
        "rule": "WTUR_Bool_Rd_b0_5==1||WTUR_Bool_Rd_b0_9==1||WTUR_Bool_Rd_b0_14==1||UR_Bool_Rd_b0_6==1",
        "duration": 0,
        "priority": 20,
        "ruleBefore": "",
        "subStateCode": 2,
        "subStateName": "电网限功率"
    },
    {
        "rule": "WTUR_Bool_Rd_b0_12==1",
        "duration": 0,
        "priority": 30,
        "ruleBefore": "",
        "subStateCode": 8,
        "subStateName": "温度低待机"
    },
    {
        "rule": "WTUR_Bool_Rd_b0_11==1",
        "duration": 0,
        "priority": 30,
        "ruleBefore": "",
        "subStateCode": 9,
        "subStateName": "温度高待机"
    },
    {
        "rule": "WTUR_Bool_Rd_b0_10==1",
        "duration": 0,
        "priority": 31,
        "ruleBefore": "",
        "subStateCode": 7,
        "subStateName": "大风切出"
    },
    {
        "rule": "WTUR_Bool_Rd_b0_1==1",
        "duration": 0,
        "priority": 31,
        "ruleBefore": "",
        "subStateCode": 10,
        "subStateName": "技术性待机"
    },
    {
        "rule": "WTUR_Bool_Rd_b0_2==1&& WindSpeed1@10m@AVG > 4 && WindSpeed1@10m@AVG < 20",
        "duration": 0,
        "priority": 32,
        "ruleBefore": "",
        "subStateCode": 11,
        "subStateName": "异常待机"
    },
    {
        "rule": "WTUR_Bool_Rd_b0_2==1||WTUR_Bool_Rd_b0_3==1",
        "duration": 0,
        "priority": 31,
        "ruleBefore": "",
        "subStateCode": 6,
        "subStateName": "小风待机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'101' in signState",
        "subStateCode": 12,
        "subStateName": "检测维护"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'102' in signState",
        "subStateCode": 13,
        "subStateName": "定检维护"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'103' in signState",
        "subStateCode": 14,
        "subStateName": "巡检维护"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'104' in signState",
        "subStateCode": 15,
        "subStateName": "缺陷维护"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'105' in signState",
        "subStateCode": 16,
        "subStateName": "技改维护"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'106' in signState",
        "subStateCode": 17,
        "subStateName": "预警维护"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'107' in signState",
        "subStateCode": 18,
        "subStateName": "覆冰"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'108' in signState",
        "subStateCode": 19,
        "subStateName": "台风"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'109' in signState",
        "subStateCode": 20,
        "subStateName": "地震"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'110' in signState",
        "subStateCode": 21,
        "subStateName": "民事原因"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'111' in signState",
        "subStateCode": 22,
        "subStateName": "新建风机接入"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'112' in signState",
        "subStateCode": 23,
        "subStateName": "扇区管理停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'113' in signState",
        "subStateCode": 24,
        "subStateName": "电网限功率停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'114' in signState",
        "subStateCode": 25,
        "subStateName": "现货交易停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'116' in signState",
        "subStateCode": 27,
        "subStateName": "电气检测停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'117' in signState",
        "subStateCode": 28,
        "subStateName": "电气定检停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'118' in signState",
        "subStateCode": 29,
        "subStateName": "电气巡检停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'119' in signState",
        "subStateCode": 30,
        "subStateName": "电气缺陷停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'120' in signState",
        "subStateCode": 31,
        "subStateName": "电气技改停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'121' in signState",
        "subStateCode": 32,
        "subStateName": "电气故障停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'122' in signState",
        "subStateCode": 33,
        "subStateName": "电网故障停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'123' in signState",
        "subStateCode": 34,
        "subStateName": "电网检修停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 40,
        "ruleBefore": "'124' in signState",
        "subStateCode": 35,
        "subStateName": "故障检修"
    },
    {
        "rule": "WTUR_Bool_Rd_b0_8==1",
        "duration": 0,
        "priority": 50,
        "ruleBefore": "",
        "subStateCode": 26,
        "subStateName": "其他原因停机"
    },
    {
        "rule": "WTUR_Bool_Rd_b0_7==1",
        "duration": 0,
        "priority": 50,
        "ruleBefore": "",
        "subStateCode": 36,
        "subStateName": "故障停机"
    }
      ],
      input_points: "WindSpeed1,ConGridsidePhaseVolL1L2@1m@MAX,ConGridsidePhaseVolL1L2@1m@MIN,WindSpeed1@1m@MAX,WindSpeed1@1m@MIN,WindSpeed1@1m@AVG,WindSpeed1@10m@AVG,WTUR_Bool_Rd_b0_1,WTUR_Bool_Rd_b0_2,WTUR_Bool_Rd_b0_3,WTUR_Bool_Rd_b0_4,WTUR_Bool_Rd_b0_5,WTUR_Bool_Rd_b0_6,WTUR_Bool_Rd_b0_7,WTUR_Bool_Rd_b0_8,WTUR_Bool_Rd_b0_9,WTUR_Bool_Rd_b0_10,WTUR_Bool_Rd_b0_10,WTUR_Bool_Rd_b0_11,WTUR_Bool_Rd_b0_12,WTUR_Bool_Rd_b0_13,WTUR_Bool_Rd_b0_14",
    },
  ],
  PVINV: [
    {
      label: "集中式高邮大状态模板",
      value: "1",
      pointName: "MState",
      formula: [
    {
        "rule": "PhaseAVoltage@1m@MAX-PhaseAVoltage@1m@MIN==0",
        "duration": 0,
        "priority": 1,
        "ruleBefore": "",
        "mainStateCode": 6,
        "mainStateName": "通讯中断"
    },
    {
        "rule": "PhaseAVoltage==null",
        "duration": 0,
        "priority": 1,
        "ruleBefore": "",
        "mainStateCode": 6,
        "mainStateName": "通讯中断"
    },
    {
        "rule": "GYGF_NBQ_Rd_b0_0020==true||UnitRunPowerLimit==true||DeratingRunning==true",
        "duration": 0,
        "priority": 2,
        "ruleBefore": "",
        "mainStateCode": 2,
        "mainStateName": "限功率"
    },
    {
        "rule": "InverterRun==true",
        "duration": 0,
        "priority": 3,
        "ruleBefore": "",
        "mainStateCode": 1,
        "mainStateName": "正常发电"
    },
    {
        "rule": "UnitStandby==true",
        "duration": 0,
        "priority": 4,
        "ruleBefore": "",
        "mainStateCode": 3,
        "mainStateName": "待机"
    },
    {
        "rule": "InverterFault==true",
        "duration": 0,
        "priority": 5,
        "ruleBefore": "",
        "mainStateCode": 5,
        "mainStateName": "故障"
    },
    {
        "rule": "InverterStop==true ",
        "duration": 0,
        "priority": 6,
        "ruleBefore": "",
        "mainStateCode": 4,
        "mainStateName": "停机"
    }
      ],
      input_points: "PhaseAVoltage,PhaseAVoltage@1m@MAX,PhaseAVoltage@1m@MIN,UnitRunPowerLimit,DeratingRunning,InverterRun,UnitStandby,InverterFault,InverterStop,GYGF_NBQ_Rd_b0_0020",
    },
    {
      label: "集中式高邮小状态模板",
      value: "2",
      pointName: "SState",
      formula: [
    {
        "rule": "PhaseAVoltage@1m@MAX-PhaseAVoltage@1m@MIN==0",
        "duration": 0,
        "priority": 0,
        "ruleBefore": "",
        "subStateCode": 28,
        "subStateName": "通讯中断"
    },
    {
        "rule": "PhaseAVoltage==null",
        "duration": 0,
        "priority": 0,
        "ruleBefore": "",
        "subStateCode": 28,
        "subStateName": "通讯中断"
    },
    {
        "rule": "GYGF_NBQ_Rd_b0_0020==true",
        "duration": 0,
        "priority": 10,
        "ruleBefore": "",
        "subStateCode": 2,
        "subStateName": "电网限功率"
    },
    {
        "rule": "DeratingRunning==true||UnitRunPowerLimit==true",
        "duration": 0,
        "priority": 11,
        "ruleBefore": "",
        "subStateCode": 3,
        "subStateName": "主控限功率"
    },
    {
        "rule": "InverterRun==true",
        "duration": 0,
        "priority": 12,
        "ruleBefore": "",
        "subStateCode": 1,
        "subStateName": "正常发电"
    },
    {
        "rule": "UnitStandby==true",
        "duration": 0,
        "priority": 20,
        "ruleBefore": "",
        "subStateCode": 4,
        "subStateName": "待机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 30,
        "ruleBefore": "'201' in signState ",
        "subStateCode": 5,
        "subStateName": "检测维护"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 30,
        "ruleBefore": "'202' in signState ",
        "subStateCode": 6,
        "subStateName": "定检维护"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 30,
        "ruleBefore": "'203' in signState ",
        "subStateCode": 7,
        "subStateName": "缺陷维护"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 30,
        "ruleBefore": "'204' in signState ",
        "subStateCode": 8,
        "subStateName": "技改维护"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 30,
        "ruleBefore": "'205' in signState ",
        "subStateCode": 9,
        "subStateName": "预警维护"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 30,
        "ruleBefore": "'206' in signState ",
        "subStateCode": 10,
        "subStateName": "故障维护"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 30,
        "ruleBefore": "'207' in signState ",
        "subStateCode": 11,
        "subStateName": "积雪"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 30,
        "ruleBefore": "'208' in signState ",
        "subStateCode": 12,
        "subStateName": "台风"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 30,
        "ruleBefore": "'209' in signState ",
        "subStateCode": 13,
        "subStateName": "地震"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 30,
        "ruleBefore": "'210' in signState ",
        "subStateCode": 14,
        "subStateName": "民事原因"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 30,
        "ruleBefore": "'211' in signState ",
        "subStateCode": 15,
        "subStateName": "新建设备接入"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 30,
        "ruleBefore": "'212' in signState ",
        "subStateCode": 17,
        "subStateName": "现货交易停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 30,
        "ruleBefore": "'214' in signState ",
        "subStateCode": 19,
        "subStateName": "电气检测停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 30,
        "ruleBefore": "'215' in signState ",
        "subStateCode": 20,
        "subStateName": "电气定检停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 30,
        "ruleBefore": "'216' in signState ",
        "subStateCode": 21,
        "subStateName": "电气巡检停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 30,
        "ruleBefore": "'217' in signState ",
        "subStateCode": 22,
        "subStateName": "电气缺陷停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 30,
        "ruleBefore": "'218' in signState ",
        "subStateCode": 23,
        "subStateName": "电气技改停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 30,
        "ruleBefore": "'219' in signState ",
        "subStateCode": 24,
        "subStateName": "电气故障停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 30,
        "ruleBefore": "'220' in signState ",
        "subStateCode": 25,
        "subStateName": "电网故障停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 30,
        "ruleBefore": "'221' in signState ",
        "subStateCode": 26,
        "subStateName": "电网检修停机"
    },
    {
        "rule": "GYGF_NBQ_Rd_b0_0022==true && ActivePower < 0",
        "duration": 0,
        "priority": 31,
        "ruleBefore": "",
        "subStateCode": 16,
        "subStateName": "电网限功率停机"
    },
    {
        "rule": "InverterFault==true",
        "duration": 0,
        "priority": 32,
        "ruleBefore": "",
        "subStateCode": 27,
        "subStateName": "故障停机"
    },
    {
        "rule": "InverterStop==true",
        "duration": 0,
        "priority": 33,
        "ruleBefore": "",
        "subStateCode": 18,
        "subStateName": "其他原因停机"
    }
      ],
      input_points: "ActivePower,PhaseAVoltage,PhaseAVoltage@1m@MAX,PhaseAVoltage@1m@MIN,UnitRunPowerLimit,DeratingRunning,InverterRun,UnitStandby,InverterFault,InverterStop,GYGF_NBQ_Rd_b0_0020,GYGF_NBQ_Rd_b0_0022",
    },
    {
      label: "组串式如东大状态模板",
      value: "1",
      pointName: "MState",
      formula: [
    {
        "rule": "UnitLineVoltageAB==null",
        "duration": 0,
        "priority": 1,
        "ruleBefore": "",
        "mainStateCode": 6,
        "mainStateName": "通讯中断"
    },
    {
        "rule": "RDGF_Bool_Rd_b0_0039==1||RDGF_Bool_Rd_b0_0040==1",
        "duration": 0,
        "priority": 2,
        "ruleBefore": "",
        "mainStateCode": 2,
        "mainStateName": "限功率"
    },
    {
        "rule": "UnitRun==1",
        "duration": 0,
        "priority": 3,
        "ruleBefore": "",
        "mainStateCode": 1,
        "mainStateName": "正常发电"
    },
    {
        "rule": "UnitStandby==1",
        "duration": 0,
        "priority": 4,
        "ruleBefore": "",
        "mainStateCode": 3,
        "mainStateName": "待机"
    },
    {
        "rule": "InverterFault==1",
        "duration": 0,
        "priority": 5,
        "ruleBefore": "",
        "mainStateCode": 5,
        "mainStateName": "故障"
    },
    {
        "rule": "InverterStop==1 ",
        "duration": 0,
        "priority": 6,
        "ruleBefore": "",
        "mainStateCode": 4,
        "mainStateName": "停机"
    }
      ],
      input_points: "UnitLineVoltageAB,UnitRun,UnitStandby,InverterFault,InverterStop,RDGF_Bool_Rd_b0_0039,RDGF_Bool_Rd_b0_0040",
    },
    {
      label: "组串式如东小状态模板",
      value: "2",
      pointName: "SState",
      formula: [
    {
        "rule": "UnitLineVoltageAB==null",
        "duration": 0,
        "priority": 0,
        "ruleBefore": "",
        "subStateCode": 28,
        "subStateName": "通讯中断"
    },
    {
        "rule": "RDGF_Bool_Rd_b0_0039==1",
        "duration": 0,
        "priority": 10,
        "ruleBefore": "",
        "subStateCode": 2,
        "subStateName": "电网限功率"
    },
    {
        "rule": "RDGF_Bool_Rd_b0_0040==1",
        "duration": 0,
        "priority": 11,
        "ruleBefore": "",
        "subStateCode": 3,
        "subStateName": "主控限功率"
    },
    {
        "rule": "UnitRun==1",
        "duration": 0,
        "priority": 12,
        "ruleBefore": "",
        "subStateCode": 1,
        "subStateName": "正常发电"
    },
    {
        "rule": "UnitStandby==1",
        "duration": 0,
        "priority": 20,
        "ruleBefore": "",
        "subStateCode": 4,
        "subStateName": "待机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 30,
        "ruleBefore": "'201' in signState ",
        "subStateCode": 5,
        "subStateName": "检测维护"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 30,
        "ruleBefore": "'202' in signState ",
        "subStateCode": 6,
        "subStateName": "定检维护"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 30,
        "ruleBefore": "'203' in signState ",
        "subStateCode": 7,
        "subStateName": "缺陷维护"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 30,
        "ruleBefore": "'204' in signState ",
        "subStateCode": 8,
        "subStateName": "技改维护"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 30,
        "ruleBefore": "'205' in signState ",
        "subStateCode": 9,
        "subStateName": "预警维护"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 30,
        "ruleBefore": "'206' in signState ",
        "subStateCode": 10,
        "subStateName": "故障维护"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 30,
        "ruleBefore": "'207' in signState ",
        "subStateCode": 11,
        "subStateName": "积雪"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 30,
        "ruleBefore": "'208' in signState ",
        "subStateCode": 12,
        "subStateName": "台风"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 30,
        "ruleBefore": "'209' in signState ",
        "subStateCode": 13,
        "subStateName": "地震"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 30,
        "ruleBefore": "'210' in signState ",
        "subStateCode": 14,
        "subStateName": "民事原因"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 30,
        "ruleBefore": "'211' in signState ",
        "subStateCode": 15,
        "subStateName": "新建设备接入"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 30,
        "ruleBefore": "'212' in signState ",
        "subStateCode": 17,
        "subStateName": "现货交易停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 30,
        "ruleBefore": "'214' in signState ",
        "subStateCode": 19,
        "subStateName": "电气检测停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 30,
        "ruleBefore": "'215' in signState ",
        "subStateCode": 20,
        "subStateName": "电气定检停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 30,
        "ruleBefore": "'216' in signState ",
        "subStateCode": 21,
        "subStateName": "电气巡检停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 30,
        "ruleBefore": "'217' in signState ",
        "subStateCode": 22,
        "subStateName": "电气缺陷停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 30,
        "ruleBefore": "'218' in signState ",
        "subStateCode": 23,
        "subStateName": "电气技改停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 30,
        "ruleBefore": "'219' in signState ",
        "subStateCode": 24,
        "subStateName": "电气故障停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 30,
        "ruleBefore": "'220' in signState ",
        "subStateCode": 25,
        "subStateName": "电网故障停机"
    },
    {
        "rule": "",
        "duration": 0,
        "priority": 30,
        "ruleBefore": "'221' in signState ",
        "subStateCode": 26,
        "subStateName": "电网检修停机"
    },
    {
        "rule": "RDGF_Bool_Rd_b0_0043 == 1 && ActivePower < 0",
        "duration": 0,
        "priority": 31,
        "ruleBefore": "",
        "subStateCode": 16,
        "subStateName": "电网限功率停机"
    },
    {
        "rule": "InverterFault==1",
        "duration": 0,
        "priority": 32,
        "ruleBefore": "",
        "subStateCode": 27,
        "subStateName": "故障停机"
    },
    {
        "rule": "InverterStop==1",
        "duration": 0,
        "priority": 33,
        "ruleBefore": "",
        "subStateCode": 18,
        "subStateName": "其他原因停机"
    }
      ],
      input_points: "ActivePower,UnitLineVoltageAB,UnitRun,UnitStandby,InverterFault,InverterStop,RDGF_Bool_Rd_b0_0039,RDGF_Bool_Rd_b0_0040,RDGF_Bool_Rd_b0_0043",
    },
  ],
  SYZZZ: [
    {
      label: "升压站1大状态模板",
      value: "1",
      pointName: "MState",
      formula: [
    {
        "rule": "CX_ABLineVoltage@1m@COUNT > 0",
        "duration": 0,
        "priority": 2,
        "ruleBefore": "",
        "mainStateCode": 1,
        "mainStateName": "正常发电"
    },
    {
        "rule": "(CX_ABLineVoltage@10m@AVG == null && CX_PhaseAVoltage@10m@AVG == null) || (CX_ABLineVoltage@5m@MAX-CX_ABLineVoltage@5m@MIN==0 && CX_PhaseAVoltage@5m@MAX-CX_PhaseAVoltage@5m@MIN==0)",
        "duration": 0,
        "priority": 1,
        "ruleBefore": "",
        "mainStateCode": 100,
        "mainStateName": "通讯中断"
    }
      ],
      input_points: "CX_ABLineVoltage,CX_ABLineVoltage@5m@MAX,CX_ABLineVoltage@5m@MIN,CX_ABLineVoltage@10m@AVG,CX_ABLineVoltage@1m@COUNT,CX_PhaseAVoltage,CX_PhaseAVoltage@5m@MAX,CX_PhaseAVoltage@5m@MIN,CX_PhaseAVoltage@10m@AVG",
    },
    {
      label: "升压站1小状态模板",
      value: "2",
      pointName: "SState",
      formula: [
    {
        "rule": "CX_ABLineVoltage@1m@COUNT > 0",
        "duration": 0,
        "priority": 2,
        "ruleBefore": "",
        "subStateCode": 1,
        "subStateName": "正常发电"
    },
    {
        "rule": "(CX_ABLineVoltage@10m@AVG == null && CX_PhaseAVoltage@10m@AVG == null) || (CX_ABLineVoltage@5m@MAX-CX_ABLineVoltage@5m@MIN==0 && CX_PhaseAVoltage@5m@MAX-CX_PhaseAVoltage@5m@MIN==0)",
        "duration": 0,
        "priority": 1,
        "ruleBefore": "",
        "subStateCode": 100,
        "subStateName": "通讯中断"
    }
      ],
      input_points: "CX_ABLineVoltage,CX_ABLineVoltage@5m@MAX,CX_ABLineVoltage@5m@MIN,CX_ABLineVoltage@10m@AVG,CX_ABLineVoltage@1m@COUNT,CX_PhaseAVoltage,CX_PhaseAVoltage@5m@MAX,CX_PhaseAVoltage@5m@MIN,CX_PhaseAVoltage@10m@AVG",
    },
    {
      label: "升压站2大状态模板",
      value: "1",
      pointName: "MState",
      formula: [
    {
        "rule": "HV_PhaseAVoltage@1m@COUNT > 0",
        "duration": 0,
        "priority": 2,
        "ruleBefore": "",
        "mainStateCode": 1,
        "mainStateName": "正常发电"
    },
    {
        "rule": "(HV_PhaseAVoltage@10m@AVG == null) || (HV_PhaseAVoltage@5m@MAX-HV_PhaseAVoltage@5m@MIN==0)",
        "duration": 0,
        "priority": 1,
        "ruleBefore": "",
        "mainStateCode": 100,
        "mainStateName": "通讯中断"
    }
      ],
      input_points: "HV_PhaseAVoltage@1m@COUNT,HV_PhaseAVoltage@10m@AVG,HV_PhaseAVoltage@5m@MAX,HV_PhaseAVoltage@5m@MIN",
    },
    {
      label: "升压站2小状态模板",
      value: "2",
      pointName: "SState",
      formula: [
    {
        "rule": "HV_PhaseAVoltage@1m@COUNT > 0",
        "duration": 0,
        "priority": 2,
        "ruleBefore": "",
        "subStateCode": 1,
        "subStateName": "正常发电"
    },
    {
        "rule": "(HV_PhaseAVoltage@10m@AVG == null) || (HV_PhaseAVoltage@5m@MAX-HV_PhaseAVoltage@5m@MIN==0)",
        "duration": 0,
        "priority": 1,
        "ruleBefore": "",
        "subStateCode": 100,
        "subStateName": "通讯中断"
    }
      ],
      input_points: "HV_PhaseAVoltage@1m@COUNT,HV_PhaseAVoltage@10m@AVG,HV_PhaseAVoltage@5m@MAX,HV_PhaseAVoltage@5m@MIN",
    },
  ],
  CFT: [
    {
      label: "测风塔1大状态模板",
      value: "1",
      pointName: "MState",
      formula: [
    {
        "rule": "WindTower70mWindSpeed == null || WindTower70mWindSpeed@10m@MAX - WindTower70mWindSpeed@10m@MIN == 0",
        "duration": "0",
        "priority": "2",
        "ruleBefore": "",
        "mainStateCode": "100",
        "mainStateName": "通讯中断"
    },
    {
        "rule": "WindTower70mWindSpeed@10m@COUNT > 0",
        "duration": "0",
        "priority": "1",
        "ruleBefore": "",
        "mainStateCode": "1",
        "mainStateName": "正常发电"
    }
      ],
      input_points: "WindTower70mWindSpeed,WindTower70mWindSpeed@10m@MAX,WindTower70mWindSpeed@10m@MIN,WindTower70mWindSpeed@10m@COUNT",
    },
    {
      label: "测风塔1小状态模板",
      value: "2",
      pointName: "SState",
      formula: [
    {
        "rule": "WindTower70mWindSpeed == null || WindTower70mWindSpeed@10m@MAX - WindTower70mWindSpeed@10m@MIN == 0",
        "duration": "0",
        "priority": "2",
        "ruleBefore": "",
        "subStateCode": "100",
        "subStateName": "通讯中断",
    },
    {
        "rule": "WindTower70mWindSpeed@10m@COUNT > 0",
        "duration": "0",
        "priority": "1",
        "ruleBefore": "",
        "subStateCode": "1",
        "subStateName": "正常发电"
    }
      ],
      input_points: "WindTower70mWindSpeed,WindTower70mWindSpeed@10m@MAX,WindTower70mWindSpeed@10m@MIN,WindTower70mWindSpeed@10m@COUNT",
    },
  ],
}
