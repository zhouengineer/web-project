import React, { useState, useEffect } from "react";
import { Input, DatePicker, Radio, Button, Modal } from "antd";
import AddIcon from "@images/iconImg/add-icon.png";
import ReduceIcon from "@images/iconImg/reduce-icon.png";
import ajax from "@utils/ajax";
import moment from "moment";

const Order = (props) => {
  const defaultPersonInfo = [{ name: "", phone: "", id: 0 }];
  const defaultSmallCardINfo = [
    { code: "", type: 1, id: 0 },
    { code: "", type: 1, id: 1 },
  ];
  const defaultBigCardINfo = [
    { code: "", type: 2, id: 0 },
    { code: "", type: 2, id: 1 },
  ];
  const [nameVal, setNameVal] = useState("");
  const [phoneVal, setPhoneVal] = useState("");
  const [timeDuring, setTimeDuring] = useState(null);
  const [timeRadio, setTimeRadio] = useState(null);
  const [personNum, setPersonNum] = useState("");
  const [radioNum, setRadioNum] = useState(null);
  const [carNum, setCarNum] = useState(null);
  const [beiVal, setBeiVal] = useState("");
  const [personListInfo, setPersonListInfo] = useState(defaultPersonInfo);
  const [smallCardList, setSmallCardList] = useState(defaultSmallCardINfo);
  const [bigCardList, setBigCardList] = useState(defaultBigCardINfo);
  const [messageText, setMessageText] = useState("");
  const submitData = async () => {
    let personData;
    if (radioNum < 5) {
      personData = Number(radioNum) * 10;
    } else {
      personData = personNum;
    }
    const cardCodeInfo = [...smallCardList, ...bigCardList];
    let time = timeDuring ? moment(timeDuring).format("YYYY-MM-DD") : "";
    if (timeRadio === 1) {
      time += " 09:30";
    } else {
      time += " 14:30";
    }
    let vehicle_info = "";
    cardCodeInfo.forEach((item) => {
      if (item.code) {
        let st = "";
        if (item.type === 1) {
          st = `小车,${item.code};`;
        }
        if (item.type === 2) {
          st = `大巴,${item.code};`;
        }

        vehicle_info = st + vehicle_info;
      }
    });

    let team_info = "";
    personListInfo.forEach((item) => {
      if (item.name && item.phone) {
        let st = `${item.name},${item.phone};`;
        team_info = st + team_info;
      }
    });
    const params = {
      contact_name: nameVal,
      phone: phoneVal,
      visit_date: time,
      peoples_count: personData,
      vehicle_info,
      remark: beiVal,
      team_info,
    };
    if (!nameVal.trim()) {
      setMessageText("姓名未填写!");
      return false;
    }
    if (!phoneVal.trim()) {
      setMessageText("电话未填写！");
      return false;
    }
    if (!time.trim()) {
      setMessageText("参观日期未填写！");
      return false;
    }
    if (!timeRadio && timeRadio !== 0) {
      setMessageText("参观时段未填写！");
      return false;
    }
    setMessageText("");
    console.log("提交数据", params);
    const resData = await ajax({
      url: "/cms/addform/fcode/2",
      isJson: false,
      params,
    });
    if (resData.code === 1) {
      Modal.info({
        title: "提示",
        okText: "知道了",
        content: (
          <div>
            <p>预约成功！</p>
          </div>
        ),
        onOk() {
          props.tabChange("notice");
        },
      });
    }

    console.log("resData", resData);
  };
  //增减参观人数信息
  const handlePersonInfo = (index) => {
    console.log(index);
    setPersonListInfo((valArr) => {
      if (index === personListInfo.length - 1) {
        const id = personListInfo[index].id + 1;
        const obj = { name: "", phone: "", id };
        valArr.push(obj);
      } else {
        valArr.splice(index, 1);
      }
      console.log(valArr);
      const arr = JSON.parse(JSON.stringify(valArr));
      return arr;
    });
  };
  //增减车辆信息
  const handleCardInfo = (index) => {
    if (carNum === 1) {
      setSmallCardList((valArr) => {
        if (index === smallCardList.length - 1) {
          const id = smallCardList[index].id + 1;
          const obj = { code: "", type: 1, id };
          valArr.push(obj);
        } else {
          valArr.splice(index, 1);
        }
        const arr = JSON.parse(JSON.stringify(valArr));
        return arr;
      });
    } else {
      setBigCardList((valArr) => {
        if (index === bigCardList.length - 1) {
          const id = bigCardList[index].id + 1;
          const obj = { code: "", type: 2, id };
          valArr.push(obj);
        } else {
          valArr.splice(index, 1);
        }
        const arr = JSON.parse(JSON.stringify(valArr));
        return arr;
      });
    }
  };
  useEffect(() => {
    console.log("personListInfo", personListInfo);
  }, [personListInfo]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return (
    <div className="order-style">
      <div className="item-style">
        <div className="label">
          姓名<i className="start">*</i>：
          <span className="tip">实名制参观基地</span>
        </div>
        <Input
          style={{ width: "41.67rem", height: "3.83rem" }}
          value={nameVal}
          onChange={(e) => {
            console.log("e", e.target.value);
            let ar = e.target.value;
            setNameVal(ar);
          }}
        />
      </div>
      <div className="item-style">
        <div className="label">
          手机号<i className="start">*</i>： <span className="tip"></span>
        </div>
        <Input
          style={{ width: "41.67rem", height: "3.83rem" }}
          value={phoneVal}
          onChange={(e) => {
            console.log("e", e);
            setPhoneVal(e.target.value);
          }}
        />
      </div>
      <div className="item-style">
        <div className="label">
          参观日期<i className="start">*</i>：
          <span className="tip">请至少提前2天预约</span>
        </div>
        <DatePicker
          style={{ width: "41.67rem" }}
          value={timeDuring}
          placeholder="请选择参观日期"
          onChange={(date, dateString) => {
            console.log("dateString", dateString);
            setTimeDuring(date);
          }}
        />
      </div>
      <div className="item-style">
        <div className="label">
          参观时段<i className="start">*</i>：
          <span className="tip">
            请提前抵达前往游客中心报到，准点开始参观，迟到有可能无法参观
          </span>
        </div>

        <Radio.Group
          onChange={(e) => {
            setTimeRadio(e.target.value);
          }}
          value={timeRadio}
        >
          <Radio value={1}>上午9:30~12:00</Radio>
          <Radio value={2}>下午14:30~18:00</Radio>
        </Radio.Group>
      </div>
      <div className="item-style">
        <div className="label">参观人数：</div>
        <Radio.Group
          onChange={(e) => {
            setRadioNum(e.target.value);
          }}
          value={radioNum}
        >
          <Radio value={1}>10 人</Radio>
          <Radio value={2}>20 人</Radio>
          <Radio value={3}>30 人</Radio>
          <Radio value={4}>50 人</Radio>
          <Radio value={5}>
            <Input
              style={{ height: "3.83rem" }}
              suffix="人"
              style={{ width: 80, marginLeft: 10, marginRight: 10 }}
              value={personNum}
              onChange={(e) => {
                console.log("vl", e.target);
                setPersonNum(e.target.value);
              }}
            />
          </Radio>
        </Radio.Group>
        <div className="add-content">
          {personListInfo.map((item, index) => {
            const { name, phone } = item;
            return (
              <div className="add-item" key={index}>
                <Input
                  className="it-style"
                  value={name}
                  prefix={<div>姓名：</div>}
                  onChange={(e) => {
                    console.log(index);
                    e.persist();
                    const ev = e;
                    setPersonListInfo((val) => {
                      val[index].name = ev.target.value;
                      const newVal = JSON.parse(JSON.stringify(val));
                      console.log(newVal);

                      return newVal;
                    });
                  }}
                />
                <Input
                  className="it-style"
                  value={phone}
                  prefix={<div>手机：</div>}
                  onChange={(e) => {
                    console.log(index);
                    e.persist();
                    const ev = e;
                    setPersonListInfo((val) => {
                      val[index].phone = ev.target.value;
                      const newVal = JSON.parse(JSON.stringify(val));
                      console.log(newVal);
                      return newVal;
                    });
                  }}
                />

                <img
                  src={
                    index === personListInfo.length - 1 ? AddIcon : ReduceIcon
                  }
                  onClick={() => {
                    handlePersonInfo(index);
                  }}
                  alt=""
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="item-style">
        <div className="label">来访车辆类型：</div>

        <Radio.Group
          onChange={(e) => {
            // console.log("val", val);
            setCarNum(e.target.value);
          }}
          value={carNum}
        >
          <Radio value={1}>小车</Radio>
          <Radio value={2}>大巴</Radio>
        </Radio.Group>
        <div className="add-content card-style">
          {carNum === 1 &&
            smallCardList.map((item, index) => {
              const { code } = item;

              return (
                <div className="add-item" key={index}>
                  <Input
                    className="it-style"
                    prefix="车牌"
                    value={code}
                    onChange={(e) => {
                      e.persist();
                      setSmallCardList((val) => {
                        val[index].code = e.target.value;
                        const newVal = JSON.parse(JSON.stringify(val));
                        return newVal;
                      });
                    }}
                  />
                  <img
                    className="img-car"
                    src={
                      index === smallCardList.length - 1 ? AddIcon : ReduceIcon
                    }
                    onClick={() => {
                      handleCardInfo(index);
                    }}
                    alt=""
                  />
                </div>
              );
            })}
          {carNum === 2 &&
            bigCardList.map((item, index) => {
              const { code } = item;

              return (
                <div className="add-item" key={index}>
                  <Input
                    className="it-style"
                    prefix="车牌"
                    value={code}
                    onChange={(e) => {
                      setBigCardList((val) => {
                        val[index].code = e.target.value;
                        const newVal = JSON.parse(JSON.stringify(val));
                        return newVal;
                      });
                    }}
                  />
                  <img
                    className="img-car"
                    src={
                      index === bigCardList.length - 1 ? AddIcon : ReduceIcon
                    }
                    onClick={() => {
                      handleCardInfo(index);
                    }}
                    alt=""
                  />
                </div>
              );
            })}
        </div>
      </div>
      <div className="item-style">
        <div className="label">备注：</div>
        <Radio.Group
          onChange={(val) => {
            setCarNum(val);
          }}
          value={carNum}
        >
          <Input.TextArea
            style={{ width: "41.67rem" }}
            value={beiVal}
            rows={6}
            onChange={(e) => {
              console.log("val", e.target.value);
              setBeiVal(e.target.value);
            }}
          />
        </Radio.Group>
      </div>
      <div className="msg-tip">{messageText}</div>
      <div className="bt">
        <Button className="btn-submit" type="primary" onClick={submitData}>
          确定提交
        </Button>
      </div>
    </div>
  );
};
export default Order;
