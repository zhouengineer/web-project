import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Dynamic from "../Dynamic"; //基地动态
import DynamicDetail from "../Dynamic/detail"; //基地动态
import GeneralSituation from "../GeneralSituation"; //基地概况
import Index from "../FirstPage"; //首页
// import Index from "../FirstPage"; //首页
import BadAction from "../FirstPage/badAction"; //首页
import CozyCottage from "../FirstPage/cozyCottage"; //首页
import CrimeAction from "../FirstPage/crimeAction"; //首页
import GoodAction from "../FirstPage/goodAction"; //首页
import SelfProtection from "../FirstPage/selfProtection"; //首页
import YouthChina from "../FirstPage/youthChina"; //首页
import YouthCourt from "../FirstPage/youthCourt"; //首页
import YouthEnergy from "../FirstPage/youthEnergy"; //首页
import InteractiveQuestion from "../InteractiveQuestion"; //互动问答
import InfoPublicity from "../InfoPublicity"; //司法公开
import LawSchool from "../LawSchool"; //法制课堂
import OrderVisit from "../OrderVisit"; //预约参观
import NotFound from "../NotFound";
import NavTab from "../../components/navTab";
import Foot from "../../components/foot";
import moment from "moment";
// import "./index.less";
import axios from "axios";
import ajax from "@utils/ajax";


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseInfo: {},
    };
  }
  componentDidMount = () => {
    this.getInfoData();
  };
  grayFun = () => {
    const dateCurrent = moment(new Date()).format("MM-DD");
    const { grey_dates = [] } = this.state.baseInfo;
    const timeArr = grey_dates.split(",");
    timeArr.forEach((ele) => {
      if (ele === dateCurrent) {
        document.body.style =
          "filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1); -webkit-filter: grayscale(100%);";
      }
    });
  };
  getInfoData = async () => {
    const res1 = await ajax({ url: "/cms/site" });

    if (res1.code === 1) {
      this.setState(
        {
          baseInfo: { ...this.state.baseInfo, ...res1.data },
        },
        () => {
          this.grayFun();
        }
      );
    }

    const res2 = await ajax({ url: "/cms/company" });
    if (res2.code === 1) {
      this.setState({
        baseInfo: { ...this.state.baseInfo, ...res2.data },
      });
    }
  };
  render() {
    return (
      <div className="nav-page">
        {/* 导航跳转 */}
        <NavTab Info={this.state.baseInfo} {...this.props}></NavTab>
        {/* <!--占位导航栏--> */}
        {/* <div style={{ height: "16.8rem" }} className="head-sm-height"></div> */}

        {/* 路由配置 */}
        <div
          className="route-content"
          style={{ minHeight: " calc(100vh - 290px)" }}
        >
          <Switch>
            <Route exact path="/home" component={Index} />
            <Route exact path="/home/BadAction" component={BadAction} />
            <Route exact path="/home/CozyCottage" component={CozyCottage} />
            <Route exact path="/home/CrimeAction" component={CrimeAction} />
            <Route exact path="/home/GoodAction" component={GoodAction} />
            <Route
              exact
              path="/home/SelfProtection"
              component={SelfProtection}
            />
            <Route path="/home/YouthChina" component={YouthChina} />
            <Route path="/home/YouthCourt" component={YouthCourt} />
            <Route
              exact
              path="/home/YouthEnergy"
              component={YouthEnergy}
            />{" "}
            {/* 基地概况 */}
            <Route
              exact
              path="/home/generalSituation"
              component={GeneralSituation}
            />
            {/* 基地动态 */}
            <Route exact path="/home/dynamic" component={Dynamic} />
            {/* 动态详情 */}
            <Route exact path="/home/dynamicDetail" component={DynamicDetail} />
            {/* 法制课堂 */}
            <Route exact path="/home/lawSchool" component={LawSchool} />
            {/* 司法公开 */}
            <Route exact path="/home/infoPublicity" component={InfoPublicity} />
            {/* 互动问答 */}
            <Route
              path="/home/interactiveQuestion"
              component={InteractiveQuestion}
              exact
            />
            {/*  预约参观 */}
            <Route exact path="/home/orderVisit" component={OrderVisit} />
            <Route exact component={NotFound} />
          </Switch>
        </div>
        {/* 脚部 */}
        <Foot Info={this.state.baseInfo} />
        {/* <!-- 占位 --> */}
        <div style={{ height: "49px" }} className="d-block d-sm-none"></div>
      </div>
    );
  }
}
