/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable default-case */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState, useRef } from "react";
import SwiperHtml from "@components/swiper";
import Swiper from "swiper";
import { Steps } from "antd";
import ChallengeModal from "@components/challengeModal";
import "./index.less";
import challengeIcon from "@images/iconImg/challenge-btn.png";
import leftIcon from "@images/iconImg/left-icon.png";
import rightIcon from "@images/iconImg/right-icon.png";
import IntelligenceImage from "@images/indexImages/intelligenceImage.png";
import YouthEnergy from "@images/indexImages/youthEnergy.png";
import youthBackground from "@images/indexImages/youthBackground.png";
import PlayIcon from "@images/indexImages/play.png";

import axios from "axios";
import ajax from "@utils/ajax";
import { Player } from "video-react";
import VideoPlayer from "@components/videojs";
import VideoModal from "@components/videoModal";
const Index = (props) => {
  let defaultAllData = {
    swiperList: [],
    runData: {},
    energyData: [],
    keyView: [],
    everyStep: [],
    moreBuData: [],
  };
  const energyDefaultContent =
    "积极践行社会主义核心价值观，弘扬 青春正能量。包括社会主义核心价值 观，道德与法、法律体系。";
  const runDefaultContent =
    "为梦而年轻，为梦而坚定\r\n 梦想的使命，为梦想而活的人\r\n 生命会放射出无限的光芒，让我们超越自我，超越现实\r\n 放飞梦想";
  const [releaseProductList, setReleaseProductList] = useState([]);
  const [actionShow, setActionShow] = useState("goodAction");
  const [circleShow, setCircleShow] = useState("court");
  const [allData, setAllData] = useState(defaultAllData);
  const [actionBgc, setActionBgc] = useState("");
  const [videoAction, setVideoAction] = useState("");
  const [buBgc, setBuBgc] = useState("");
  const videoModalRef = useRef();

  // const [swiperList, setSwiperList] = useState([]); //首页轮播图
  // const [runData, setRunData] = useState({}); // 奔跑青春
  const challengeModalRef = useRef();
  const swiperFunction = () => {
    const paramsSwiper = {
      // loop:true,
      cssMode: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      mousewheel: true,
      keyboard: true,
    };
    var mySwiperBanner = new Swiper(".swiper-container", paramsSwiper);
  };
  useEffect(() => {
    swiperFunction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allData.swiperList]);
  const imgsList = [
    "richstrong",
    "democratic",
    "civilization",
    "harmonious",
    "free",
    "equality",
    "fair",
    "legality",
    "loveCountry",
    "loveWork",
    "sincerity",
    "friendly",
  ];
  const actionList = ["goodAction", "badAction", "crimeAction"];
  // 产品跳转
  const productChange = (item) => {
    console.log(item);
  };
  //传递能量
  const transmitEnergy = () => {
    props.history.push("/home/YouthEnergy");
    console.log("传递能量");
  };
  // 行为切换
  const actionBtn = (e, item) => {
    e.stopPropagation();
    setVideoAction("");
    const acType = e.target.dataset.action;
    console.log("actionType", e.target.dataset.action);
    allData.everyStep.forEach((item) => {
      if (item.actionType === acType) {
        setActionBgc(item.pic);
        setVideoAction(item.video);
        setActionShow(acType);
      }
    });
  };
  //行为跳转
  const actionClick = (actionType) => {
    console.log(actionType);
    let path;
    switch (actionType) {
      case "goodAction":
        path = "/home/GoodAction";
        break;
      case "badAction":
        path = "/home/BadAction";
        break;
      case "crimeAction":
        path = "/home/CrimeAction";
        break;
    }
    props.history.push(path);
  };
  //行为视频播放
  const actionPlay = (e, actionType) => {
    e.stopPropagation();
    console.log("actionType", actionType);
  };
  //进度条
  const progressChange = (val) => {
    console.log(val);
    setCircleShow(val);
  };
  const protectClick = () => {
    console.log(circleShow);
    let pathProtect = "";
    switch (circleShow) {
      case "court":
        pathProtect = "/home/YouthCourt";
        break;
      case "selfProtect":
        pathProtect = "/home/SelfProtection";
        break;
      case "house":
        pathProtect = "/home/CozyCottage";
        break;
    }
    props.history.push(pathProtect);
  };
  // 中国说
  const intelligenceClick = () => {
    props.history.push("/home/YouthChina");
  };
  //挑战弹框
  const challengeBtn = () => {
    challengeModalRef.current.showModal();
    console.log(challengeModalRef);
    console.log(
      "%c  this.challengeModalRef:",
      "color: #0e93e0;background: #aaefe5;",
      challengeModalRef
    );
  };
  //视频弹框
  const ModalChange = (data) => {
    // this.setState({ visible: status });
    videoModalRef.current.showModal();
    console.log(videoModalRef);
    console.log(
      "%c  this.videoModalRef:",
      "color: #0e93e0;background: #aaefe5;",
      videoModalRef
    );
  };
  for (let i = 0; i < 4; i++) {
    releaseProductList.push(`产品${i}`);
  }
  const dataFistPage = async () => {
    // const res = await ajax({
    //   url: "/site",
    // });
    // console.log(res);
    // 轮播图
    // axios.post("/cms/slide/gid/8").then((res) => {
    //   console.log("banner", res);
    //   setSwiperList(res.data.data);
    // });

    // 奔跑青春
    // axios.post("/cms/slide/gid/9").then((res) => {
    //   console.log(res.data.data[0].description);
    //   const textArr = res.data.data[0].description.split("\r\n");
    //   res.data.data[0].descriptionArr = textArr;
    //   runData = res.data.data[0];
    // });
    // 奔跑青春
    const gids = "8,9,10,12,13,14";
    const dataRes = await ajax({
      url: "/extend/slidegroups",
      isJson: false,
      params: { gids },
    });
    if (dataRes.code === 1) {
      let swiperList;
      let energyData;
      let runData;
      let keyView;
      let everyStep;
      let moreBuData;
      let data = dataRes.data;
      for (let i = 0; i < data.length; i++) {
        let item = data[i];

        if (item.id === "8") {
          swiperList = item.data;
        }
        if (item.id === "9") {
          item.data[0].description = item.data[0].description
            ? item.data[0].description
            : runDefaultContent;
          let textArr = item.data[0].description.split("\r\n");
          item.data[0].descriptionArr = textArr;
          runData = item.data[0];
        }
        if (item.id === "10") {
          energyData = item.data;
        }
        if (item.id === "12") {
          keyView = item.data;
        }
        if (item.id === "13") {
          item.data.forEach((it) => {
            if (it.id === "25") {
              it.actionType = "goodAction";
              setActionBgc(it.pic);
              setVideoAction(it.video);
            }
            if (it.id === "26") {
              it.actionType = "badAction";
            }
            if (it.id === "27") {
              it.actionType = "crimeAction";
            }
          });
          everyStep = item.data;
        }
        if (item.id === "14") {
          setBuBgc(item.data[0].pic);
          item.data.forEach((ite) => {
            if (ite.id === "28") {
              ite.type = "court";
            }
            if (ite.id === "29") {
              ite.type = "selfProtect";
            }
            if (ite.id === "30") {
              ite.type = "house";
            }
          });
          moreBuData = item.data;
        }
      }
      setAllData({
        ...allData,
        swiperList,
        energyData,
        runData,
        moreBuData,
        everyStep,
        keyView,
      });
    }
  };
  const modifyInfoHtml = () => {
    document.title = "贵阳市花溪区青少年法治教育基地";
    const contentText1 =
      "青少年法治教育基地，花溪区人民法院，社会主义法治理念教育，安全意识教育，奔跑吧青春，青春正能量，社会主义核心价值观，道德与法，法律体系、良好行为，不良行为，犯罪行为，少年法庭，自我保护，温馨小屋，少年中国，答题挑战";
    const contentText2 =
      "贵阳市花溪区青少年法治教育基地以社会主义法治理念教育和安全意识教育为主线，突出社会主义核心价值观、道德与法、法律体系、良好行为、不良行为、犯罪行为、少年法庭、自我保护、温馨小屋和少年中国，体验在线答题挑战。";

    document
      .querySelector('meta[name="keywords"]')
      .setAttribute("content", contentText1);
    document
      .querySelector('meta[name="description"]')
      .setAttribute("content", contentText2);
  };
  useEffect(() => {
    modifyInfoHtml();
    dataFistPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoAction]);
  const {
    swiperList,
    runData = { pic: "" },
    energyData,
    keyView,
    everyStep,
    moreBuData,
  } = allData;
  return (
    <div className="Index-style">
      {/* 幻灯片 轮播图 */}
      {/* <SwiperHtml dataSwiper={swiperList} /> */}
      <div className="swiper-top">
        <div className="swiper-container">
          <div className="swiper-wrapper">
            {swiperList.length > 0 &&
              swiperList.map((item, index) => {
                return (
                  <div className="swiper-slide" key={index}>
                    <a key={index} href={item.link} target="_blank">
                      {item.pic && (
                        <img
                          data-id={item.id}
                          src={item.pic}
                          data-path={item.title}
                          title={item.title}
                          className="d-block w-100"
                        />
                      )}
                    </a>
                  </div>
                );
              })}
          </div>
          {/* <!-- Add Pagination --> */}
          <div className="swiper-pagination"></div>
          <div className="swiper-button-next">
            <img src={leftIcon} className="icon-next" />
          </div>
          <div className="swiper-button-prev">
            <img src={rightIcon} className="icon-pre" />
          </div>
        </div>
      </div>
      {/* 奔跑青春主题 */}
      <div className="run-youth-them back-cover">
        {runData.pic && (
          <div className="container container-youth">
            <div className="run-them-content">
              <div className="run-title">{runData.title}</div>
              {runData.descriptionArr.map((item, index) => {
                return (
                  <span key={index} className="text-content">
                    {item}
                  </span>
                );
              })}
            </div>
            <div className="run-img">
              <img src={runData.pic} />
            </div>
          </div>
        )}
      </div>
      {/* 青春正能量 */}
      <div className="youth-arthury back-cover">
        {energyData.length > 0 && (
          <div className="container">
            <div className="one-content">
              <div className="youth-img">
                <img src={YouthEnergy} />
              </div>
              <div className="arthury-content">
                <div className="arthury-title">{energyData[0].title}</div>
                <div className="arthury-text">
                  {energyData[0].description
                    ? energyData[0].description
                    : energyDefaultContent}
                </div>
                <div
                  className="arthury-btn"
                  onClick={() => {
                    transmitEnergy();
                  }}
                >
                  传递青春正能量
                </div>
              </div>
            </div>
            <div className="two-content">
              <div className="bg-white">
                <div className="row">
                  {keyView.map((item, index) => {
                    return (
                      <div
                        key={index}
                        style={{ marginBottom: "3.83rem" }}
                        className="col-12 col-sm-6 col-lg-2 wow zoomIn img-word"
                      >
                        <img
                          src={item.pic}
                          onClick={() => {
                            transmitEnergy();
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* 走向青春 */}
      <div className="go-youth back-cover">
        <div className="container">
          <div className="go-content">
            <div className="go-title">走好青春每一步</div>
            <span className="text-content">勿以善小而不为，勿以恶小而为之</span>
            <span className="text-content">
              告诫青少年慎思慎行，引导青少年学法、知法、懂法、守法
            </span>
            <span className="text-content">走好青春每一步</span>
          </div>
        </div>
      </div>
      {everyStep && (
        <div
          className="action-youth back-cover"
          style={{ background: `url(${actionBgc}) no-repeat` }}
          onClick={() => {
            actionClick(actionShow);
          }}
        >
          {everyStep.map((item) => {
            return (
              <div
                key={item.actionType}
                className={`go-youth-action ${
                  actionShow === item.actionType ? "action-show" : ""
                }`}
              >
                <div className="container">
                  <div className="youth-action">
                    <div
                      className="youth-audio"
                      onClick={(e) => {
                        actionPlay(e);
                      }}
                    >
                      {/* {actionShow === item.actionType && (
                        // <Player videoId="video-1">
                        //   <source src={videoAction} />
                        // </Player>
                        <VideoPlayer
                          src={videoAction}
                          width="768"
                          height="432"
                        />
                      )} */}
                      <div className="video-mask">
                        <img onClick={ModalChange} src={PlayIcon} alt="" />
                      </div>
                    </div>
                    <div className="action-tip">
                      <span
                        className={`good-action ${
                          actionShow === "goodAction" ? "action-style" : ""
                        }`}
                        data-action="goodAction"
                        onClick={(e) => {
                          actionBtn(e);
                        }}
                      >
                        良好行为
                      </span>
                      <span style={{ width: "20rem", height: "5rem" }}></span>
                      <span
                        className={`bad-action ${
                          actionShow === "badAction" ? "action-style" : ""
                        }`}
                        data-action="badAction"
                        onClick={(e) => {
                          actionBtn(e);
                        }}
                      >
                        不良行为
                      </span>
                      <span
                        className={`crime-action ${
                          actionShow === "crimeAction" ? "action-style" : ""
                        }`}
                        data-action="crimeAction"
                        onClick={(e) => {
                          actionBtn(e);
                        }}
                      >
                        犯罪行为
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {/* 让青春更美好 */}
      <div className="let-beauty">
        <div
          className="bg-img"
          style={{
            background: `url(${youthBackground}) no-repeat`,
          }}
        ></div>
        <div className="container">
          <div className="up-content">
            <span className="beauty-title">让青春更美好</span>
            <span className="beauty-text">以法律体系构筑青少年保护屏障</span>
            <span className="beauty-text">
              倡导青少年学法、懂法、用法、学会自我保护
            </span>
          </div>
          <div
            className="middle-img-cont"
            onClick={() => {
              protectClick();
            }}
          >
            <div
              className="bg-img"
              style={{
                background: `url(${buBgc}) no-repeat`,
              }}
            ></div>
            {/* <div className="bg-middle-text">
              以少年法庭为载体，以《示成年保护法》为核心，构建社会、学校、家一体的保护框架，形成了有效的青少年法律保护体系
            </div> */}
          </div>
          <div className="bottom-progress">
            <div className="line"></div>
            <div className="circle-progress">
              {moreBuData.map((item) => {
                return (
                  <div className="progress-item" key={item.type}>
                    <i
                      className={`circle ${
                        circleShow === item.type ? "circle-show" : ""
                      }`}
                      onMouseEnter={(e) => {
                        e.stopPropagation();
                        progressChange(item.type);
                        setBuBgc(item.pic);
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        progressChange(item.type);
                        setBuBgc(item.pic);
                      }}
                    ></i>
                    <span className="circle-name">{item.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* 中国梦 */}
      <div className="chinese-dream">
        <div className="bg-img dream-bg"></div>
        <div className="container in-position">
          <img src={IntelligenceImage} onClick={intelligenceClick} />
          {/* <div className="dream-audio"></div> */}
        </div>
      </div>
      {/* 答题挑战 */}
      <div className="challenge-question">
        <div className="bg-img dream-bg"></div>
        <div className="container">
          <div
            className="challenge-btn"
            onClick={() => {
              challengeBtn();
            }}
          >
            <img src={challengeIcon} alt="" />
            {/* 立即挑战 */}
          </div>
        </div>
      </div>
      <ChallengeModal ref={challengeModalRef} />
      <VideoModal ref={videoModalRef} videoSrc={videoAction} />
    </div>
  );
};
export default Index;
