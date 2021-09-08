/*
 * @Author: your name
 * @Date: 2021-01-28 16:19:37
 * @LastEditTime: 2021-01-28 16:20:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ifream-website\src\view\Home\Info\index.js
 */
import React, { useState, useEffect } from "react";
import "./index.less";
import { Input, Menu } from "antd";
import RightInfo from "./rightInfo";
import Pagination from "../../components/pagination";
import BgImg from "@images/someBannerImages/banner-student.png";
import ajax from "@utils/ajax";

const { Search } = Input;
const termList = [
  {
    title:
      "市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火",
    img: "https://img0.baidu.com/it/u=3054397113,1176859593&fm=26&fmt=auto&gp=0.jpg",
    content:
      "为啥很好，有啥原因吗，能告诉我吗，我真的很想知道，市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火",
    time: "2021-08-12",
  },
  {
    title:
      "市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火",
    img: "https://img0.baidu.com/it/u=3054397113,1176859593&fm=26&fmt=auto&gp=0.jpg",
    content:
      "为啥很好，有啥原因吗，能告诉我吗，我真的很想知道，市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火",
    time: "2021-08-12",
  },
  {
    title:
      "市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火",
    img: "https://img0.baidu.com/it/u=3054397113,1176859593&fm=26&fmt=auto&gp=0.jpg",
    content:
      "为啥很好，有啥原因吗，能告诉我吗，我真的很想知道，市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火",
    time: "2021-08-12",
  },
  {
    title:
      "市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火",
    img: "https://img0.baidu.com/it/u=3054397113,1176859593&fm=26&fmt=auto&gp=0.jpg",
    content:
      "为啥很好，有啥原因吗，能告诉我吗，我真的很想知道，市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火",
    time: "2021-08-12",
  },
  {
    title:
      "市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火",
    img: "https://img0.baidu.com/it/u=3054397113,1176859593&fm=26&fmt=auto&gp=0.jpg",
    content:
      "为啥很好，有啥原因吗，能告诉我吗，我真的很想知道，市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火",
    time: "2021-08-12",
  },
  {
    title:
      "市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火",
    img: "https://img0.baidu.com/it/u=3054397113,1176859593&fm=26&fmt=auto&gp=0.jpg",
    content:
      "为啥很好，有啥原因吗，能告诉我吗，我真的很想知道，市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火",
    time: "2021-08-12",
  },
];
const leaderList = [
  {
    title:
      "市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领",
    img: "https://img0.baidu.com/it/u=3054397113,1176859593&fm=26&fmt=auto&gp=0.jpg",
    content:
      "为啥很好，有啥原因吗，能告诉我吗，我真的很想知道，市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火",
    time: "2021-08-12",
  },
  {
    title:
      "市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火",
    img: "https://img0.baidu.com/it/u=3054397113,1176859593&fm=26&fmt=auto&gp=0.jpg",
    content:
      "为啥很好，有啥原因吗，能告诉我吗，我真的很想知道，市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火",
    time: "2021-08-12",
  },
  {
    title:
      "市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火",
    img: "https://img0.baidu.com/it/u=3054397113,1176859593&fm=26&fmt=auto&gp=0.jpg",
    content:
      "为啥很好，有啥原因吗，能告诉我吗，我真的很想知道，市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火",
    time: "2021-08-12",
  },
  {
    title:
      "市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火",
    img: "https://img0.baidu.com/it/u=3054397113,1176859593&fm=26&fmt=auto&gp=0.jpg",
    content:
      "为啥很好，有啥原因吗，能告诉我吗，我真的很想知道，市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火",
    time: "2021-08-12",
  },
  {
    title:
      "市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火",
    img: "https://img0.baidu.com/it/u=3054397113,1176859593&fm=26&fmt=auto&gp=0.jpg",
    content:
      "为啥很好，有啥原因吗，能告诉我吗，我真的很想知道，市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火",
    time: "2021-08-12",
  },
  {
    title:
      "市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火",
    img: "https://img0.baidu.com/it/u=3054397113,1176859593&fm=26&fmt=auto&gp=0.jpg",
    content:
      "为啥很好，有啥原因吗，能告诉我吗，我真的很想知道，市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火",
    time: "2021-08-12",
  },
];
const defaultPagination = {
  size: 10,
  current: 1,
  total: 10,
};
const Dynamic = (props) => {
  const [currentShow, setCurrentShow] = useState("3");
  const [listLeft, setListLeft] = useState(leaderList);
  const [trData, setTrData] = useState(defaultPagination);
  const [banner, setBanner] = useState(BgImg);
  const [keyWord, setKeyWord] = useState("");
  const handleClick = (e) => {
    setCurrentShow(e.key);
    if (e.key === "3") {
      getList(keyWord, trData, "3");
    } else {
      getList(keyWord, trData, "4");
    }
  };
  const getDetail = (item) => {
    props.history.push(
      `/home/dynamicDetail?id=${item.id}&currentShow=${currentShow}`
    );
  };
  const transferParams = (data) => {
    setTrData({ ...trData, ...data });
    getList(keyWord, data, currentShow);
  };
  const getData = async () => {
    // banner i图片
    const navData = await ajax({ url: "/cms/nav" });
    if (navData.code === 1) {
      navData.data.forEach((item) => {
        if (item.id === "2" && item.pic) {
          setBanner(item.pic);
        }
      });
    }

    // const resInfo = await ajax({ url: "/about/2" });
    // console.log(baseInfo);
  };
  const getList = async (val, pageData, type) => {
    // 文章列表
    setListLeft([]);
    const { current, size } = pageData;
    const typeVal = type;
    const params = { keyword: val, scode: typeVal };
    const listData = await ajax({
      url: `/list/2/page/${current}/num/${size}`,
      params,
      isJson: false,
    });
    if (listData.code === 1) {
      setListLeft(listData.data || []);
      setTrData({ ...trData, total: listData.rowtotal });
    }

    // console.log("listData44444", listData);
  };
  useEffect(() => {
    getList(keyWord, trData, currentShow);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const modifyInfoHtml = () => {
    document.title = "基地动态—贵阳市花溪区青少年法治教育基地";
    const contentText1 =
      "基地动态，领导参观，团队参观，社会主义法治理念，安全意识，社会主义核心价值观，道德与法，法律体系、基地体验";
    const contentText2 =
      "基地动态主要展示领导参观和团队参观场景，以活动、交流、体验等形式培养青少年学法、用法、自爱自护的意识和能力，保障青少年成长。";
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
    <div className="Dynamic-public-style">
      <div className="banner">
        <div
          className="bg-img"
          style={{ backgroundImage: "url(" + banner + ")" }}
        ></div>
      </div>
      <div className="Dynamic-content">
        <div className="container">
          <div className="content-main">
            <div className="tab-head">
              <Menu
                onClick={handleClick}
                selectedKeys={[currentShow]}
                mode="horizontal"
                className="tab-style"
              >
                <Menu.Item key="3">领导参观</Menu.Item>
                <Menu.Item key="4">团队参观</Menu.Item>
              </Menu>
              <Search
                className="search-tab"
                placeholder="输入关键词"
                enterButton="查询"
                size="large"
                onSearch={(value) => {
                  setKeyWord(value);
                  getList(value, defaultPagination, currentShow);
                  setTrData(defaultPagination);
                }}
              />
            </div>
            <div className="tab-item-content">
              <div className="left-list">
                {listLeft.map((item, i) => {
                  return (
                    <div
                      className="it-style"
                      key={i}
                      onClick={() => {
                        getDetail(item);
                      }}
                    >
                      <img src={item.ico} alt="" />
                      <div className="item-content">
                        <div className="title one-text-omit">{item.title}</div>
                        <div
                          className="content-info three-text-omit"
                          // dangerouslySetInnerHTML={{ __html: item.content }}
                        >
                          {item.description}
                        </div>
                        <div className="item-time">{item.date}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <RightInfo props={props} />
            </div>
            <Pagination transferParams={transferParams} trData={trData} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dynamic;
