import React from 'react'
import '../../styles/home.css'
import { Link } from 'react-router-dom';

class Home extends React.Component {
  constructor(props){
    super(props)

  }

  render(){
    return(
      <div id="home-container">
        <div id="header"><img src="images/logo_kari.svg"/></div>
        <div className="container">
          <div className="row">
            <div className="col-md-6 margin-top">
              <div className="row">
                <div className="col-6">
                  <Link to="/camera"><img src="images/button_camera.svg" alt="take"/></Link>
                </div>
                <div className="col-6">
                  <Link to="/file"><img src="images/button_upload.svg" alt="take"/></Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 margin-top">
              <div className="row">
                <div className="col-6">
                  <Link to="/record"><img src="images/button_log.svg" alt="take"/></Link>
                </div>
                <div className="col-6">
                  <Link to="/bunch"><img src="images/button_team.svg" alt="take"/></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }


}


export default Home;