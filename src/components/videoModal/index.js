import React, {
  Component,
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useRef,
} from "react";
import { Modal } from "antd";
import "./index.less";
import { Player } from "video-react";
// import videoJs from "video.js";
import VideoPlayer from "../videojs";

const VideoModal = (props, ref) => {
  console.log("1111333");
  const { videoSrc } = props;
  const [visible, setVisible] = useState(false);
  const player = useRef();
  let playerVideo = null;

  const handleCancelStatus = (e) => {
    // e.stopPropagation();
    setVisible(false);
  };

  useImperativeHandle(ref, () => ({
    showModal: async () => {
      setVisible(true);
    },
  }));
  const playerFun = () => {};
  useEffect(() => {
    playerFun();
  }, []);
  return (
    <div>
      <Modal
        visible={visible}
        onCancel={handleCancelStatus}
        footer={null}
        closable={false}
        destroyOnClose={true}
        width={"970px"}
        className="video-modal"
        style={{ backgroundColor: "black" }}
      >
        {/* <Player ref={player} videoId="video-1">
          <source src={videoSrc} />
        </Player> */}
        <div className="video-modal-content">
          <VideoPlayer src={videoSrc} width="800" height="450" />
          {/* <video
            id="my-video"
            className="video-js"
            controls
            preload="auto"
            width="640"
            height="264"
            poster=""
            data-setup="{}"
          > */}
          {/* <source
              // src="https://blz-videos.nosdn.127.net/1/OverWatch/AnimatedShots/Overwatch_AnimatedShot_CinematicTrailer.mp4"
              // src={videoSrcUrl}
              src="http://101.34.137.147:8000/uploads/e0/e0939d2d70e8805f8f9decc848ef72f5/e0939d2d70e8805f8f9decc848ef72f5.index.m3u8"
              type="application/x-mpegURL"
            />
            <p className="vjs-no-js">
              To view this video please enable JavaScript, and consider
              upgrading to a web browser that
              <a
                href="https://videojs.com/html5-video-support/"
                target="_blank"
              >
                supports HTML5 video
              </a>
            </p> */}
          {/* </video> */}
        </div>
      </Modal>
    </div>
  );
};
export default forwardRef(VideoModal);
