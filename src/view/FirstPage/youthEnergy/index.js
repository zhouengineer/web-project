/* eslint-disable no-unused-vars */

import React, { useEffect, useState, useRef } from "react";
import "./index.less";
import Swiper from "swiper";
import { Player } from "video-react";
import VideoModal from "../../../components/videoModal";
import ActionPlay from "@images/action/actionPlay.png";
import smallLeftIon from "@images/iconImg/small-left-icon.png";
import smallRightIcon from "@images/iconImg/small-right-icon.png";
import LawShelf from "@images/img/lawShelf.png";
import TreeStar from "@images/img/treeStar.png";
import BlackStar from "@images/img/black-img.png";
import treeBg from "@images/someBannerImages/tree.png";
import bgImg from "@images/someBannerImages/youthEnergyImg.png";
import One from "@images/person/one.png";
import two from "@images/person/two.png";
import three from "@images/person/three.png";
import four from "@images/person/four.png";
import five from "@images/person/five.png";
import six from "@images/person/six.png";
import seven from "@images/person/seven.png";
import eight from "@images/person/eight.png";
import nine from "@images/person/four.png";
import EntryPlay from "@images/iconImg/energy-play.png";

import oneImg from "@images/img/mapImg/1.png";
import twoImg from "@images/img/mapImg/2.png";
import threeImg from "@images/img/mapImg/3.png";
import fourImg from "@images/img/mapImg/4.png";
import fiveImg from "@images/img/mapImg/5.png";
import sixImg from "@images/img/mapImg/6.png";
import sevenImg from "@images/img/mapImg/7.png";
import eightImg from "@images/img/mapImg/8.png";
import nineImg from "@images/img/mapImg/9.png";
import tenImg from "@images/img/mapImg/10.png";
import elevenImg from "@images/img/mapImg/11.png";
import twelveImg from "@images/img/mapImg/12.png";
import StartIcon from "@images/img/mapImg/start.png";
import ajax from "@utils/ajax";

const defaultMapItem = [
  {
    url: oneImg,
    localIndex: 0,
  },
  {
    url: twoImg,
    localIndex: 1,
  },
  {
    url: threeImg,
    localIndex: 2,
  },
  {
    url: fourImg,
    localIndex: 3,
  },
  {
    url: fiveImg,
    localIndex: 4,
  },
  {
    url: sixImg,
    localIndex: 5,
  },
  {
    url: sevenImg,
    localIndex: 6,
  },
  {
    url: eightImg,
    localIndex: 7,
  },
  {
    url: nineImg,
    localIndex: 8,
  },
  {
    url: tenImg,
    localIndex: 9,
  },
  {
    url: elevenImg,
    localIndex: 10,
  },
  {
    url: twelveImg,
    localIndex: 11,
  },
];
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
const personList = [
  {
    img: One,
    id: 1,
    content: "?????????????????????????????????????????????????????????",
    name: "?????????",
  },
  {
    img: "",
    id: 10,
    content: "??????",
    name: "",
    bgc: "#FFB128",
  },
  {
    img: two,
    id: 2,
    content: "?????????????????????????????????????????????",
    name: "???????????????",
  },
  {
    img: "",
    id: 11,
    content: "??????",
    name: "",
    bgc: "#FFB128",
  },
  {
    img: three,
    id: 3,
    content: "???????????????????????????",
    name: "??????????????????????????",
  },
  {
    img: "",
    id: 11,
    content: "",
    name: "",
    bgc: "#0160B4",
  },
  {
    img: four,
    id: 4,
    content: "??????????????????????????????????????????????????????????????????????????????",
    name: "????????????",
  },
  {
    img: "",
    id: 11,
    content: "",
    name: "",
    bgc: "#0160B4",
  },
  {
    img: five,
    id: 5,
    content: "????????????????????????????????????????????????",
    name: "????????????",
  },
  {
    img: "",
    id: 11,
    content: "",
    name: "",
    bgc: "#0160B4",
  },
  {
    img: six,
    id: 6,
    content: "???????????????????????????",
    name: "???????????????",
  },
  {
    img: "",
    id: 11,
    content: "??????",
    name: "",
    bgc: "#FFB128",
  },
  {
    img: seven,
    id: 7,
    content: "????????????????????????????????????????????????????????????",
    name: "??????????????????????????",
  },
  {
    img: "",
    id: 11,
    content: "??????",
    name: "",
    bgc: "#FFB128",
  },
  {
    img: eight,
    id: 8,
    content: "???????????????????????????????????????????????????????????????",
    name: "?????????",
  },
  {
    img: "",
    id: 11,
    content: "",
    name: "",
    bgc: "#0160B4",
  },
  {
    img: nine,
    id: 9,
    content: "?????????????????????????????????",
    name: "?????????????????????????????",
  },
  {
    img: "",
    id: 11,
    content: "",
    name: "",
    bgc: "#0160B4",
  },
  {
    img: "",
    id: 11,
    content: "",
    name: "",
    bgc: "#FFF",
  },
  {
    img: "",
    id: 11,
    content: "",
    name: "",
    bgc: "#0160B4",
  },
];
const iconTreeList = ["", "", "", "", "", "", "", "", "", "", "", "", ""];
const YouthEnergy = (props) => {
  const [isVideo, setIsVideo] = useState(false);
  const [swiperList, setSwiperList] = useState([]);
  const [banner, setBanner] = useState(bgImg);
  const [starTrue, setStarTrue] = useState(false);
  const [dataInfo, setDataInfo] = useState({});
  const [mapItem, setMapItem] = useState(defaultMapItem);
  const [showMap, setShowMap] = useState(false);
  const mapRef = useRef();
  const videoModalRef = useRef();

  const swiperFunction = () => {
    const swiperData1 = {
      spaceBetween: 10,
      slidesPerView: 6,
      loop: true,
      freeMode: true,
      loopedSlides: 6, //looped slides should be the same
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
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
  //????????????
  const ModalChange = (data) => {
    // setCurrentVideo(data.video);
    // this.setState({ visible: status });
    videoModalRef.current.showModal();
    console.log(videoModalRef);
    console.log(
      "%c  this.videoModalRef:",
      "color: #0e93e0;background: #aaefe5;",
      videoModalRef
    );
  };
  const tuoZFun = () => {
    var bstop = true;
    $("#box div").on("mousedown", function (e) {
      if (bstop) {
        bstop = false;
        var that = this;
        var disx = e.offsetX; //????????????????????????????????????????????????????????????????????????????????????
        var disy = e.offsetY;
        var $clone = $(this).clone(); //??????
        $clone.addClass("draging").css({
          //??????????????????????????????????????????
          left: $(this).position().left,
          top: $(this).position().top,
        });
        $("#box").append($clone); //?????????box??????
        $(this).addClass("moving").html(""); //???????????????????????????????????????
        $("#box").on("mousemove", function (e) {
          //??????????????????????????????
          $clone.css({
            left: e.pageX - $(this).offset().left - disx,
            top: e.pageY - $(this).offset().top - disy,
          });
        });

        $clone.on("mouseup", function () {
          $("#box").off("mousemove"); //??????mousemove??????
          var minIndex = $(that).index(); //????????????????????????
          var minValue = 1000; //?????????????????????????????????????????????????????????
          $("#box div")
            .not(":last")
            .each(function () {
              //??????????????????????????????
              var smalldistance = Math.sqrt(
                Math.pow($clone.position().left - $(this).position().left, 2) +
                  Math.pow($clone.position().top - $(this).position().top, 2)
              ); //????????????????????????????????????????????????????????????????????????
              if (smalldistance < minValue) {
                //??????
                minValue = smalldistance; //???????????????
                minIndex = $(this).index(); //??????????????????????????????
              }
            });
          if (minIndex === $(that).index()) {
            //???????????????????????????????????????????????????????????????????????????????????????
            $clone.animate($(that).position(), 400, function () {
              $(that).removeClass("moving").html($clone.html()); //????????????????????????????????????
              $(this).remove(); //????????????????????????
              bstop = true;
            });
          } else {
            var $minbox = $("#box div").eq(minIndex); //?????????????????????
            var $clone2 = $minbox.clone(); //??????????????????????????????????????????????????????
            $clone2.addClass("draging").css({
              left: $minbox.position().left,
              top: $minbox.position().top,
            });
            $("#box").append($clone2); //??????
            $minbox.addClass("moving").html("");
            $clone.animate($minbox.position(), 400, function () {
              //??????????????????????????????????????????????????????
              $minbox.removeClass("moving").html($clone.html()); //?????????????????????????????????
              $clone.remove(); //?????????????????????
              bstop = true;
            });
            $clone2.animate($(that).position(), 400, function () {
              $(that).removeClass("moving").html($clone2.html());
              $clone2.remove();
              bstop = true;
            });
          }
          let childNodes = mapRef.current.childNodes;
          let idArr = [];
          childNodes.forEach((item) => {
            idArr.push(item.dataset.id);
          });

          const first = idArr[idArr.length - 1];
          const sec = idArr[idArr.length - 2];

          console.log(first);
          console.log(sec);

          const now = mapItem[first];
          mapItem[first] = mapItem[sec];
          mapItem[sec] = now;
          console.log(mapItem);

          let isGoOn = false;

          mapItem.forEach((ele, index) => {
            if (ele.localIndex !== index) {
              isGoOn = true;
            }
          });

          if (isGoOn) {
            console.log("BU??????!");
            setStarTrue(false);
          } else {
            console.log("??????????????????!");
            setStarTrue(true);
          }
        });
      }
      return false;
    });
  };
  const getData = async () => {
    // banner i??????
    const navData = await ajax({ url: "/cms/nav" });
    if (navData.code === 1) {
      navData.data.forEach((item) => {
        if (item.id === "33") {
          item.son.forEach((it) => {
            if (it.id === "35") {
              setBanner(it.pic);
            }
          });
        }
      });
    }

    // const dataSwiper = await ajax({ url: "/cms/slide/gid/35" });
    const res = await ajax({ url: "/about/33" });
    if (res.code === 1) {
      setDataInfo(res.data);
      const arrSwiper = res.data.pics.split(",");
      setSwiperList(arrSwiper);
    }

    // setSwiperList(dataSwiper.data);
    // navData.data.forEach((item) => {
    //   if (item.id === "2" && item.pic) {
    //     setBanner(item.pic);
    //   }
    // });
    // const resInfo = await ajax({ url: "/about/2" });
    // console.log(baseInfo);
  };
  useEffect(() => {
    mapItem.sort(function () {
      return 0.5 - Math.random();
    });
    setMapItem(mapItem);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    tuoZFun();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showMap]);
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    swiperFunction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVideo, swiperList]);
  return (
    <div className="YouthEnergy-public-style">
      <div className="banner">
        <div
          className="bg-img"
          style={{ backgroundImage: `url(${banner})` }}
        ></div>
      </div>
      <div className="YouthEnergy-content">
        <div className="container">
          <div className="main-values">
            <div className="head">
              <div
                className="title-name"
                onClick={() => {
                  setIsVideo(false);
                }}
              >
                <div className="Chinese-name">??????????????????????????????</div>
                <div className="English-name">
                  SHE HUI YI HE XIN JIA ZHI GUAN
                </div>
              </div>
              <div
                className="play-btn"
                onClick={() => {
                  // setIsVideo(true);
                  ModalChange();
                }}
              >
                <span>??????</span>
                <img src={EntryPlay} alt="" />
              </div>
            </div>
            {!isVideo && swiperList.length > 0 && (
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
                  <div className="swiper-button-next ">
                    <img src={smallRightIcon} className="icon-next" />
                  </div>
                  <div className="swiper-button-prev">
                    <img src={smallLeftIon} className="icon-pre" />
                  </div>
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
            )}
            {isVideo && (
              <div className="middle-swiper">
                <div className="radio-c">
                  <div className="radio-content">
                    {/* <img src={ActionPlay} alt="" /> */}
                    <Player videoId="video-1">
                      <source src={dataInfo.video} />
                    </Player>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="morality-law">
        <div
          className="bg-img"
          style={{ backgroundImage: `url(${treeBg})`, zIndex: -9 }}
        ></div>
        <div className="container">
          <div className="head">
            <div className="Chinese-name">????????????</div>
            <div className="English-name">DAO DE YU FA</div>
          </div>
          <div
            className="tree-style"
            style={{
              backgroundImage: `url(${starTrue ? TreeStar : BlackStar})`,
            }}
          ></div>
          <div className="map">
            {!showMap ? (
              <div className="map-leader">
                <img
                  onClick={() => {
                    setShowMap(true);
                  }}
                  src={StartIcon}
                  alt=""
                />
              </div>
            ) : (
              <div id="box" ref={mapRef}>
                {mapItem.map((item, index) => {
                  return (
                    <div
                      key={index}
                      data-value={item.localIndex}
                      data-id={index}
                      className="item"
                    >
                      <img src={item.url} />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="law-system">
        <div className="bg-img law-bg"></div>
        <div className="container">
          <div className="head">
            <div className="Chinese-name">????????????</div>
            <div className="English-name">FA LV TI XI</div>
          </div>
          <img src={LawShelf} alt="" />
        </div>
      </div>
      <div className="law-spread">
        <div className="container">
          <div className="head">
            <div className="Chinese-name">????????????</div>
            <div className="English-name">FA LV CHUAN BO</div>
          </div>
          <div className="tab-middle">
            <div className="person-tab">????????????</div>
            <div className="cont-tab">????????????</div>
          </div>
          <div className="one-hang">
            <div className="left">????????????</div>
            <div className="right">
              2016???7???20??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
              ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
            </div>
          </div>
          <ul>
            {personList.map((item, index) => {
              const { name, content, img, bgc } = item;
              return (
                <li key={index} style={{ backgroundColor: bgc ? bgc : "" }}>
                  {img && <img src={img} alt="" />}
                  {name ? (
                    <div className="cont-hover">
                      <div className="content break-word">{content}</div>
                      <div className="name">{name}</div>
                    </div>
                  ) : (
                    content
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <VideoModal ref={videoModalRef} videoSrc={dataInfo.video} />
    </div>
  );
};
export default YouthEnergy;
