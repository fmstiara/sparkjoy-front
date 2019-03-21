import React from 'react'
import {Chart} from 'chart.js'

const MAX_LAUGH_STG = 1.0
const MAX_RARE_ENCOUNT_POINT = 5
const MAX_TAKEN_PICTURE_WITH_MANY_PEOPLE_POINT = 15
const MAX_TAKE_GOOD_PICTURE_POINT = 5
const MAX_BETWEEN_PRODUCT_INTERACT_POINT = 10
const MAX_DIVERSITY_POINT = 10

class LineChart extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div>
        <canvas id="line-canvas"></canvas>
        <div className="score-area">
          <p className="score all-my-score">総合個人スコア<span className="score-text">{this.getUserScore()}</span></p>
          <p className="score all-bunch-score">総合バンチスコア<span className="score-text">{this.getBunchScore()}</span></p>
        </div>
      </div>
    )
  }

  componentDidMount(){
    this.draw()
  }

  componentDidUpdate(){
    this.draw()
  }


  getUserScore(){
    if(this.props.bunch_records["bunch_records"] == undefined){
      return ""
    }
    return this.props.bunch_records["bunch_records"]["user_score_sum"]
  }

  getBunchScore(){
    if(this.props.bunch_records["bunch_records"] == undefined){
      return ""
    }
    return this.props.bunch_records["bunch_records"]["bunch_score_sum"]
  }

  draw(){
    const canvas = document.getElementById('line-canvas')
    const data = this.props.bunch_records["bunch_records"]
    if(data == undefined){
      return
    }
    
    const bunch_scores = data.bunch_scores
    const user_scores = data.user_scores
    
    const labels = []
    const bunch_datas = []
    const user_datas = []
    for (let i = 0; i < bunch_scores.length; i++) {
      labels.push(bunch_scores[i].date)
      bunch_datas.push(bunch_scores[i].score)
    }
    for (let i = 0; i < user_scores.length; i++) {
      user_datas.push(user_scores[i].score)
    }
    new Chart(canvas, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'バンチ成績',
            data: bunch_datas,
            backgroundColor: 'RGB(254,213,68)',
            borderColor: 'RGB(254,213,68)',
            borderWidth: 4,
            lineTension: 0,
            fill: false
          },
          {
            label: '個人成績',
            data: user_datas,
            backgroundColor: 'RGB(255,127,150)',
            borderColor: 'RGB(255,127,150)',
            borderWidth: 4,
            lineTension: 0,
            fill: false
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: '成績'
        },
        // 凡例の設定
        // legend: {
        //   position: 'left'
        // },
        responsive: true,
        scales: {
          xAxes: [{
            ticks: {
              fontSize: 12
            }
          }],
          yAxes: [{
            ticks: {
              callback: () => {
                return ''
              },
              beginAtZero: true,
              max: 100
            }
          }]
        }
      }
    })
  }


}

export default LineChart;