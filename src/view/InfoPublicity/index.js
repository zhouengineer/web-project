/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-target-blank */

import React, { useState, useEffect } from "react";
import "./index.less";
import ajax from "@utils/ajax";
import InfoBanner from "@images/someBannerImages/info-banner.png";
const InfoPublic = (props) => {
  const [infoList, setInfoList] = useState([]);
  const [banner, setBanner] = useState(InfoBanner);

  const getData = async () => {
    // banner i图片
    const navData = await ajax({ url: "/cms/nav" });
    if (navData.code === 1) {
      navData.data.forEach((item) => {
        if (item.id === "11" && item.pic) {
          setBanner(item.pic);
        }
      });
    }

    const res = await ajax({
      url: "/extend/linkgroups",
      params: { gids: "4,5,6" },
      isJson: false,
    });
    if (res.code === 1) {
      setInfoList(res.data);
    }
  };
  const modifyInfoHtml = () => {
    document.title = "信息公开—贵阳市花溪区青少年法治教育基地";
    const contentText1 = "信息公开，法院资讯，司法公开，诉讼指南";
    const contentText2 =
      "信息公开为法律资讯和法律流程的查询入口，集中了法院资讯网站，司法公开网站和诉讼指南网站。";
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
    <div className="info-public-style">
      <div className="banner">
        <div
          className="bg-img "
          style={{ backgroundImage: "url(" + banner + ")" }}
        ></div>
        <div className="container"></div>
      </div>
      <div className="info-content">
        <div className="container">
          <div className="content-main">
            <div className="bg-white py-4">
              {/* <div className="row"> */}
              {infoList &&
                infoList.map((item, index) => {
                  return (
                    <div className="item-style" key={index}>
                      <div className="title-style">{item.name}</div>
                      <div className="row-website row">
                        {item.data.map((it, i) => {
                          return (
                            <div
                              className="col-12 col-sm-4 col-lg-3 wow zoomIn"
                              key={i}
                            >
                              <a
                                key={i}
                                onClick={(it) => {
                                  // window.open(it.url);
                                }}
                                href={it.link}
                                target="_blank"
                                className="it-style"
                              >
                                <img
                                  className="img-it-style"
                                  src={it.logo}
                                  style={{ marginBottom: "3.83rem" }}
                                />
                                <div className="name-style one-text-omit">
                                  {it.name}
                                </div>
                              </a>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default InfoPublic;
