import React from 'react'
import $ from 'jquery'
import { Link } from 'react-router-dom';
import '../../styles/camera.css'
import BackButton from '../BackButton'

class CameraPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      HOST: 'https://japaneast.api.cognitive.microsoft.com/face/v1.0/',
      PERSON_GROUP_ID: 'test-members',
      API_KEY: 'd2d8c88fbb9f468baf72986c2f18df72'
    }
  }

  render(){
    return(
      <div className="page-coponent">
        <div id="camera-area" className="camera-area">
          <video id="video" autoPlay playsInline={true}></video>
          <canvas className="mask" id="video-mask"></canvas>
          <canvas className="mask" id="canvas-mask"></canvas>
          <div className="mask loader" id="loader"></div>
          <div className="mask" id="last-layer"></div>
          <div id="ui-area" className="row">
            <div className="col-4 ui-item">
              <BackButton />
            </div>
            <div className="col-8 ui-item">
              <div className="ui-item row" id="taking-ui">
                <div className="col-6 ui-item">
                  <button id="take-button"><img id="take-image" src="images/button_satsuei.svg" alt="take"/></button>
                </div>
                <div className="col-6 ui-item">
                  <button id="toggle-button"><img src="images/button_change.svg" alt="take"/></button>
                </div>
              </div>
              <div className="row ui-item" id="finish-ui">
                <div className="col-12 ui-item">
                  <div id="graphic"><img src="images/graphic_smile_web.svg" /></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }

  componentDidMount(){
    const video = document.getElementById('video')

    const constraints = {
      audio: false,
      video: {
          // スマホのバックカメラを使用
          facingMode: 'environment'
      }
    }
    const self = this

    navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
        video.srcObject = stream;
        const button = document.getElementById('take-button')

        self.cameraInit()
        button.onclick = function(){
          document.getElementById('loader').style.visibility = 'visible'
          document.getElementById('take-image').src = "images/button_finish.svg"
          self.getImageFromVideo(video)
          .then(res => self.detect(res))
          .then((res)=>{
            let canvas = document.getElementById('video-mask')
            let faceIds = []
            let faceRectangles = []
            res.forEach(v => {
              faceIds.push(v["faceId"])
              faceRectangles.push(v["faceRectangle"])
            })

            document.getElementById('taking-ui').style.display = 'none';
            document.getElementById('finish-ui').style.display = 'flex';
            
            document.getElementById('loader').style.visibility = 'hidden'
            self.frameFace(canvas, faceRectangles)
            self.identify(faceIds)
          })
        }

        const lastLayer = document.getElementById('last-layer')
        lastLayer.onclick = function(){
          self.cameraInit()
        }
      })
  }

  canvasReset(canvas){
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  cameraInit(){
    const videoMask = document.getElementById('video-mask')
    const canvasMask = document.getElementById('canvas-mask')
    const loaderMask = document.getElementById('loader')

    this.canvasReset(videoMask)
    this.canvasReset(canvasMask)
    loaderMask.style.visibility = 'hidden'
    document.getElementById('take-image').src = "images/button_satsuei.svg"
    document.getElementById('taking-ui').style.display = 'flex';
    document.getElementById('finish-ui').style.display = 'none';
  }

  getImageFromVideo(video){
    return new Promise((resolve => {
      let canvas = document.getElementById('video-mask')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
  
      let ctx = canvas.getContext('2d')
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
  
      resolve(canvas.toDataURL('image/png'))
    }))
  }
  
  detect(image_url){
    return new Promise((resolve, reject)=>{
      fetch(image_url).then(res => res.blob())
      .then(blobData => {
        let params = {
          "returnFaceId": "true",
          "returnFaceLandmarks": "false",
          "returnFaceAttributes":"emotion"
        };
        const url = this.state.HOST + "detect?" + $.param(params)
  
        $.ajax({
          url: url,
          contentType: "application/octet-stream",
          headers: {
            'Ocp-Apim-Subscription-Key': this.state.API_KEY
          },
          type: "POST",
          processData: false,
          data: blobData
        })
        .done(function(data) {
          console.log('detect')
          console.log(data)
          resolve(data)
        })
        .fail(function(err) {
          console.error(err);
          reject(err)
        })
      });
    })
  }
  
  identify(faceIds = []){
    const url = this.state.HOST + "identify"
    
    $.ajax({
      url: url,
      contentType: "application/json",
      headers: {
        'Ocp-Apim-Subscription-Key': this.state.API_KEY
      },
      type: "POST",
      processData: false,
      data: JSON.stringify({
        personGroupId: this.state.PERSON_GROUP_ID,
        faceIds: faceIds,
        maxNumOfCandidatesReturned: 100,
        confidenceThreshold: 0.5
      })
    })
    .done(function(data) {
      console.log('identify')
      console.log(data)
    })
    .fail(function(err) {
        console.error(err);
    })
  }
  
  frameFace(canvas, rectangles){
    let ctx = canvas.getContext('2d')

    rectangles.forEach(rectangle => {
      const top = rectangle["top"]
      const left = rectangle["left"]
      const width = rectangle["width"]
      const height = rectangle["height"]
  
      ctx.lineWidth = 10;
      ctx.strokeStyle = 'rgba(255, 80, 77, 0.7)'
      ctx.rect(left, top, width, height)
      ctx.stroke()
    })
  }
}


export default CameraPage;