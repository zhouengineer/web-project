/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./index.less";
import banner from "@images/indexImages/banner.png";
export default function SwiperItem({ item, ItemOnClick = () => {} }) {
  const { id, pic, link, title, description } = item;
  return (
    <div className="swiper-slide">
      <div>
        {item.pic && (
          <img
            data-id={item.id}
            src={pic}
            data-path={title}
            title={title}
            className="d-block w-100"
          />
        )}
      </div>
      {/* <div className="container">
        <div className="position-absolute" style={{ top: "30%" }}>
          <h1 className="fs-20 fs-sm-32 wow slideInUp">{title}</h1>
          <h4 className="fs-14 fs-sm-20 wow slideInUp">{description}</h4>
        </div>
      </div> */}
    </div>
  );
}
