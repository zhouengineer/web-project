import axios from "axios";
import React from "react";
import { BASE_URL } from "./url";

// 设置axios的基地址
axios.defaults.baseURL = BASE_URL;
console.log("axios.defaults.baseURL", axios.defaults.baseURL);
// 如果前后台非同域部署需要用
axios.defaults.withCredentials = false;
// axios.defaults.crossDomain = true;
// document.cookie = 'ifream_applet_auth=dd01320f0951479db0da06341dacb341'
export default async function ajax({
  url,
  params = {},
  method = "POST",
  isJson = true,
}) {
  const headers = {
    "content-type": isJson ? "application/json" : "multipart/form-data",
  };
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const obj = {
      url,
      method,
      headers,
    };
    if (method === "GET") {
      obj.params = params;
    }
    if (!isJson) {
      const formData = new FormData();
      for (const [key, value] of Object.entries(params)) {
        formData.append(key, value);
      }
      obj.data = formData;
    }

    try {
      const { code, data } = await axios(obj);
      resolve(data);
    } catch (e) {
      reject(e);
    } finally {
    }
  });
}

// 添加请求拦截器----------------------------
// axios.interceptors.request.use(
//   (config) => {
//     // contentType json格式转form格式
//     config.transformRequest = [
//       (data) => {
//         let ret = "";
//         for (let it in data) {
//           ret +=
//             encodeURIComponent(it) +
//             "=" +
//             encodeURIComponent(data[it]) +
//             "&";
//         }
//         return ret.substr(0, ret.length - 1);
//       },
//     ];
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
// 1000001
// 添加响应拦截器
// axios.interceptors.response.use(
//   (response) => {
//     if (response.data.ret === 0) {
//       // 正常
//       return response.data;
//     } else if (response.data.ret === 1000001) {
//       // 没有登录或者登录过期 跳到getOauth页面自动登录
//       router.history.push("/");
//       message.destroy();
//       message.error("登录失效，请重新登录！", 2);
//       // let res = await axios.get(urls.getLoginCode)
//       // if (res.ret === 0) {
//       //   window.location.href = res.retdata.url
//       // } else {
//       //   message.destroy()
//       //   message.error(res.retmsg, 2)
//       // }
//     } else {
//       // 其他错误
//       message.error(JSON.stringify(response.data));
//       // throw后就会走到catch
//       throw response.data;
//     }
//     // return response.data
//   },
//   (error) => {
//     // message.error('后台接口报错')
//     return Promise.reject(error);
//   }
// );
// React.Component.prototype.$axios = axios;

// export default axios;

//----------------------------------------------
