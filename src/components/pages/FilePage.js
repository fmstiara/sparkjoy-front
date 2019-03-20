import React from 'react'
import '../../styles/file.css'

class FilePage extends React.Component {
  render(){
    return(
      <div id="file-container">
        <div id="file-header">
          <span id="selected-count">0</span>枚写真を選択しました
          <div id="add-button">
            <img src="images/button_add.svg" />
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default FilePage;