/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import "./index.less";
import Swiper from "swiper";
import SelfImg from "@images/selfWay/self-img.png";
import ActionPlay from "@images/action/actionPlay.png";
import { Player } from "video-react";
import ajax from "@utils/ajax";
import "swiper/css/swiper.css";
import VideoPlayer from "../../../components/videojs";

const SelfProtection = (props) => {
  const [banner, setBanner] = useState(SelfImg);
  const [dataInfo, setDataInfo] = useState({});
  const [swiperList, setSwiperList] = useState([]);
  const swiperFunction = () => {
    const swiperData = {
      loop: true,
      speed: 1000,
      slidesPerView: 4,
      spaceBetween: 27,
      centeredSlides: false,
      watchSlidesProgress: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    };
    var galleryTop = new Swiper(".swiper-container", swiperData);
  };

  const getData = async () => {
    // banner i图片
    const navData = await ajax({ url: "/cms/nav" });
    if (navData.code === 1) {
      navData.data.forEach((item) => {
        if (item.id === "33") {
          item.son.forEach((it) => {
            if (it.id === "38") {
              setBanner(it.pic);
            }
          });
        }
      });
    }

    const res = await ajax({ url: "/about/38" });
    if (res.code === 1) {
      setDataInfo(res.data);
      const arr = res.data.pics.split(",");
      setSwiperList(arr);
    }
  };
  useEffect(() => {
    getData();
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    swiperFunction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swiperList]);
  return (
    <div className="self-protection-style">
      <div className="banner">
        <div className="bg-img banner-bg"></div>
        <div className="container"></div>
      </div>
      <div className="self-protection-content">
        <div className="container">
          <div className="self">
            <img className="self-img" src={banner} alt="" />
          </div>
          {swiperList.length > 0 && (
            <div className="middle-swiper">
              <div className="swiper-container">
                <div className="swiper-wrapper">
                  {swiperList.map((item, index) => {
                    return (
                      <div key={index} className="swiper-slide it-style">
                        {/* <div
                          className="img-it-style bg-img"
                          style={{ background: `url(${item})` }}
                        ></div> */}
                        <img className="img-it-style" src={item} alt="" />
                        {/* <div className="name-style one-text-omit">{title}</div>
                      <div className="hover-out">
                        <div className="title-hover">{title}</div>
                        <div className="hover-content">{content}</div>
                      </div> */}
                      </div>
                    );
                  })}
                </div>

                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
                <div className="swiper-pagination"></div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="radio-bot">
        <div className="container ">
          <div className="bg-img self-bg"></div>

          {dataInfo.video && (
            <div className="radio-c">
              <div className="radio-content">
                {/* <img src={ActionPlay} alt="" /> */}
                {/* <Player videoId="video-1">
                  <source src={dataInfo.video} />
                </Player> */}
                <VideoPlayer src={dataInfo.video} width="800" height="450" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default SelfProtection;
