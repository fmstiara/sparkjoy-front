import React from 'react'
import '../../styles/bunch.css'
class BunchPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      bunchName: "20卒バンチ",
      bunchInfo: {
        "leader_id": 1,
        "users": [
            {
                "id": 1,
                "name": "Alice",
                "product_team_name": "unipos",
                "score_sum": 5
            },
            {
                "id": 2,
                "name": "Bob",
                "product_team_name": "unipos",
                "score_sum": 10
            },
            {
                "id": 3,
                "name": "Charlie",
                "product_team_name": "dAd",
                "score_sum": 10
            }
        ]
      }
    }
  }

  render(){
    return(
      <div id="bunch-container">
        <div id="bunch-header">
          {this.state.bunchName}
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="member">
                <img src="images/waku_leader.svg" />
                <div className="member-list">hoge</div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="member">
                <img src="images/waku_member.svg" />
                <div className="member-list">
                  <div>hoge</div>
                  <div>hoge</div>
                  <div>hoge</div>
                  <div>hoge</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button id="bunch-back-button" onClick={this.back}><img src="images/button_return_bg.svg" alt="back"/></button>
      </div>
    )
  }

  back(){
    document.location.href = '/'
  }
}


export default BunchPage;