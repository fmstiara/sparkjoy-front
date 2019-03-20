import React from 'react'
import '../../styles/bunch.css'
class BunchPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        leader_id: 1,
        users: [
            {
                id: 1,
                name: "Alice",
                product_team_name: "unipos",
                score_sum: 5
            },
            {
                id: 2,
                name: "Bob",
                product_team_name: "unipos",
                score_sum: 10
            },
            {
                id: 3,
                name: "Charlie",
                product_team_name: "dAd",
                score_sum: 10
            }
        ]
}
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