/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import "./index.less";
import Swiper from "swiper";
import bgImg from "@images/someBannerImages/situation.png";
import locationMap from "@images/someBannerImages/location-map.png";
import ajax from "@utils/ajax";
// const swiperList = [
//   "https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00098-1312.jpg",
//   "https://img1.baidu.com/it/u=2010494214,4113516386&fm=26&fmt=auto&gp=0.jpg",
//   "https://img1.baidu.com/it/u=2746890508,1411167354&fm=26&fmt=auto&gp=0.jpg",
//   "https://img1.baidu.com/it/u=894117809,1867710149&fm=26&fmt=auto&gp=0.jpg",
//   "https://img0.baidu.com/it/u=2089382622,90784125&fm=26&fmt=auto&gp=0.jpg",
//   "https://img0.baidu.com/it/u=142367088,3964966389&fm=26&fmt=auto&gp=0.jpg",
//   "https://img2.baidu.com/it/u=1710076761,5866718&fm=26&fmt=auto&gp=0.jpg",
//   "https://img1.baidu.com/it/u=1198967547,2495746189&fm=26&fmt=auto&gp=0.jpg",
//   "https://img1.baidu.com/it/u=3648224056,3955028908&fm=26&fmt=auto&gp=0.jpg",
// ];
const GeneralSituation = (props) => {
  const [baseInfo, setBaseInfo] = useState({});
  const [banner, setBanner] = useState(bgImg);
  const [swiperList, setSwiperList] = useState([]);
  const swiperFunction = () => {
    const swiperData1 = {
      spaceBetween: 10,
      slidesPerView: 4,
      loop: true,
      freeMode: true,
      loopedSlides: 5, //looped slides should be the same
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
    };

    var galleryThumbs = new Swiper(".gallery-thumbs", swiperData1);

    const swiperData2 = {
      spaceBetween: 10,
      loop: true,
      loopedSlides: 5, //looped slides should be the same
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      thumbs: {
        swiper: galleryThumbs,
      },
    };
    swiperData2.on = {
      click: function (e) {
        console.log(e.target);
      },
    };
    var galleryTop = new Swiper(".gallery-top", swiperData2);
  };
  const getData = async () => {
    // banner i??????
    const navData = await ajax({ url: "/cms/nav" });
    if (navData.code === 1) {
      navData.data.forEach((item) => {
        if (item.id === "1" && item.pic) {
          setBanner(item.pic);
        }
      });
    }
    const res = await ajax({ url: "/about/1" });
    if (res.code === 1) {
      const swiperArr = res.data.pics ? res.data.pics.split(",") : [];
      // const content = res.data.content.replace(/<[^>]+>/g, "");
      // res.data.content = content;
      console.log("res.data", res.data);
      setBaseInfo(res.data);
      setSwiperList(swiperArr);
    }
  };
  const modifyInfoHtml = () => {
    document.title = "??????????????????????????????????????????";
    const contentText1 =
      "?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????";
    const contentText2 =
      "?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????";
    document
      .querySelector('meta[name="keywords"]')
      .setAttribute("content", contentText1);
    document
      .querySelector('meta[name="description"]')
      .setAttribute("content", contentText2);
  };
  useEffect(() => {
    modifyInfoHtml();
    // console.log("taaa", document.meta);
    // document.meta
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    swiperFunction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swiperList]);
  return (
    <div className="GeneralSituation-public-style">
      <div className="banner">
        <div
          className="bg-img"
          style={{ backgroundImage: `url(${banner})` }}
        ></div>
        <div className="container">
          <div className="banner-content">
            <div className="cont-title">{baseInfo.title}</div>
            <div
              className="cont-info"
              dangerouslySetInnerHTML={{ __html: baseInfo.content }}
            >
              {/* {baseInfo.content} */}
            </div>
          </div>
        </div>
      </div>
      <div className="GeneralSituation-content">
        <div className="container">
          <div className="content-main">
            <div className="middle-swiper">
              <div className="swiper-container gallery-top">
                <div className="swiper-wrapper">
                  {swiperList.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="swiper-slide"
                        style={{ backgroundImage: `url(${item})` }}
                      ></div>
                    );
                  })}
                </div>
                <div className="swiper-button-next swiper-button-white"></div>
                <div className="swiper-button-prev swiper-button-white"></div>
              </div>
              <div className="swiper-container gallery-thumbs">
                <div className="swiper-wrapper">
                  {swiperList.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="swiper-slide"
                        style={{ backgroundImage: `url(${item})` }}
                      ></div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="location">
              <div className="location-concent">
                <div className="location-tab">
                  ????????????<i className="i-style"></i>
                </div>
                <div className="location-info">
                  <div className="title">?????????????????????????????????????????????</div>
                  <span>
                    ????????????????????????????????????????????????192???????????????5??????
                  </span>
                  <span>
                    ???????????????207???248???????????????????????????????????????520?????????
                  </span>
                  <span>???????????????????????????????????????????????????</span>
                </div>
              </div>
              <img src={locationMap} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GeneralSituation;
