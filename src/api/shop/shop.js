import axios from "../index.js";
//历史记录
const URL_API_GETHISTORY = "/historyrecord/getHistory";
export function getHistory(params) {
    return axios({
        method: "post",
        url: URL_API_GETHISTORY,
        params,
    });
}
//首页轮播图
const URL_API_SWIPE = "/swipe/getSwipe";
export function getSwipe(params) {
    return axios({
        method: "post",
        url: URL_API_SWIPE,
        data: JSON.stringify(params),
        headers: {
            "Content-Type": "application/json",
        },
    });
}
//首页店铺1信息
const URL_API_GETSHOPINFO = "/shopInfo/getShopInfo";
export function getShopInfo(params) {
    return axios({
        method: "post",
        url: URL_API_GETSHOPINFO,
        params,
    });
}
//查询商品
const URL_API_GETGOODS = "/goodsinfo/getGoodsInfo";
export function getGoods(params) {
    return axios({
        method: "post",
        url: URL_API_GETGOODS,
        params,
    });
}
//商品提交订单
const URL_API_ORDERTEA = "/historyrecord/orderTea";
export function orderTea(params) {
    return axios({
        method: "post",
        url: URL_API_ORDERTEA,
        data: JSON.stringify(params),
        headers: {
            "Content-Type": "application/json",
        },
    });
}
