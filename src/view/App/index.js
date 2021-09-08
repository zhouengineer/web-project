import React, { Component } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
// import Auth from "@src/view/auth";
import Login from "../Login";
import Register from "../Register";
import Home from "../Home";
import NotFound from "../NotFound";
const browserHistory = createBrowserHistory();
// import moment from "moment";
// import grayscale from '@src/assets/lib/grayscale.js';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    // 去掉进入index.html形成的pre-loading
    // document.getElementById('pre-loading').style.display = 'none'
    // window.onload = function() {
    //   // console.log(grayscale);
    //   grayscale(document.body);
    // };
  }

  render() {
    return (
      <div className="app">
        <Router history={browserHistory}>
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" exact component={Login} />
            <Redirect exact from="/" to="/home" />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
