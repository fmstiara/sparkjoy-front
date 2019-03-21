import React from 'react'

class BackButton extends React.Component{
  render(){
    return <button id="back-button" onClick={this.back}><img src="images/button_return.svg" alt="back"/></button>
  }

  back(){
    document.location.href = '/'
  }
}

export default BackButton