import React, { useState, useEffect } from "react";
// import { RightOutlined } from "@ant-design/icons";
import { Icon } from "antd";

import Notice from "./notice";
import OpenTime from "./openTime";
import Order from "./order";
import "./index.less";
import BgImg from "@images/someBannerImages/order-visit-bg.png";
import ajax from "@utils/ajax";
const OrderVisit = (props) => {
  const [tabShow, setTabShow] = useState("notice");
  const [banner, setBanner] = useState(BgImg);
  const [noticeData, setNoticeData] = useState({});
  const [openTimeData, setOpenTimeData] = useState({});
  const [orderDada, setOrderDada] = useState({});
  const tabChange = (type) => {
    setTabShow(type);
  };
  const tabLeftList = [
    { title: "参观须知", type: "notice" },
    { title: "开发时间", type: "openTime" },
    { title: "参观预约", type: "order" },
  ];
  const getData = async () => {
    const navData = await ajax({ url: "/cms/nav" });
    if (navData.code === 1) {
      navData.data.forEach((item) => {
        if (item.id === "14" && item.pic) {
          setBanner(item.pic);
        }
      });
    }

    const resData = await ajax({
      url: "/extend/aboutlist",
      isJson: false,
      params: { scodes: "14,15,16" },
    });
    if (resData.code === 1) {
      resData.data.forEach((item) => {
        const { scode } = item;
        if (scode === "14") {
          setNoticeData(item);
        }
        if (scode === "15") {
          setOpenTimeData(item);
        }
        if (scode === "16") {
          setOrderDada(item);
        }
      });
    }
  };
  const modifyInfoHtml = () => {
    document.title = "参观预约—贵阳市花溪区青少年法治教育基地";
    const contentText1 =
      "青少年法治教育基地，参观预约，参观须知，基地开放时间，参观报名";
    const contentText2 =
      "参观预约主要展示参观须知的内容、基地的开放时间，满足用户在线预约并提交信息。";
    document
      .querySelector('meta[name="keywords"]')
      .setAttribute("content", contentText1);
    document
      .querySelector('meta[name="description"]')
      .setAttribute("content", contentText2);
  };
  useEffect(() => {
    modifyInfoHtml();
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="order-styles">
      <div className="banner">
        <div
          className="bg-img"
          style={{ backgroundImage: "url(" + banner + ")" }}
        ></div>
      </div>
      <div className="content-main">
        <div className="container">
          <div className="progress-order">
            <ul className="ul-tab">
              <li className="tab-head">参观导览</li>
              {tabLeftList.map((item) => {
                return (
                  <li
                    key={item.type}
                    className={`tab-item ${
                      tabShow === item.type ? "color-change" : ""
                    }`}
                    onClick={() => {
                      tabChange(item.type);
                    }}
                  >
                    <div className="ta">
                      <i
                        className="line-bg"
                        style={{
                          display:
                            tabShow === item.type ? "inline-block" : "none",
                        }}
                      ></i>
                      <span className="fonts">{item.title}</span>
                    </div>
                    <Icon type="right" />
                  </li>
                );
              })}
            </ul>
            <div className="content-right">
              <div className="progress-info">
                <div className="tab-name">
                  {tabShow === "notice"
                    ? "参观须知"
                    : tabShow === "openTime"
                    ? "开放时间"
                    : "参观预约"}
                </div>
                <div className="cont-info">
                  {tabShow === "notice" && (
                    <Notice tabChange={tabChange} noticeData={noticeData} />
                  )}
                  {tabShow === "openTime" && (
                    <OpenTime openTimeData={openTimeData} />
                  )}
                  {tabShow === "order" && (
                    <Order tabChange={tabChange} orderDada={orderDada} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderVisit;
