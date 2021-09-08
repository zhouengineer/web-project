import React, { useState, useRef, useEffect } from "react";
import "./index.less";
import { Menu } from "antd";
import PlayIcon from "@images/iconImg/play-icon.png";
import VideoModal from "../../components/videoModal";
import ajax from "@utils/ajax";

const classList = [
  { title: "全部", id: "classAll" },
  { title: "小学", id: "7" },
  { title: "初中", id: "8" },
  { title: "高中", id: "9" },
];
const constitutionList = [
  { title: "全部", id: "constitutionAll" },
  { title: "民商法", id: "1" },
  { title: "行政法", id: "2" },
  { title: "经济法", id: "3" },
  { title: "社会法", id: "4" },
  { title: "刑法", id: "5" },
  { title: "程序法", id: "6" },
];
const LawSchool = (props) => {
  const defaultPages = {
    page: 1,
    current: 0,
    size: 15,
  };
  const [question, setQuestion] = useState("");
  const [tabListItem, setTabListItem] = useState([]);
  const [currentShow, setCurrentShow] = useState("19");
  const [isShow, setIsShow] = useState(0);
  const [currentVideo, setCurrentVideo] = useState("");
  const [tabList, setTabList] = useState([]);
  const [pageData, setPageData] = useState(defaultPages);
  const [infoList, setInfoList] = useState([]);
  const [isMore, setIsMore] = useState(true);
  const [secodeVal, setSecodeVal] = useState("");
  const videoModalRef = useRef();

  const handleClick = (e) => {
    setIsShow(0);
    setCurrentShow(e.key);
    tabList.forEach((item) => {
      if (item.id === e.key) {
        setTabListItem(item.son);
        setSecodeVal(item.son[0].scode);
        setInfoList([]);
        setIsMore(true);
        getTabItemList(defaultPages, item.son[0].scode);
      }
    });
  };
  const tabItemClick = (e, item, index) => {
    setIsShow(index);
    setSecodeVal(item.scode);
    setInfoList([]);
    setIsMore(true);
    getTabItemList(defaultPages, item.scode);

    // e.currentTarget.style.backgroundColor = "red";
  };
  const moreFunc = () => {
    const newCurrent = pageData.current + 1;
    setPageData({ ...pageData, current: newCurrent });
    getTabItemList(pageData, secodeVal);
  };
  //视频弹框
  const ModalChange = (data) => {
    setCurrentVideo(data.video);
    // this.setState({ visible: status });
    videoModalRef.current.showModal();
    console.log(videoModalRef);
    console.log(
      "%c  this.videoModalRef:",
      "color: #0e93e0;background: #aaefe5;",
      videoModalRef
    );
  };
  const getData = async (tab, tabItem) => {
    const navData = await ajax({ url: "/cms/nav" });
    if (navData.code === 1) {
      navData.data.forEach((item) => {
        if (item.id === "12") {
          for (let i = 0; i < item.son.length; i++) {
            const ele = item.son[i];
            const { scode } = ele;
            console.log("ele---", ele);
            const obj = {
              name: "全部",
              scode,
            };
            ele.son.unshift(obj);
          }
          console.log("item.son", item.son);
          setTabList(item.son);
          setTabListItem(item.son[0].son);
          setSecodeVal(item.son[0].son[0].scode);
        }
      });
    }
  };
  const getTabItemList = async (pages, scode) => {
    if (!isMore && scode === secodeVal) {
      return false;
    }
    const { current, size } = pages;
    const res = await ajax({
      url: `/list/${scode}/page/${current}/num/${size}`,
    });
    if (res.code === 1) {
      const dataArr = res.data;
      if (res.rowtotal === infoList.length) {
        setIsMore(false);
        return false;
      }
      if (scode === secodeVal) {
        setInfoList([...infoList, ...dataArr]);
      } else {
        setInfoList(dataArr);
      }
    }
  };
  const modifyInfoHtml = () => {
    document.title = "法治学堂—贵阳市花溪区青少年法治教育基地";
    const contentText1 =
      "法治学堂，小学法治视频、初中法治视频、高中法治视频，宪法，民法典，行政法，经济法，社会法，刑法，诉讼与非诉讼程序法";
    const contentText2 =
      "法治学堂主要以视频形式传播小学、初中、高中的法律知识和安全知识，提高青少年学法、用法、自爱自护的意识和能力，保障青少年成长。";
    document
      .querySelector('meta[name="keywords"]')
      .setAttribute("content", contentText1);
    document
      .querySelector('meta[name="description"]')
      .setAttribute("content", contentText2);
  };
  useEffect(() => {
    modifyInfoHtml();
    getTabItemList(pageData, "19");
    getData(currentShow, isShow);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="LawSchool-style">
      <div className="container">
        <div className="content-main">
          <div className="tab-head">
            {tabList.length && (
              <Menu
                onClick={handleClick}
                selectedKeys={[currentShow]}
                mode="horizontal"
                className="tab-style"
              >
                {tabList.map((item, index) => {
                  return <Menu.Item key={item.id}>{item.name}</Menu.Item>;
                })}
                {/* <Menu.Item key="classes">课程</Menu.Item>
              <Menu.Item key="constitution">宪法</Menu.Item> */}
              </Menu>
            )}
          </div>
          {tabListItem.length && (
            <ul className="tab-item">
              {tabListItem.map((item, index) => {
                return (
                  <li
                    className={`li-item ${isShow === index ? "bg" : ""}`}
                    onClick={(e) => {
                      tabItemClick(e, item, index);
                    }}
                    key={index}
                  >
                    {item.name}
                  </li>
                );
              })}
            </ul>
          )}

          <div className="content-radio row">
            {infoList.length > 0 &&
              infoList.map((it, i) => {
                return (
                  <div
                    className="col-12 col-sm-6 col-lg-4 wow zoomIn"
                    onClick={() => {
                      ModalChange(it);
                    }}
                    key={i}
                  >
                    {it.video ? (
                      <div className="it-style">
                        <div
                          className="img-it-style bg-img"
                          style={{ background: `url(${it.ico})` }}
                        ></div>
                        <img src={PlayIcon} alt="" />
                        <div className="title-style one-text-omit">
                          {it.title}
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })}
          </div>
          <div className="more-data" onClick={moreFunc}>
            {isMore ? "加载更多..." : "没有更多的了"}
          </div>
        </div>
      </div>
      <VideoModal ref={videoModalRef} videoSrc={currentVideo} />
    </div>
  );
};
export default LawSchool;
