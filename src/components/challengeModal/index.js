import React, {
  Component,
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useRef,
} from "react";
import { message, Modal, Radio, Table } from "antd";
import "./index.less";
import TimeIcon from "@images/iconImg/time-icon.png";
import ajax from "@utils/ajax";
// const fixedZero = (val) => {
//   return val * 1 < 10 ? `0${val}` : val;
// };
// const initTime = (props) => {
//   let lastTime = 0;
//   let targetTime = 0;
//   try {
//     if (Object.prototype.toString.call(props.target) === "[object Date]") {
//       targetTime = props.target.getTime();
//     } else {
//       targetTime = new Date(props.target).getTime();
//     }
//   } catch (e) {
//     throw new Error("invalid target prop", e);
//   }

//   lastTime = targetTime - new Date().getTime();
//   return {
//     lastTime: lastTime < 0 ? 0 : lastTime,
//   };
// };
// const defaultFormat = (time) => {
//   const hours = 60 * 60 * 1000;
//   const minutes = 60 * 1000;

//   const h = Math.floor(time / hours);
//   const m = Math.floor((time - h * hours) / minutes);
//   const s = Math.floor((time - h * hours - m * minutes) / 1000);
//   return (
//     <span>
//       {fixedZero(h)}:{fixedZero(m)}:{fixedZero(s)}
//     </span>
//   );
// };
const VideoModal = (props, ref) => {
  //   const { lastTime } = initTime(props);
  //   const [lastTImeVal, setLastTImeVal] = useState(lastTime);
  const defaultQuestion = {
    id: "",
    questions: [],
    limit_time: 90,
    title: "",
  };
  const defaultScore = {
    id: "",
    scoreAll: 0,
    trueNum: 0,
    rank: 0,
    count: 0,
  };
  const [visible, setVisible] = useState(false);
  const [answerList, setAnswerList] = useState([]);
  const [testStatue, setTestStatue] = useState(0);
  const [questionContent, setQuestionContent] = useState(defaultQuestion);
  const [allScoreObj, setaAllScoreObj] = useState(defaultScore);
  const [timesContent, setTimesContent] = useState("");

  const handleCancelStatus = (e) => {
    setTestStatue(0);
    setVisible(false);
  };
  useImperativeHandle(ref, () => ({
    showModal: async () => {
      setVisible(true);
    },
  }));
  // 交卷
  const givTestFun = async () => {
    let scoreAll = 0;
    let trueNum = 0;
    for (let i = 0; i < answerList.length; i++) {
      const item = answerList[i];
      if (!item.v) {
        return message.info("题目还没完成!");
      }
      if (item.isTrue) {
        scoreAll += item.score;
        trueNum += 1;
      }
    }
    const params = {
      paper_id: Number(questionContent.id),
      sum_score: scoreAll,
      sum_count: trueNum,
    };
    const res = await ajax({
      url: "/paper/submitanswer",
      params,
      isJson: false,
    });
    if (res.code === 1) {
      const { rank, count } = res.data;
    setaAllScoreObj({ ...allScoreObj, rank, count, scoreAll, trueNum });
    setTestStatue(2);
    }
    
  };
  const startTest = () => {
    console.log("开始答题");

    if (testStatue === 0) {
      // makeTime();
      //开始答题
      setTestStatue(1);
    } else if (testStatue === 1) {
      //交卷
      givTestFun();
    } else if (testStatue === 2) {
      //重新开始
      getTextContent();
      setTestStatue(0);
    }
  };
  const setTime = (val) => {
    let times = val;
    let h = 0,
      m = 0,
      s = 0;
    if (times > 0) {
      h = Math.floor(times / 60);
      m = Math.floor(times) - h * 60;
      s = Math.floor(times * 60) - m * 60;
    }
    if (h <= 9) h = "0" + h;
    if (m <= 9) h = "0" + m;
    if (s <= 9) h = "0" + s;
    if (s === 0) s = "00";
    setTimesContent(h + ":" + m + ":" + s);
  };
  // 获取问卷内容
  const getTextContent = async () => {
    setAnswerList([]);
    const resTest = await ajax({ url: "/paper/lastDetail" });
    if (resTest.code === 1) {
      let { limit_time } = resTest.data;
      resTest.data.limit_time = Number(limit_time);
      setTime(Number(limit_time));
      setQuestionContent(resTest.data);
    }
  };
  const renderContent = (value, row, index) => {
    const obj = {
      children: value,
      props: {},
    };
    if (index === 4) {
      obj.props.colSpan = 0;
    }
    return obj;
  };
  const setAn = () => {
    const { questions } = questionContent;
    const objAn = { isTrue: "", v: "", score: 0 };
    for (let i = 0; i < questions.length; i++) {
      answerList.push(objAn);
    }
    let arr = JSON.parse(JSON.stringify(answerList));
    setAnswerList(arr);
  };
  // 造计时器
  const makeTime = () => {
    let { limit_time } = questionContent;
    let times = limit_time * 60;
    let timer = null;
    timer = setInterval(() => {
      let h = 0,
        m = 0,
        s = 0;
      if (times > 0) {
        h = Math.floor(times / (60 * 60));
        m = Math.floor(times / 60) - h * 60;
        s = Math.floor(times) - h * 60 * 60 - m * 60;
      }
      if (h <= 9) h = "0" + h;
      if (m <= 9) h = "0" + m;
      if (s <= 9) h = "0" + s;
      setTimesContent(h + ":" + m + ":" + s);
      times--;
    }, 1000);
    if (times <= 0) {
      clearInterval(timer);
    }
  };
  useEffect(() => {
    getTextContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);
  useEffect(() => {
    let timer = null;
    if (testStatue === 1) {
      let { limit_time } = questionContent;
      let times = limit_time * 60;
      timer = setInterval(() => {
        let h = 0,
          m = 0,
          s = 0;
        if (times > 0) {
          h = Math.floor(times / (60 * 60));
          m = Math.floor(times / 60) - h * 60;
          s = Math.floor(times) - h * 60 * 60 - m * 60;
        }
        if (h <= 9) h = "0" + h;
        if (m <= 9) h = "0" + m;
        if (s <= 9) h = "0" + s;
        setTimesContent(h + ":" + m + ":" + s);
        times--;
      }, 1000);
      if (times <= 0) {
        clearInterval(timer);
      }
    }
    if (!visible || testStatue !== 0) {
      clearInterval(timer);
    }
    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testStatue, visible]);
  useEffect(() => {
    setAn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionContent]);
  const columns = [
    {
      title: "成绩项",
      colSpan: 2,
      dataIndex: "oneItem",
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        };
        if (index === 2) {
          obj.props.rowSpan = 2;
        }
        // These two are merged into above cell
        if (index === 3) {
          obj.props.rowSpan = 0;
        }
        if (index === 4) {
          obj.props.colSpan = 0;
        }
        return obj;
      },
    },
    {
      title: "成绩项",
      colSpan: 0,
      dataIndex: "twoItem",
      //   render: renderContent,
    },
    {
      title: "备注说明",
      dataIndex: "threeItem",
      align: "center",
      //   render: renderContent,
    },
  ];
  const { scoreAll, trueNum, count, rank } = allScoreObj;
  const data = [
    {
      key: "1",
      oneItem: "得分",
      twoItem: `${scoreAll}分`,
      threeItem: "满分100分",
    },
    {
      key: "2",

      oneItem: "排名",
      twoItem: rank,

      threeItem: `总共有效答题人数${count}人`,
    },
    {
      key: "3",
      oneItem: "选择题",
      twoItem: `答对${trueNum}道`,
      threeItem: "总共100道",
    },
  ];
  const { questions, limit_time } = questionContent;

  return (
    <div>
      <Modal
        maskClosable={false}
        title={
          <div className="modal-challenge-m">
            <span className="m-t">答题挑战</span>
            {testStatue !== 2 && (
              <span>
                <span className="t-t">{`(${limit_time}分钟)`}</span>
                <div className="time">
                  <span>
                    <img src={TimeIcon} alt="" />
                    {timesContent}
                  </span>
                </div>
              </span>
            )}
          </div>
        }
        visible={visible}
        onCancel={handleCancelStatus}
        footer={null}
        closable={true}
        destroyOnClose={true}
        width={"970px"}
        className="modal-test"
      >
        <div
          className={` challenge-modal ${
            testStatue === 2 ? "status-two-m" : ""
          }`}
        >
          <div
            className={`${testStatue === 2 ? "status-two" : "test-content"}`}
          >
            {testStatue === 2 ? (
              <Table
                columns={columns}
                dataSource={data}
                bordered
                pagination={false}
              />
            ) : (
              <div className="question-content">
                {questions.length > 0 &&
                  questions.map((item, index) => {
                    const { question, right_key, answers, score } = item;
                    return (
                      <div key={index} className="item-q">
                        <div className="q-t break-word">
                          {index + 1}、{question}
                        </div>
                        {answerList.length > 0 && (
                          <Radio.Group
                            onChange={(e) => {
                              if (testStatue === 0) {
                                // Modal.info({
                                //   title: "提示",
                                //   okText: "知道了",
                                //   content: <div>在按了答题按钮后才能答题</div>,
                                //   onOk() {},
                                // });
                                message.info("在按了答题按钮后才能答题");
                                return false;
                              }
                              const val = e.target.value;
                              const vObj = {
                                isTrue: Number(right_key) === val,
                                v: val,
                                score: Number(score),
                              };
                              setAnswerList((arr) => {
                                arr.splice(index, 1, vObj);
                                const newArr = JSON.parse(JSON.stringify(arr));
                                return newArr;
                              });
                            }}
                            value={answerList[index].v}
                          >
                            {answers.map((it, i) => {
                              return (
                                <Radio key={i} value={i + 1} className="a-i">
                                  {it}
                                </Radio>
                              );
                            })}
                          </Radio.Group>
                        )}
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
          <div
            type="primary"
            className={`testBtn ${testStatue === 2 ? "status-two-btn" : ""}`}
            onClick={startTest}
          >
            {testStatue === 0
              ? "开始答题"
              : testStatue === 1
              ? "我要交卷"
              : "再来一次"}
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default forwardRef(VideoModal);
