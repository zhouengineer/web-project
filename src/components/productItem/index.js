import React from "react";
import "./index.less";

export default function ProductItem({ item, itemOnclick = () => {} }) {
  return (
    <div
      className="col-12 col-sm-6 col-lg-3 wow zoomIn"
      data-wow-delay="100ms"
      data-wow-duration="1s"
      onClick={() => {
        itemOnclick();
      }}
    >
      <div className="card">
        <div className="card-img-150">
          <div>
            <img
              className="card-img-top"
              // src={require('@src/assets/upload/image/20180412/1523499979727269.jpg')}
              alt="网站空间"
            />
          </div>
        </div>
        <div className="card-body">
          <h5 className="card-title">
            <div>网站空间{item}</div>
          </h5>
          <p className="card-text">
            PbootCMS是全新内核且永久开源免费的PHP企业网站开发建设管理系统，是一套高效、简洁、
            强悍···
          </p>
        </div>
      </div>
    </div>
  );
}
