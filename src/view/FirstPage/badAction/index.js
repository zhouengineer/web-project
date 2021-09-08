import React, { useEffect, useState } from "react";
import "./index.less";
import BadItemIcon from "@images/action/bad-item-icon.png";
import BadOne from "@images/action/bad1.png";
import goodDoorSun from "@images/action/good-door-sun.png";
import goodDoorBlack from "@images/action/good-door-black.png";
import entryIcon from "@images/action/entry-icon.png";
import badBottomImg from "@images/action/bad-bottom-img.png";
import ajax from "@utils/ajax";

const BadAction = (props) => {
  const [banner, setBanner] = useState("");
  const [dataInfo, setDataInfo] = useState({});

  const badActionList = [
    {
      title: "行方思远 进学致和",
      icon: BadItemIcon,
      badAction: BadOne,
    },
    {
      title: "行方思远 进学致和",
      icon: BadItemIcon,
      badAction: BadOne,
    },
    {
      title: "行方思远 进学致和",
      icon: BadItemIcon,
      badAction: BadOne,
    },
    {
      title: "行方思远 进学致和",
      icon: BadItemIcon,
      badAction: BadOne,
    },
    {
      title: "行方思远 进学致和",
      icon: BadItemIcon,
      badAction: BadOne,
    },
    {
      title: "行方思远 进学致和",
      icon: BadItemIcon,
      badAction: BadOne,
    },
    {
      title: "行方思远 进学致和",
      icon: BadItemIcon,
      badAction: BadOne,
    },
    {
      title: "行方思远 进学致和",
      icon: BadItemIcon,
      badAction: BadOne,
    },
  ];
  const jumpClick = () => {
    props.history.push("/home/CrimeAction");
  };
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

    const res = await ajax({ url: "/about/35" });
    if (navData.code === 1) {
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
    <div className="bad-action-style">
      <div className="banner">
        <div
          className="bg-img "
          style={{ backgroundImage: `url(${banner})` }}
        ></div>
        <div className="container"></div>
      </div>
      <div className="bad-action-content">
        {/* <div className="entry-door">
          <div className="bg-img door-bg"></div>

          <div className="container con-door">
            <div className="door">
              <img src={goodDoorSun} alt="" />
              <div className="black-name">阳光通道</div>
            </div>
            <div className="door">
              <img src={goodDoorBlack} alt="" />
              <div className="sun-name">
                <img className="entry-icon" src={entryIcon} alt="" />
                <span>黑暗通道</span>
              </div>
            </div>
          </div>
        </div> */}
        <div className="content-all">
          {/* <div className="bg-img item-bg"></div> */}

          {/* <div className="container"> */}
          <div className="content-main">
            <div dangerouslySetInnerHTML={{ __html: dataInfo.content }}></div>

            {/* {badActionList.map((item, index) => {
                const { title, icon, badAction } = item;
                return (
                  <div key={index} className="bad-action-item">
                    <div className="head-name">
                      <img className="icon-img" src={icon} alt="" />
                      <span className="title">{title}</span>
                    </div>
                    <img className="bad-img" src={badAction} alt="" />
                  </div>
                );
              })} */}
          </div>
          {/* <div className="container">
            <div className="bottom-jump">
              <img className="bg-bt" src={badBottomImg} alt="" />
              <div className="jump-btn" onClick={jumpClick}>{`犯罪行为>>`}</div>
            </div>
          </div> */}
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};
export default BadAction;
