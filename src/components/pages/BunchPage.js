import React from 'react'
import $ from 'jquery'
import '../../styles/bunch.css'
class BunchPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        leader_id: null,
        users: []
    }
  }

  componentWillMount(){
    this.fetchResponse();
  }

  fetchResponse(){
    $.ajax({
        url: 'http://localhost:3001/test4',
        ype: "GET"
    })
    .done((data) => {
      this.setState({
        leader_id: data.leader_id,
        users : data.users
      });
    })
    .fail(function(err) {
        console.error(err);
    })
  }

  render(){
    return(
      <div id="bunch-container">
        <div id="bunch-header">
          バンチ情報
        </div>
        <div className="container">
            <div className="user-list">
                {this.state.users.map(v => {
                    if (v.id === this.state.leader_id) {
                        return <div id={v.id}>◎{v.name}</div>
                    }
                    return <div id={v.id}>{v.name}</div>
                })}
            </div>
        </div>
      </div>
    )
  }
}

export default BunchPage;