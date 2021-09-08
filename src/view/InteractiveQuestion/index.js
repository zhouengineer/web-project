import React, { useState, useEffect, useRef } from "react";
import "./index.less";
import { Input, Menu, Modal, message, Alert } from "antd";
import { draw } from "./drawCode";
import BgImg from "@images/someBannerImages/a-q-banner.png";
import CallHead from "@images/iconImg/callHead.png";
import Question from "@images/iconImg/question.png";
import Answer from "@images/iconImg/answer.png";
import ajax from "@utils/ajax";
import Update from "@images/iconImg/update-icon.png";
const { Search, TextArea } = Input;

const defaultPage = {
  page: 0,
  size: 20,
};

const InteractiveQuestion = () => {
  const [question, setQuestion] = useState("");
  const [currentShow, setCurrentShow] = useState("17");
  const [valCode, setValCode] = useState("");
  const [code, setCode] = useState("");
  const [tipShow, setTipShow] = useState(false);
  const [tipShowCode, setTipShowCode] = useState(false);
  const [inputShow, setInputShow] = useState(false);
  const [infoList, setInfoList] = useState([]);
  const [keyVal, setKeyVal] = useState("");
  const [pageInfo, setPageInfo] = useState(defaultPage);
  const [banner, setBanner] = useState(BgImg);
  const [tabList, setTabList] = useState([]);
  const [isMore, setIsMore] = useState(true);
  const [messageList, setMessageList] = useState([]);
  const codeRef = useRef(null);
  const handleClick = (e) => {
    setIsMore(true);
    setKeyVal("");
    setPageInfo(defaultPage);
    setCurrentShow(e.key);
    if (e.key === "42") {
      getQuestionInfo(defaultPage, "", e.key);
    } else {
      getSearchData(defaultPage, "", e.key);
    }
  };
  // 问答 及获取验证码
  const nowAnswer = async () => {
    // if (inputShow) {

    // }
    // setInputShow(false);
    setTipShowCode(false);
    if (!question.trim()) {
      setTipShow(true);
      return;
    } else {
      setTipShow(false);
      if (!valCode.trim || valCode !== code) {
        setTipShowCode(true);
        return;
      }
      const params = { content: question };
      console.log("params", params);
      const res = await ajax({
        url: "/cms/addmsg",
        params: params,
        isJson: false,
      });
      if (res.code) {
        getCodeFun();
        setValCode("");
        Modal.info({
          title: "提示",
          okText: "知道了",
          content: (
            <div>
              <p>留言提交成功！</p>
            </div>
          ),
          onOk() {},
        });
        // setInputShow(false);
        setTipShowCode(false);
        setQuestion("");
        return false;
      }
      // getCodeFun();
      // setInputShow(true);
    }
  };
  const getCodeFun = async () => {
    // const res = await ajax({ url: "/cms/msgcode" });
    // if (res.code === 1) {
    //   setCode(res.data.msgcode);
    // }
    let sCode = "A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
    let aCode = sCode.split(",");
    let aLength = aCode.length; //获取到数组的长度
    let arr = [];
    for (let i = 0; i < 4; i++) {
      let j = Math.floor(Math.random() * aLength); //获取到随机的索引值
      let txt = aCode[j]; //得到随机的一个内容
      arr[i] = txt.toLowerCase();
    }
    let strArr = arr.join("");
    setCode(strArr);
  };
  // 获取基础信息
  const getInfo = async (dataVal) => {
    // banner i图片
    const navData = await ajax({ url: "/cms/nav" });
    if (navData.code === 1) {
      navData.data.forEach((item) => {
        if (item.id === "13" && item.pic) {
          setBanner(item.pic);
          setTabList(item.son);
          setCurrentShow(item.son[0].scode);
          getSearchData(pageInfo, keyVal, item.son[0].scode);
        }
      });
    }
  };

  // 资讯问答
  const getQuestionInfo = async (pageData, keys, scode, arr) => {
    // if (!isMore) {
    //   return false;
    // }
    const { size, page } = pageData;
    const params = { keyword: keys };
    const res = await ajax({
      url: `/cms/msg/num/${size}/page/${page}`,
      params,
      isJson: false,
    });
    if (res.code === 1) {
      if (arr && arr.length === 0) {
        setMessageList(res.data);
      } else {
        if (res.rowtotal === messageList.length) {
          setIsMore(false);
          return false;
        }
        if (scode === currentShow) {
          setMessageList([...messageList, ...res.data]);
        } else {
          setMessageList(res.data);
        }
      }
    }
  };
  // 常见问题
  const getSearchData = async (pageData, keys, scode, arr) => {
    // if (!isMore) {
    //   return false;
    // }
    const { size, page } = pageData;
    const params = { keyword: keys, scode };
    const res = await ajax({
      url: `/cms/search/page/${page}/num/${size}`,
      params,
      isJson: false,
    });
    if (res.code === 1) {
      if (arr && arr.length === 0) {
        setInfoList(res.data);
      } else {
        if (res.rowtotal === infoList.length) {
          setIsMore(false);
          return false;
        }
        if (scode === currentShow) {
          setInfoList([...infoList, ...res.data]);
        } else {
          setInfoList(res.data);
        }
      }
    }
  };

  const getMoreData = () => {
    setPageInfo((val) => {
      const newVal = { ...val, page: val.page + 1 };
      if (currentShow === "42") {
        getQuestionInfo(newVal, keyVal, currentShow);
      } else {
        getSearchData(newVal, keyVal, currentShow);
      }
      return newVal;
    });
  };
  const modifyInfoHtml = () => {
    document.title = "互动问答—贵阳市花溪区青少年法治教育基地";
    const contentText1 =
      "互动问答，留言咨询，常见法律问题，法律咨询，青少年法治教育基地";
    const contentText2 =
      "以常见问题和互动问答形式增强了青少年的法治意识，提高了明辨是非、自我约束、自我保护的能力，也激发了同学们学习法律知识的欲望。";
    document
      .querySelector('meta[name="keywords"]')
      .setAttribute("content", contentText1);
    document
      .querySelector('meta[name="description"]')
      .setAttribute("content", contentText2);
  };
  const drawCodeFun = () => {
    var show_num = [];
    for (let i = 0; i < code.length; i++) {
      const ele = code[i];
      show_num.push(ele);
    }
    console.log("drawCodeFun---show_num", show_num);
    draw(show_num);
  };
  useEffect(() => {
    modifyInfoHtml();
    getCodeFun();
    getInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    drawCodeFun();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);
  return (
    <div className="InteractiveQuestion-public-style">
      <div className="banner">
        <div
          className="bg-img"
          style={{ backgroundImage: `url(${banner})` }}
        ></div>
        <div className="container banner-out">
          <div className="code"></div>
          <div className="banner-msg-widow">
            <div className="head-cont">
              <img src={CallHead} alt="" />
              <span>留言资讯</span>
            </div>
            <TextArea
              className="text-area"
              value={question}
              placeholder="详细秒速问题，获取专业解答"
              rows={5}
              onChange={(e) => {
                setQuestion(e.target.value);
              }}
            />

            <div className="code-all-s">
              <Input
                value={valCode}
                className="input-style"
                placeholder="请输入验证码"
                onChange={(e) => {
                  setValCode(e.target.value);
                }}
              />
              <div className="get-code-style">
                <canvas id="canvas" width="100" height="43"></canvas>
              </div>
              <img onClick={getCodeFun} src={Update} />
            </div>

            {tipShow && <div className="tip">问题描述不能为空，请重试</div>}
            {tipShowCode && <div className="tip">验证码错误，请重试</div>}
            <div
              className="question-btn"
              onClick={() => {
                nowAnswer();
              }}
            >
              立即咨询
            </div>
          </div>
        </div>
      </div>
      <div className="InteractiveQuestion-content">
        <div className="container">
          <div className="content-main">
            <div className="tab-head">
              <Menu
                onClick={handleClick}
                selectedKeys={[currentShow]}
                mode="horizontal"
                className="tab-style"
              >
                {tabList.length > 0 &&
                  tabList.map((item) => {
                    return <Menu.Item key={item.scode}>{item.name}</Menu.Item>;
                  })}
                {/* {<Menu.Item key="usuallyQuestion">常见问题</Menu.Item>}
                <Menu.Item key="askQuestion">资讯问答</Menu.Item> */}
              </Menu>
              <Search
                className="search-tab"
                placeholder="输入关键词"
                enterButton="查询"
                size="large"
                value={keyVal}
                onChange={(e) => {
                  setKeyVal(e.target.value);
                }}
                onSearch={(value) => {
                  setInfoList((val) => {
                    const infoArr = [];
                    if (currentShow === "42") {
                      getQuestionInfo(defaultPage, value, currentShow, infoArr);
                    } else {
                      getSearchData(defaultPage, value, currentShow, infoArr);
                    }
                    return [];
                  });
                }}
              />
            </div>
            {currentShow === "17" ? (
              <div className="usuallyQuestion-style row">
                {infoList.length > 0 &&
                  infoList.map((it, i) => {
                    return (
                      <div
                        className="col-12 col-sm-4 col-lg-3 wow zoomIn"
                        key={i}
                      >
                        <div className="it-style">
                          <div
                            className="img-it-style bg-img"
                            style={{ background: `url(${it.ico})` }}
                          ></div>

                          <div className="name-style one-text-omit">
                            {it.title}
                          </div>
                          <div className="hover-out">
                            <div className="title-hover">{it.title}</div>
                            <div
                              className="hover-content"
                              // dangerouslySetInnerHTML={{ __html: it.content }}
                            >
                              {it.description}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div className="askQuestion-style">
                {messageList.length > 0 &&
                  messageList.map((ite, i) => {
                    const { content, create_time, recontent, update_time } =
                      ite;
                    return (
                      <div style={{ marginBottom: "5rem" }} key={i}>
                        <div className="question">
                          <div className="question-info ">
                            <img src={Question} alt="" />
                            <span className="question-content break-word">
                              {content}
                            </span>
                          </div>
                          <span className="time">{create_time}</span>
                        </div>
                        <div className="asks">
                          <div className="head-asks">
                            <img src={Answer} alt="" />
                            <span className="time">{update_time}</span>
                          </div>
                          <div className="answer-content">{recontent}</div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
          <div className="more-data" onClick={getMoreData}>
            {isMore ? "加载更多..." : "没有更多的了"}
          </div>
        </div>
      </div>
    </div>
  );
};
export default InteractiveQuestion;
