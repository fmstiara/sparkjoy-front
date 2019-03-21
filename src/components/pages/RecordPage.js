import React from 'react'
import $ from 'jquery'
import '../../styles/record.css'

class RecordPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      windowWidth: 0,
      graphToggle: true,
      bunchName: "20卒バンチ",
      displayEvent: {
        date: ""
      },
      events: [],
      eventRecords: [],
      bunchRecords: []

    }
  }

  componentWillMount(){
    this.fetchResponse();
  }

  fetchResponse(){
    $.ajax({url: 'http://localhost:3001/test1'})
      .done((data) => {
        this.setState({
          displayEvent: data.events[data.events.length - 1],
          events: data.events
        })
        this.changeRecord(this.state.displayEvent)
      })
      .fail((err) => {
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
              <i className="fas fa-angle-up"></i>
            </button>

          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-6" id="my-record">
              MY
            </div>
            <div className="col-md-6" id="all-record">
              ALL
            </div>
          </div>
        </div>
      </div>
    )
  }

  setEvent(event){
    console.log(event)
    this.setState({displayEvent: event})
    this.changeRecord(this.state.displayEvent)
  }

  componentWillMount(){
    window.onresize = ()=>{
      this.setState({windowWidth: window.innerWidth})
    }
  }

  componentDidMount(){
    if(window.innerWidth < 768){
      if(this.state.graphToggle){
        document.getElementById('my-record').style.display = 'block'
        document.getElementById('all-record').style.display = 'none'
      } else {
        document.getElementById('my-record').style.display = 'none'
        document.getElementById('all-record').style.display = 'block'
      }
    }
  }
}

  changeRecord(displayEvent){
    $.ajax({url: 'http://localhost:3001/test2'})
      .done((data) => {
        this.setState({
          eventRecords: data
        });
        console.log(this.state.eventRecords)
      })
      .fail((err) => {
        console.error(err);
      })

    $.ajax({url: 'http://localhost:3001/test3'})
      .done((data) => {
        this.setState({
          bunchRecords: data
        });
        console.log(this.state.bunchRecords)
      })
      .fail((err) => {
        console.error(err);
      })
  }
}

export default RecordPage;
