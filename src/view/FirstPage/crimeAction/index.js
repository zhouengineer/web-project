import React, { useEffect, useState } from "react";
import "./index.less";
import CrimeOne from "@images/action/crime1.png";
import ActionPlay from "@images/action/actionPlay.png";
import ajax from "@utils/ajax";
import { Player } from "video-react";

const CrimeAction = (props) => {
  const [banner, setBanner] = useState("");
  const [dataInfo, setDataInfo] = useState({});
  const getData = async () => {
    // banner i图片
    const navData = await ajax({ url: "/cms/nav" });
    if (navData.code === 1) {
      navData.data.forEach((item) => {
        if (item.id === "33") {
          item.son.forEach((it) => {
            if (it.id === "36") {
              setBanner(it.pic);
            }
          });
        }
      });
    }

    const res = await ajax({ url: "/about/36" });
    if (res.code === 1) {
      setDataInfo(res.data);
    }

    // navData.data.forEach((item) => {
    //   if (item.id === "2" && item.pic) {
    //     setBanner(item.pic);
    //   }
    // });
    // const resInfo = await ajax({ url: "/about/2" });
    // console.log(baseInfo);
  };
  useEffect(() => {
    getData();
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="crime-action-style">
      <div className="banner">
        <div
          className="bg-img "
          style={{ backgroundImage: `url(${banner})` }}
        ></div>
        <div className="container"></div>
      </div>
      <div className="crime-action-content">
        {/* <div className="container"> */}
        <div
          className="content-main"
          dangerouslySetInnerHTML={{ __html: dataInfo.content }}
        >
          {/* <div className="pink"></div>
            <div className="title-name">
              <span className="han">犯罪行为</span>
              <span className="ping">FAN ZUI XING WEI</span>
            </div>
            <img className="crime-img" src={CrimeOne} alt="" />
            <img className="crime-img" src={CrimeOne} alt="" />
            <img className="crime-img" src={CrimeOne} alt="" />
            <img className="crime-img" src={CrimeOne} alt="" /> */}
        </div>
        <div className="radio-c container">
          <div className="bg-gray"></div>
          <div className="radio-content">
            {/* <img src={ActionPlay} alt="" /> */}
            {dataInfo.video && (
              <Player videoId="video-1">
                <source src={dataInfo.video} />
              </Player>
            )}
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};
export default CrimeAction;
