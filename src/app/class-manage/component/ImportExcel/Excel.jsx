import React, { Component } from 'react'
import { Button, Icon, message } from 'antd'
import * as XLSX from 'xlsx'
import './Excel.less'

class Excel extends Component {
  onImportExcel = file => {
    const { files } = file.target
    const fileReader = new FileReader()

    fileReader.onload = event => {
      try {
        const { result } = event.target
        const workbook = XLSX.read(result, { type: 'binary' })
        let data = []

        for (let sheet in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]))
          }
        }
        message.success('导入成功')
        this.props.getExcelData(data)
      } catch (e) {
        message.error('导入失败')
      }
    }
    fileReader.readAsBinaryString(files[0])
  }
  render() {
    return (
      <div style={{ marginBottom: 10 }}>
        <Button className='upload-wrap'>
          <Icon type='upload' size='small' /> 选取文件
          <input
            className='file-uploader'
            type='file'
            accept='.xlsx, .xls'
            onChange={this.onImportExcel}
          />
        </Button>
        <p className='upload-tip'>
          仅支持.xlsx/.xls格式
        </p>
      </div>
    )
  }
}

export default Excel
