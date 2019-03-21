import React from 'react'
import {Chart} from 'chart.js'

const MAX_LAUGH_STG = 1.0
const MAX_RARE_ENCOUNT_POINT = 5
const MAX_TAKEN_PICTURE_WITH_MANY_PEOPLE_POINT = 15
const MAX_TAKE_GOOD_PICTURE_POINT = 5
const MAX_BETWEEN_PRODUCT_INTERACT_POINT = 10
const MAX_DIVERSITY_POINT = 10

class RaderChart extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div>
        <canvas id="rader-canvas"></canvas>
      </div>
    )
  }

  componentDidMount(){
    this.draw()
  }

  draw(){
    const self = this
    const canvas = document.getElementById('rader-canvas')
    new Chart(canvas, {
      type: 'radar',
      data: {
        labels: ['笑顔', 'レア', 'たくさん', '良い', '交流', '年齢'],
        datasets: [{
          label: '個人ポイント',
          data: self.normalizeUserPoints(this.props.user_points),
          backgroundColor: 'RGBA(243,180,183,0.5)',
          borderColor: 'RGBA(255,127,150,1)',
          borderWidth: 4,
          pointBackgroundColor: 'RGB(255,127,150)'
        }]
      },
      options: {
        title: {
          display: true,
          text: '個人成績'
        },
        // 凡例の設定
        // legend: {
        //   position: 'left'
        // },
        responsive: true,
        scale: {
          // point名のfsize
          pointLabels: {
            fontSize: 20
          },
          // 目盛り
          ticks: {
            callback: () => {
              return ''
            },
            suggestedMin: 0,
            suggestedMax: 100,
            stepSize: 20
          }
        }
      }
    })
  }

  normalizeUserPoints(user_points){
    const calcResults = []
    calcResults.push(user_points.laugh_stg / MAX_LAUGH_STG * 100)
    calcResults.push(user_points.rare_encount_point / MAX_RARE_ENCOUNT_POINT * 100)
    calcResults.push(user_points.taken_picture_with_many_people_point / MAX_TAKEN_PICTURE_WITH_MANY_PEOPLE_POINT * 100)
    calcResults.push(user_points.take_good_picture_point / MAX_TAKE_GOOD_PICTURE_POINT * 100)
    calcResults.push(user_points.between_product_interact_point / MAX_BETWEEN_PRODUCT_INTERACT_POINT * 100)
    calcResults.push(user_points.diversity_point / MAX_DIVERSITY_POINT * 100)
    return calcResults
  }
}

export default RaderChart;