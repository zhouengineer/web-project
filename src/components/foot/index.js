import React, { useEffect, useState } from "react";
import "./index.less";

const Foot = (props) => {
  const { copyright, phone, icp, email } = props.Info;
  return (
    <div className="footer">
      <div className="foot-content-left">
        <span>{copyright} </span>
        <span>备案号：{icp}</span>
      </div>
      <div className="foot-content-right">
        <span>
          服务热线： {phone} / E_MAIL: {email}
        </span>
      </div>
    </div>
  );
};
export default Foot;
