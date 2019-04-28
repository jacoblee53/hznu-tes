import React, { Component } from 'react'
import { Button, Icon, message } from 'antd'
import * as XLSX from 'xlsx'
import styles from './Excel.less'

class Excel extends Component {
  onImportExcel = file => {
    const { files } = file.target
    const fileReader = new FileReader()
    fileReader.onload = event => {
      try {
        const { result } = event.target
        const workbook = XLSX.read(result, { type: 'binary' })
        let data = []
        for (const sheet in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]))
          }
        }
        message.success('解析成功')
        this.props.getExcelData(data)
      } catch (e) {
        message.error('文件类型错误')
      }
    }
    fileReader.readAsBinaryString(files[0])
  }
  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <Button className={styles['upload-wrap']}>
          <Icon type='upload' />
          <input
            className={styles['file-uploader']}
            type='file'
            accept='.xlsx, .xls'
            onChange={this.onImportExcel}
          />
        </Button>
        <p className={styles['upload-tip']}>支持 .xlsx、.xls 格式的文件</p>
      </div>
    )
  }
}

export default Excel
