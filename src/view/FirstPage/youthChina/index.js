import React, { useEffect, useState } from "react";
import VideoModal from "../../../components/videoModal";

import "./index.less";
import ActionPlay from "@images/action/actionPlay.png";
import ajax from "@utils/ajax";
import { Player } from "video-react";
import VideoPlayer from "../../../components/videojs";

const YouthChina = (props) => {
  const [dataInfo, setDataInfo] = useState({});

  const getData = async () => {
    // banner i图片
    const navData = await ajax({ url: "/cms/nav" });
    if (navData.code === 1) {
      navData.data.forEach((item) => {
        if (item.id === "33") {
          item.son.forEach((it) => {
            if (it.id === "40") {
              // setBanner(it.pic);
            }
          });
        }
      });
    }

    const res = await ajax({ url: "/about/40" });
    if (res.code === 1) {
      setDataInfo(res.data);
    }
  };
  useEffect(() => {
    getData();
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="youth-China-style">
      <div className="banner">
        <div className="bg-img banner-bg"></div>
        <div className="container main-cot">
          <div className="radio-c">
            <div className="title">少年中国</div>
            <div className="radio-content">
              {dataInfo.video && (
                // <Player videoId="video-1">
                //   <source src={dataInfo.video} />
                // </Player>
                <VideoPlayer src={dataInfo.video} width="800" height="450" />
              )}
              {/* <img src={ActionPlay} alt="" /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default YouthChina;
