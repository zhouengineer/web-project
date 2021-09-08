import React, { useEffect, useState } from "react";
import "./index.less";
import HouseBanner from "@images/selfWay/house-banner.png";
import ActionPlay from "@images/action/actionPlay.png";
import ajax from "@utils/ajax";
import { Player } from "video-react";
import VideoPlayer from "../../../components/videojs";

const CozyCottage = (props) => {
  const [dataInfo, setDataInfo] = useState({});
  const [banner, setBanner] = useState(HouseBanner);

  const getData = async () => {
    // banner i图片
    const navData = await ajax({ url: "/cms/nav" });
    if (navData.code === 1) {
      navData.data.forEach((item) => {
        if (item.id === "33") {
          item.son.forEach((it) => {
            if (it.id === "39") {
              // setBanner(it.pic);
            }
          });
        }
      });
    }

    const res = await ajax({ url: "/about/39" });
    if (res.code === 1) {
      setDataInfo(res.data);
    }
  };
  useEffect(() => {
    getData();
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, []);
  return (
    <div className="cozy-cottage-style">
      <div className="banner">
        <div className="bg-img banner-bg"></div>
        <div className="container"></div>
      </div>
      <div className="cozy-cottage-content">
        <div className="bg-img court-bg"></div>

        <div className="container">
          <div className="court">
            <img className="court-img" src={banner} alt="" />
            <div className="court-content">
              以少年法庭为载体，以《未成年人保护法与预防未成年人犯罪法》为核心，构建社会、学校、家庭三位一体保护框架，形成了有效的青少年法律保护体系。以少年法庭为载体，以《未成年人保护法与预防未成年人犯罪法》为核心，构建社会、学校、家庭三位一体保护框架，形成了有效的青少年法律保护体系。
            </div>
          </div>
          <div className="radio-c">
            <div className="head-title text-indent">
              感悟点滴，记录参观体验者的所学所得，以视频形式记录并回放。
            </div>
            {dataInfo.video && (
              <div className="radio-content">
                {/* <img src={ActionPlay} alt="" /> */}
                {/* <Player videoId="video-1">
                  <source src={dataInfo.video} />
                </Player> */}
                <VideoPlayer src={dataInfo.video} width="800" height="450" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CozyCottage;
