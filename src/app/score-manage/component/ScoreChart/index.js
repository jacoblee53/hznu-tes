import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
require('highcharts/modules/exporting')(Highcharts)
require('highcharts/modules/export-data')(Highcharts)

const ScoreChart = ({ data = [] }) => {
  const categories = [...data].map(i => i.owner.userName)
  const values = categories.map(name =>
    [...data]
      .filter(i => i.owner.userName === name)[0]
      .value.map(i => parseFloat(i.score))
  )
  const series =
    values && values.length > 0
      ? values[0].map((i, idx) => {
          return {
            name: null,
            data: values.map(i => i[idx])
          }
        })
      : []
  const options = {
    title: {
      text: ''
    },
    chart: {
      type: 'bar'
    },
    xAxis: {
      scrollbar: {
        enabled: true
      },
      tickLength: 0,
      categories: categories
    },
    credits: {
      enabled: false
    },
    yAxis: {
      min: 0,
      title: {
        text: '总分'
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: 'bold',
          color: 'gray'
        }
      }
    },
    legend: {
      reversed: true
    },
    plotOptions: {
      series: {
        stacking: 'normal',
        dataLabels: {
          enabled: true,
          color:
            (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
          style: {
            textOutline: '1px 1px black'
          }
        }
      }
    },
    series: series,
    exporting: {
      enabled: true
    }
  }
  return (
    <div style={{ marginLeft: 20, marginRight: 20 }}>
      {data && data.length > 0 && (
        <HighchartsReact highcharts={Highcharts} options={options} />
      )}
    </div>
  )
}

export default ScoreChart
