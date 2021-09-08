import React, { useEffect, useState } from "react";
import "./index.less";
import GoodItemIcon from "@images/action/good-item-icon.png";
import GoodOne from "@images/action/good1.png";
import goodDoorSun from "@images/action/good-door-sun.png";
import entryIcon from "@images/action/entry-icon.png";
import GoodDoorBlack from "@images/action/good-door-black.png";
import ajax from "@utils/ajax";
const GoodAction = (props) => {
  const [banner, setBanner] = useState("");
  const [dataInfo, setDataInfo] = useState({});
  const goodActionList = [
    {
      title: "行方思远 进学致和",
      icon: GoodItemIcon,
      goodAction: GoodOne,
    },
    {
      title: "行方思远 进学致和",
      icon: GoodItemIcon,
      goodAction: GoodOne,
    },
    {
      title: "行方思远 进学致和",
      icon: GoodItemIcon,
      goodAction: GoodOne,
    },
    {
      title: "行方思远 进学致和",
      icon: GoodItemIcon,
      goodAction: GoodOne,
    },
    {
      title: "行方思远 进学致和",
      icon: GoodItemIcon,
      goodAction: GoodOne,
    },
    {
      title: "行方思远 进学致和",
      icon: GoodItemIcon,
      goodAction: GoodOne,
    },
    {
      title: "行方思远 进学致和",
      icon: GoodItemIcon,
      goodAction: GoodOne,
    },
    {
      title: "行方思远 进学致和",
      icon: GoodItemIcon,
      goodAction: GoodOne,
    },
  ];
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

    const res = await ajax({ url: "/about/34" });
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
    <div className="good-action-style">
      <div className="banner">
        <div
          className="bg-img"
          style={{ backgroundImage: `url(${banner})` }}
        ></div>
        <div className="container"></div>
      </div>
      <div className="good-action-content">
        <div className="entry-door">
          {/* <div className="bg-img door-bg"></div>

          <div className="container con-door">
            <div className="door">
              <img src={goodDoorSun} alt="" />
              <div className="sun-name">
                <img className="entry-icon" src={entryIcon} alt="" />
                <span>阳光通道</span>
              </div>
            </div>
            <div className="door">
              <img src={GoodDoorBlack} alt="" />
              <div className="black-name">黑暗通道</div>
            </div>
          </div> */}
        </div>
        <div className="content-all">
          {/* <div className="bg-img item-bg"></div> */}
          {/* <div className="bg-img"></div> */}

          {/* <div className="container"> */}
          <div className="content-main">
            <div dangerouslySetInnerHTML={{ __html: dataInfo.content }}></div>
            {/* {goodActionList.map((item, index) => {
                const { title, icon, goodAction } = item;
                return (
                  <div key={index} className="good-action-item">
                    <div className="head-name">
                      <img className="icon-img" src={icon} alt="" />
                      <span className="title">{title}</span>
                    </div>
                    <img className="good-img" src={goodAction} alt="" />
                  </div>
                );
              })} */}
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};
export default GoodAction;
