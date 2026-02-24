/*
 * @Author: chenmeifeng
 * @Date: 2024-07-05 15:43:41
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-06-03 14:56:32
 * @Description:
 */
import "./upload.less"
import { convertToBase64 } from "@/utils/mqtt-util-funcs"
import CustomUpload from "@/components/custom-upload"
import { Button, Space, UploadFile, UploadProps, message } from "antd"
import { forwardRef, useState } from "react"

const isElectronENV = process.env["VITE_CS"]
const isMqttProxyHttp = process.env["MQTT_PROXY_HTTP"]
interface IDataRefs {}
export interface IDataProps {
  btnClick: (type: string, formData?) => void
  fileType: string
}
const FileImport = forwardRef<IDataRefs, IDataProps>((props, ref) => {
  const { btnClick, fileType = '' } = props
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [uploading, setUploading] = useState(false)
  const fileProps: UploadProps = {
    onRemove: (file) => {
      const newFileList = fileList.filter(item => item.uid !== file.uid)
      setFileList(newFileList)
    },
    beforeUpload: (file) => {
      const isDuplicate = fileList.some(item => 
        item.name === file.name && item.size === file.size
      )
      if (isDuplicate) {
        message.error(`${file.name}文件已存在`)
        return false
      }
      // 检查文件格式
      if (fileType && !file.type.includes(fileType)) {
        message.error(`文件 ${file.name} 不是支持的格式，请上传${fileType === 'image/svg+xml' ? 'svg' : fileType === 'audio/mpeg' ?'mp3' : ''}格式的文件！`)
        return false
      }
      // 处理文件名,校验文件名是否为中文
      const isChinese = /[\u4e00-\u9fa5]/.test(file.name)
      if(fileType && isChinese) {
        message.error(`${file.name}文件名不能为中文`)
        return false
      }
      if(!fileType) {
        setUploading(true)
      }
      setFileList(prev => [...prev, file])
      return false
    },
    fileList,
  }

  const submitTo = (type) => {
    if (type === "ok") {
      uploadFile()
    } else {
      btnClick?.(type)
    }
  }
  const uploadFile = async () => {
    // const formData = new FormData()
    // if (isMqttProxyHttp || isElectronENV) {
    //   const fileurl = await convertToBase64(fileList[0] as any)
    //   formData.append("file", fileurl)
    // } else {
    //   formData.append("file", fileList[0] as any)
    // }
    // // const res = await importCorretList(formData)
    // // if (!res) return
    // btnClick?.("ok", formData)

    if (fileList.length === 0) return
    try {
      const formData = new FormData()
      
      if (isMqttProxyHttp || isElectronENV) {
        // 处理多个文件的 base64 转换
        if(fileList.length == 1) {
          const file = fileList[0] as any
          const fileurl = await convertToBase64(file)
          formData.append(`file`, fileurl)
        } else if (fileList.length > 1) {
          fileList.forEach(file => {
            formData.append('files', file as any)
          })
        }
      } else {
        if(fileList.length == 1) {
          formData.append(`file`, fileList[0] as any)
        } else if (fileList.length > 1) {
          fileList.forEach(file => {
            formData.append('files', file as any)
          })
        }
      }
      btnClick?.("ok", formData)
    } catch (error) {
      console.error('文件上传失败:', error)
    }
  }

  return (
    <div className="import-correct">
      <div className="import-box">
        <span className="span">导入文件</span>
        <CustomUpload
          disabled={uploading}
          title="本地上传"
          name="file"
          action="#"
          accept=".xml,.xlsx"
          showUploadList={true}
          maxCount={1}
          multiple={fileType?true:false}
          {...fileProps}
        />
      </div>
      <Space style={{ width: "100%", justifyContent: "end", marginTop: "1em" }}>
        <Button onClick={submitTo.bind(null, "close")}>取消</Button>
        <Button onClick={submitTo.bind(null, "ok")} disabled={fileList.length === 0}>
          确认
        </Button>
      </Space>
    </div>
  )
})
export default FileImport
