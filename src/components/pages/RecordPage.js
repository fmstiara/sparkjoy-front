import React from 'react'
import '../../styles/record.css'
class RecordPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      windowWidth: 0,
      graphToggle: true,
      bunchName: "20卒バンチ",
      bunchRecord: {
        date: "2019-03"
      },
      events: [
        {
            "id": 10,
            "name": "event1",
            "date": "2019-01"
        },
        {
            "id": 11,
            "name": "event2",
            "date": "2019-02"
        },
        {
            "id": 12,
            "name": "event3",
            "date": "2019-03"
        }
      ]
    }
  }
  render(){
    return(
      <div id="record-container">
        <div id="record-header">
          <button id="record-header-button" data-toggle="collapse" data-target="#record-list">
            <div id="bunch-name">{this.state.bunchName}</div>
            <div id="bunch-record">
              <div id="bunch-record-name">{this.state.bunchRecord.date} バンチ対抗戦 <span id="pulldown-mark"><i className="fas fa-angle-down"></i></span></div>
              <div id="pulldown-mark-line"><i className="fas fa-angle-down"></i></div>
            </div>
          </button>
          <div id="record-list" className="collapse">
            {this.state.events.map(v => {
              return <button onClick={this.setBunch.bind(this, v)} key={v["date"]}className="record-list-item" data-toggle="collapse" data-target="#record-list">{v["date"]} バンチ対抗戦</button>
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

  setBunch(bunch){
    console.log(bunch)
    this.setState({bunchRecord: bunch})
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


export default RecordPage;