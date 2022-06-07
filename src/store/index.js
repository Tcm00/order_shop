import Vue from "vue";
import Vuex from "vuex";
//刷新页面不丢失vuex
import VuexPersistence from "vuex-persist";
Vue.use(Vuex);
const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
});

const store = new Vuex.Store({
    plugins: [vuexLocal.plugin],
    state: {
        count: 0,
        user: {
            //用户信息
            id: null,
            imgUrl: [
                //头像
                "http://xyxzxl.com/assets/imgs/shopnow/sex0.png", //无性别
                "http://xyxzxl.com/assets/imgs/shopnow/sex1.jpeg", //男
                "http://xyxzxl.com/assets/imgs/shopnow/sex2.jpeg", //女
            ],
            phone: "", //电话
            noun: 0, //积分
            sex: "", //性别
            birthday: "", //生日
            payNum: "0.00", //钱包
        },
        shop: {
            skuList: [
                //购物车列表
            ],
        },
    },
    getters: {
        skuPriceAll: (state) => {
            //购物车总价
            let price = 0;
            state.shop.skuList.forEach((item) => {
                price = price + item.num * item.price;
            });
            return price;
        },
        skuPriceNum: (state) => {
            //购物车数量
            let num = 0;
            state.shop.skuList.forEach((item) => {
                num = num + item.num;
            });
            return num;
        },
    },
    mutations: {
        pushSkuList(state, item) {
            state.shop.skuList.push(item);
        },
        changeSkuListNum(state, obj) {
            if (obj.num === 0) {
                state.shop.skuList.forEach((item, index) => {
                    if (obj.id === item.id) {
                        state.shop.skuList.splice(index, 1);
                    }
                });
            } else {
                let arr = state.shop.skuList.filter((item) => {
                    if (obj.id === item.id) {
                        return item;
                    }
                });
                arr[0].num = obj.num;
            }
        },
        changeUserInfo(state, obj) {
            state.user.id = obj.id;
            state.user.phone = obj.phone;
            state.user.noun = obj.noun;
            state.user.sex = obj.sex;
            state.user.birthday = obj.birthday;
            state.user.payNum = obj.payNum;
        },
        delShopList(state) {
            state.shop.skuList = [];
        },
    },
});
export default store;
