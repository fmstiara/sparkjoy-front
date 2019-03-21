import React from 'react'
import $ from 'jquery'
import '../../styles/record.css'
class RecordPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      bunchName: "20卒バンチ",
      displayEvent: {
        date: ""
      },
      events: []
    }
  }

  componentWillMount(){
    this.fetchResponse();
  }

  fetchResponse(){
    $.ajax({
        url: 'http://localhost:3001/test1',
        type: "GET"
    })
    .done((data) => {
      this.setState({
        displayEvent: data.events[data.events.length - 1],
        events: data.events
      });
    })
    .fail(function(err) {
        console.error(err);
    })
  }

  render(){
    return(
      <div id="record-container">
        <div id="record-header">
          <button id="record-header-button" data-toggle="collapse" data-target="#record-list">
            <div id="bunch-name">{this.state.bunchName}</div>
            <div id="bunch-record">
              <div id="bunch-record-name">{this.state.displayEvent.date} バンチ対抗戦 <span id="pulldown-mark"><i class="fas fa-angle-down"></i></span></div>
              <div id="pulldown-mark-line"><i class="fas fa-angle-down"></i></div>
            </div>
          </button>
          <div id="record-list" className="collapse">
            {this.state.events.map(v => {
              return <button onClick={this.setEvent.bind(this, v)} key={v["date"]}className="record-list-item" data-toggle="collapse" data-target="#record-list">{v["date"]} バンチ対抗戦</button>
            })}

            <button id="list-close-button" data-toggle="collapse" data-target="#record-list">
              <i class="fas fa-angle-up"></i>
            </button>

          </div>
        </div>
        <div className="container">
        </div>
      </div>
    )
  }

  setEvent(event){
    console.log(event)
    this.setState({displayEvent: event})
  }
}


export default RecordPage;