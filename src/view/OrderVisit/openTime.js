import React, { useState, useEffect } from "react";
import OrderMore from "@images/iconImg/order-more.png";
import ajax from "@utils/ajax";
import moment from "moment";
const OpenTime = () => {
  const defaultPage = {
    page: 0,
    size: 6,
  };
  const [timeList, setTimeList] = useState([]);
  const [pageData, setPageData] = useState(defaultPage);
  const [isMore, setIsMore] = useState(true);
  const moreFun = () => {
    console.log("更多");
    setPageData((val) => {
      const newVal = { ...pageData, page: pageData.page + 1 };
      getTimeData(newVal);
      return newVal;
    });
  };
  const getTimeData = async (pages) => {
    if (!isMore) {
      return false;
    }
    const { page, size } = pages;
    const res = await ajax({
      url: `/list/41/page/${page}/num/${size}`,
    });
    if (res.code === 1) {
      if (typeof res.data === "string") {
        setIsMore(false);
      } else {
        const dateCurrentYear = moment(new Date()).format("YYYY年");
        const dateCurrentMoth = Number(moment(new Date()).format("MM"));
        const dateCurrent = dateCurrentYear + String(dateCurrentMoth) + "月";
        let arr = [...timeList, ...res.data];
        arr.forEach((ele) => {
          if (ele.title === dateCurrent) {
            ele.currentTime = true;
          }
        });
        setTimeList(arr);
      }
    }
  };
  useEffect(() => {
    getTimeData(pageData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="open-time-style">
      {timeList.map((item, index) => {
        const { title, content, currentTime } = item;
        return (
          <div key={index} className="item-style">
            <i className={`circle ${currentTime ? "current-circle" : ""} `}></i>
            <div className="time">{title}</div>
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: content }}
            ></div>
          </div>
        );
      })}
      <div className="more-order" onClick={moreFun}>
        {isMore ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img className="more-img" src={OrderMore} alt="" />
            <span className="mo">查看更多</span>
          </div>
        ) : (
          <div>没有更多的了...</div>
        )}
      </div>
    </div>
  );
};
export default OpenTime;
