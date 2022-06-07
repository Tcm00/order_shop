import axios from "../index.js";
//登录
const URL_API_LOGIN = "/userinfo/login";
export function userLogin(params) {
    return axios({
        method: "post",
        url: URL_API_LOGIN,
        params,
    });
}
//注册
const URL_API_SIGN = "/userinfo/register";
export function userSign(params) {
    return axios({
        method: "post",
        url: URL_API_SIGN,
        data: JSON.stringify(params),
        headers: {
            "Content-Type": "application/json",
        },
    });
}
//更新
const URL_API_UPDATE = "/userinfo/update";
export function userUpdate(params) {
    return axios({
        method: "post",
        url: URL_API_UPDATE,
        data: JSON.stringify(params),
        headers: {
            "Content-Type": "application/json",
        },
    });
}
//获取最新用户信息
const URL_API_NEXT = "/userinfo/getInfo";
export function userNext(params) {
    return axios({
        method: "post",
        url: URL_API_NEXT,
        data: JSON.stringify(params),
        headers: {
            "Content-Type": "application/json",
        },
    });
}
//充值
const URL_API_ADD_MONEY = "/historyrecord/addMoney";
export function userAddMoney(params) {
    return axios({
        method: "post",
        url: URL_API_ADD_MONEY,
        params,
    });
}
