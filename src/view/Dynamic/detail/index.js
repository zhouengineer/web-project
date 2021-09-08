import React, { useEffect, useState } from "react";
import { searchToJson } from "@utils";
import "./index.less";
import RightInfo from "../rightInfo";
import ajax from "@utils/ajax";

// const bgImg = require("@images/someBannerImages/a-q-banner.png");

const Detail = (props) => {
  //   const search = decodeURIComponent(window.location.search);
  //   const id = getUrlQueryString(search, "id");
  const { id, currentShow } = searchToJson(props.location.search);
  const [articleInfo, setArticleInfo] = useState({
    content: "",
    pre: null,
    next: null,
  });
  const tabName = currentShow === "3" ? "领导参观" : "团队参观";
  const upClick = (info) => {
    articleDetail(info.id);
  };
  const nextClick = (info) => {
    articleDetail(info.id);
  };
  const articleDetail = async (val) => {
    const res = await ajax({ url: `/content/${val}` });
    if (res.code === 1) {
      setArticleInfo(res.data);
    }
  };
  useEffect(() => {
    articleDetail(id);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="Detail-public-style">
      <div className="container">
        <div className="content-main">
          <div className="detail-content">
            <div className="head-tab">
              <i></i>
              <div className="tab-name">
                <span
                  className="one-tab"
                  onClick={() => {
                    props.history.push(`/home/dynamic`);
                  }}
                >
                  {`基地动态 > `}
                </span>
                <span>{tabName}</span>
              </div>
            </div>
            {articleInfo.content && (
              <div className="content-info">
                <div className="info-title">{articleInfo.title}</div>
                <div className="info-other">
                  <span>发布时间：{articleInfo.date} </span>
                  <span>作者：{articleInfo.author}</span>
                  <span>浏览：{articleInfo.visits}</span>
                </div>
                <div
                  className="info-main"
                  dangerouslySetInnerHTML={{ __html: articleInfo.content }}
                ></div>
              </div>
            )}
            <div className="foot-jump ">
              {articleInfo.pre && (
                <div
                  className="jump-page one-text-omit"
                  onClick={() => {
                    upClick(articleInfo.pre);
                  }}
                >
                  <i></i>
                  <span className="hed">上一篇</span>
                  <span className="hed-cont">{articleInfo.pre.title}</span>
                </div>
              )}
              {articleInfo.next && (
                <div
                  className="jump-page one-text-omit"
                  onClick={() => {
                    nextClick(articleInfo.next);
                  }}
                >
                  <i></i>
                  <span className="hed">下一篇</span>
                  <span className="hed-cont">{articleInfo.next.title}</span>
                </div>
              )}
            </div>
          </div>
          <RightInfo props={props} />
        </div>
      </div>
    </div>
  );
};
export default Detail;
