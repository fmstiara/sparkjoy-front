import React from 'react'
import $ from 'jquery'

import '../../styles/bunch.css'
class BunchPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        bunchName: '20卒バンチ',
        leader_id: null,
        users: []
    }
  }

  componentWillMount(){
    this.fetchResponse();
  }

  fetchResponse(){
    $.ajax({url: 'http://localhost:3001/test4'})
      .done((data) => {
        this.setState({
          leader_id: data.leader_id,
          users : data.users
        })
      })
      .fail((err) => {
          console.error(err)
      })
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

