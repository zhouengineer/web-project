import React, { useEffect, useState } from "react";
import ajax from "@utils/ajax";
import "./index.less";
// const termList = [
//   {
//     title:
//       "市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火",
//     img: "https://img0.baidu.com/it/u=3054397113,1176859593&fm=26&fmt=auto&gp=0.jpg",
//     content:
//       "为啥很好，有啥原因吗，能告诉我吗，我真的很想知道，市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火",
//     time: "2021-08-12",
//   },
//   {
//     title:
//       "市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火",
//     img: "https://img0.baidu.com/it/u=3054397113,1176859593&fm=26&fmt=auto&gp=0.jpg",
//     content:
//       "为啥很好，有啥原因吗，能告诉我吗，我真的很想知道，市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火",
//     time: "2021-08-12",
//   },
//   {
//     title:
//       "市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火",
//     img: "https://img0.baidu.com/it/u=3054397113,1176859593&fm=26&fmt=auto&gp=0.jpg",
//     content:
//       "为啥很好，有啥原因吗，能告诉我吗，我真的很想知道，市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火",
//     time: "2021-08-12",
//   },
//   {
//     title:
//       "市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火",
//     img: "https://img0.baidu.com/it/u=3054397113,1176859593&fm=26&fmt=auto&gp=0.jpg",
//     content:
//       "为啥很好，有啥原因吗，能告诉我吗，我真的很想知道，市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火",
//     time: "2021-08-12",
//   },
//   {
//     title:
//       "市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火",
//     img: "https://img0.baidu.com/it/u=3054397113,1176859593&fm=26&fmt=auto&gp=0.jpg",
//     content:
//       "为啥很好，有啥原因吗，能告诉我吗，我真的很想知道，市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火",
//     time: "2021-08-12",
//   },
//   {
//     title:
//       "市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火",
//     img: "https://img0.baidu.com/it/u=3054397113,1176859593&fm=26&fmt=auto&gp=0.jpg",
//     content:
//       "为啥很好，有啥原因吗，能告诉我吗，我真的很想知道，市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火",
//     time: "2021-08-12",
//   },
// ];
// const leaderList = [
//   {
//     title:
//       "市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领",
//     img: "https://img0.baidu.com/it/u=3054397113,1176859593&fm=26&fmt=auto&gp=0.jpg",
//     content:
//       "为啥很好，有啥原因吗，能告诉我吗，我真的很想知道，市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火",
//     time: "2021-08-12",
//   },
//   {
//     title:
//       "市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火",
//     img: "https://img0.baidu.com/it/u=3054397113,1176859593&fm=26&fmt=auto&gp=0.jpg",
//     content:
//       "为啥很好，有啥原因吗，能告诉我吗，我真的很想知道，市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火",
//     time: "2021-08-12",
//   },
//   {
//     title:
//       "市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火",
//     img: "https://img0.baidu.com/it/u=3054397113,1176859593&fm=26&fmt=auto&gp=0.jpg",
//     content:
//       "为啥很好，有啥原因吗，能告诉我吗，我真的很想知道，市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火",
//     time: "2021-08-12",
//   },
//   {
//     title:
//       "市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火",
//     img: "https://img0.baidu.com/it/u=3054397113,1176859593&fm=26&fmt=auto&gp=0.jpg",
//     content:
//       "为啥很好，有啥原因吗，能告诉我吗，我真的很想知道，市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火",
//     time: "2021-08-12",
//   },
//   {
//     title:
//       "市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火",
//     img: "https://img0.baidu.com/it/u=3054397113,1176859593&fm=26&fmt=auto&gp=0.jpg",
//     content:
//       "为啥很好，有啥原因吗，能告诉我吗，我真的很想知道，市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火",
//     time: "2021-08-12",
//   },
//   {
//     title:
//       "市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火",
//     img: "https://img0.baidu.com/it/u=3054397113,1176859593&fm=26&fmt=auto&gp=0.jpg",
//     content:
//       "为啥很好，有啥原因吗，能告诉我吗，我真的很想知道，市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火市领导和区人民检察院一行来我基地交流参观司法解释廊坊市快递费森林防火",
//     time: "2021-08-12",
//   },
// ];

const RightInfo = (props) => {
  const [leaderList, setLeaderList] = useState([]);
  const [termList, setTermList] = useState([]);
  const getDetail = (item) => {
    console.log(item);
    props.props.history.push(`/home/dynamicDetail?id=${item.id}`);
  };
  const getData = async (val) => {
    // 领导参观 ==》3
    const params = { scode: val };
    const res1 = await ajax({
      url: `/list/2/page/1/num/10`,
      params,
      isJson: false,
    });
    if (res1.code === 1) {
      if (val === "3") {
        setLeaderList(res1.data);
      } else {
        setTermList(res1.data);
      }
    }
  };
  useEffect(() => {
    getData("3");
    getData("4");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="right-list">
      <div className="up item-box">
        <div className="title-style">团队参观</div>
        <ul className="leader-up">
          {termList.length > 0 &&
            termList.map((item, i) => {
              return (
                <li
                  key={i}
                  onClick={() => {
                    getDetail(item);
                  }}
                  className="two-text-omit"
                >
                  <i></i>
                  {item.title}
                </li>
              );
            })}
        </ul>
      </div>
      <div className="under item-box">
        <div className="title-style">领导参观</div>
        <ul className="term-under">
          {leaderList.length > 0 &&
            leaderList.map((item, i) => {
              return (
                <li key={i} className="two-text-omit">
                  {item.title}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};
export default RightInfo;
