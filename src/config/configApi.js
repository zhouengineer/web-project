import ajax from "../utils/ajax";


const apiFunList={
  getBaseInfo (params){
    return ajax({
      url: "/site",
    });
  },
  getCompanyInfo(params){
    return ajax({
      url: "/company",
    });
  }
}
export default  apiFunList

// // 网站基本信息
// export const getBaseInfo = (params) => {
//   return ajax({
//     url: "/site",
//   });
// };
// //单位信息
// export const getCompanyInfo = (params) => {
//   return ajax({
//     url: "/company",
//   });
// };
// //网站栏目列表

// export const getNavProgramList = (params) => {
//   return ajax({
//     url: "/nav",
//   });
// };
// // 文章列表
// export const getArticlesLIst = (params) => {
//   return ajax({
//     url: "/list",
//   });
// };
// // 文章搜索
// export const searchArticleInfo = (params) => {
//   const { page, num } = params;
//   return ajax({
//     url: `/search/page/${page}/num/${num}`,
//   });
// };
// // 文章详情
// export const articleDetail = (params) => {
//   const { code } = params;
//   return ajax({
//     url: `/content/${code}`,
//   });
// };
// // 专题单页详情
// export const specialPageDetail = (params) => {
//   const { code } = params;
//   return ajax({
//     url: `/about/${code}`,
//   });
// };
// // 轮播图片列表
// export const getSwiperList = (params) => {
//   const { gid, num } = params;

//   return ajax({
//     url: `/slide/gid/${gid}/num/${num}`,
//   });
// };
// // 友情链接列表  ---- 有问题
// export const getFriendUrlList = (params) => {
//   const { gid, num } = params;
//   return ajax({
//     url: `/slide/gid/${gid}/num/${num}`,
//   });
// };

// // 在线留言列表
// export const getOnWritTing = (params) => {
//   const { page, num } = params;
//   return ajax({
//     url: `/msg/num/${num}/page/${page}`,
//   });
// };
// // 添加在线留言
// export const addOnMessage = (params) => {
//   return ajax({
//     url: `/addmsg`,
//   });
// };
