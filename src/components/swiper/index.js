/* eslint-disable no-unused-vars */
import React, { useEffect, Component } from "react";
import Swiper from "swiper";
import SwiperItem from "../swiperItem";
import "./index.less";

const SwiperRender = (props) => {
  const { typeSwiper, dataSwiper } = props;

  const swiperFunction = () => {
    const paramsSwiper = {
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    };
    var mySwiper = new Swiper(".swiper-container", paramsSwiper);
  };
  useEffect(() => {
    swiperFunction();
  }, [dataSwiper]);
  return (
    <div>
      {/* <!-- 幻灯片 --> */}
      <div className="swiper-container">
        <div className="swiper-wrapper">
          {dataSwiper.length > 0 &&
            dataSwiper.map((item, index) => {
              return (
                <div className="swiper-slide" key={index}>
                  {/* <a key={index} href={item.link} target="_blank"> */}
                  {item.pic && (
                    <img
                      data-id={item.id}
                      src={item.pic}
                      data-path={item.title}
                      title={item.title}
                      className="d-block w-100"
                    />
                  )}
                  {/* </a> */}
                </div>
              );
            })}
        </div>
        {/* <!-- Add Pagination --> */}
        <div className="swiper-pagination"></div>
      </div>
      {/* <div className="swiper-container">
        <div className="swiper-wrapper">
          {dataSwiper.length > 0 &&
            dataSwiper.map((item, index) => {
              return (
                <a
                  className="swiper-slide"
                  key={index}
                  href={item.link}
                  target="_blank"
                >
                  <SwiperItem
                    item={item}
                    ItemOnClick={() => {
                      this.ItemOnClick(item);
                    }}
                  />
                </a>
              );
            })}
        </div>
        {/* <!--左箭头--> */}
      {/* <div className="swiper-button-prev d-none d-md-block"></div> */}
      {/* <!--右箭头--> */}
      {/* <div className="swiper-button-next d-none d-md-block"></div>
        <div className="swiper-pagination"></div>
      </div> */}
    </div>
  );
};
export default SwiperRender;
