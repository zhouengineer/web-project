import React, { Component } from "react";
import Videojs from "video.js";
//import "videojs-contrib-hls";
import "video.js/dist/video-js.css";

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    // 销毁播放器
    if (this.player) {
      this.player.dispose();
    }
  }
  componentDidMount() {
    const { height, width, src } = this.props;
    this.player = Videojs(
      "custom-video",
      {
        height,
        width,
        bigPlayButton: true,
        textTrackDisplay: false,
        errorDisplay: false,
        controlBar: true,
        type: "application/x-mpegURL",
      },
      function () {
        this.play();
      }
    );
    this.player.src({ src });
  }

  render() {
    return (
      <video
        id="custom-video"
        className="video-js"
        controls
        preload="auto"
      ></video>
    );
  }
}

export default VideoPlayer;
