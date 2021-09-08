/* eslint-disable jsx-a11y/alt-text */
/*
 * @Author: your name
 * @Date: 2021-01-29 15:50:05
 * @LastEditTime: 2021-01-29 15:57:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ifream-website\src\componets\navTab\index.js
 */
import React, { useState, useEffect } from "react";

import "./index.less";
import Logo from "@images/indexImages/logo.png";
import Appointment from "@images/indexImages/appointment.png";
import TitleName from "@images/indexImages/title-img.png";
const navList = [
  {
    // title: "需求", //首页
    title: "首页", //首页
    key: "one",
    path: "/home",
    num: 0,
  },
  {
    // title: "研发流程", //基地状况
    title: "基地概况", //基地状况
    key: "two",
    path: "/home/generalSituation",
    num: 1,
  },
  {
    // title: "技术沉淀", //基地动态
    title: "基地动态", //基地动态
    key: "three",
    path: "/home/dynamic",
    num: 2,
  },
  {
    // title: "团队管理", //法治学堂
    title: "法治学堂", //法治学堂
    key: "four",
    path: "/home/lawSchool",
    num: 3,
  },
  {
    // title: "项目文档", //互问互答
    title: "互动问答", //互问互答
    key: "five",
    path: "/home/interactiveQuestion",
    num: 4,
  },
  {
    // title: "周会纪要", //信息公开
    title: "信息公开", //信息公开
    key: "six",
    path: "/home/infoPublicity",
    num: 5,
  },
];
const NabTab = (props) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [ariaExpanded, setaRaExpanded] = useState(false);
  const [isExtend, setIsExtend] = useState(false);
  useEffect(() => {
    // navList.forEach((item) => {
    //   console.log("item", item);
    //   if (tabIndex === item.num) {
    //     props.history.push(item.path);
    //   }
    // });
  }, []);
  const handleClick = (item) => {
    let { path = "", num = 0 } = item;
    props.history.push(path);
    setTabIndex(num);
    setaRaExpanded(0);
    // const valAtt = document
    //   .querySelector('button[data-toggle="collapse"]')
    //   .getAttribute("aria-expanded");
    // console.log("arrr", !JSON.parse(valAtt));
    // setIsExtend(false);
    // document
    //   .querySelector('button[data-toggle="collapse"]')
    //   .setAttribute("aria-expanded", String(!JSON.parse(valAtt)));
    // let navbarToggler = document.getElementsByClassName("navbar-toggler")[0];
    // console.log(navbarToggler);
    // navbarToggler.click();
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };
  //预约参加
  const orderVisit = () => {
    props.history.push("/home/orderVisit");
  };
  useEffect(() => {
    const { location } = props;
    navList.forEach((item) => {
      if (item.path === location.pathname) {
        setTabIndex(item.num);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="nav-head">
      <nav className="navbar navbar-light bg-light fixed-top navbar-expand-lg shadow-sm">
        {/* <div className="container"> */}
        {/* logo */}
        <div className="navbar-brand">
          <div className="out-logo">
            <img
              src={Logo}
              className="logo-sm-height logo-img"
              onClick={() => {
                props.history.push("/home");
              }}
            />
          </div>
          <div className="logo-text">
            {/* //贵阳市花溪区青少年法制教育基地 */}
            <div className="institution-title">
              <img src={TitleName} alt="" />
            </div>
            {/* 贵阳市花溪区人民法院 */}
            {/* <div className="institution-subTile">研发部前端组全体组员</div> */}
          </div>
          <div
            className="subscribe-style justify-content-end"
            onClick={() => {
              orderVisit();
            }}
          >
            <img className="subscribe-img" src={Appointment} />
            <span className="subscribe-text">预约参加</span>
          </div>
        </div>
        {/* </div> */}
        <div className="nav-content">
          <div className="container">
            {/* 收缩后的button */}
            {/* <button
              className={`navbar-toggler ${isExtend ? "" : "collapsed"}`}
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded={ariaExpanded}
              aria-label="Toggle navigation"
              onClick={() => {
                console.log("1111");
              }}
            >
              <span className="navbar-toggler-icon"></span>
            </button> */}
            {/* 导航 */}
            <div
              // className={` navbar-collapse show}`}
              id="navbarNav"
            >
              {/* <div className="collapse navbar-collapse"> */}
              <ul className="navbar-nav">
                {navList.map((item, index) => {
                  return (
                    <li
                      onClick={() => {
                        handleClick(item);
                      }}
                      className={`nav-item ${tabIndex === index && "active"} `}
                      key={item.title}
                      data-path={item.path}
                      data-index={index}
                    >
                      <div className="nav-link">{item.title}</div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default NabTab;
