//引入vue、vueRouter（路由）
import Vue from "vue";
import VueRouter from "vue-router";
//使用路由插件
Vue.use(VueRouter);
//引入（路由）组件
import Index from "@/view/Index";
import Home from "@/view/Home";
import Order from "@/view/Order";
import Shop from "@/view/Shop";
import User from "@/view/User";
import UsePage from "@/view/Shop/UsePage";
import UnUse from "@/view/Shop/UnUse";
import ShopDetail from "@/view/Shop/ShopDetail";
import PrivacyShow from "@/view/User/PrivacyShow";
import UserShow from "@/view/User/UserShow";
import UserUpdate from "@/view/User/UserUpdate";
import RoleShow from "@/view/User/RoleShow";
import Pay from "@/view/User/Pay";
import NounAdjective from "@/view/User/NounAdjective";
import Verb from "@/view/User/Verb";
import Login from "@/view/Login";
import Settlement from "@/view/Order/Settlement";
//创建路由规则
const routes = [
    {
        name: "Login",
        path: "/login",
        component: Login,
    },
    {
        name: "Index",
        path: "/",
        component: Index,
        redirect: "/home",
        meta: {
            keepalive: true,
        },
        children: [
            //首页
            {
                name: "HomePage",
                path: "home",
                component: Home,
                meta: {
                    keepalive: true,
                },
            },
            //点餐
            {
                name: "Order",
                path: "order",
                component: Order,
                meta: {
                    keepalive: true,
                },
            },
            //订单
            {
                name: "Shop",
                path: "shop",
                component: Shop,
                redirect: "/shop/UnUse",
                children: [
                    { name: "UsePage", path: "usepage", component: UsePage },
                    { name: "UnUse", path: "unuse", component: UnUse },
                ],
            },
            //我的
            { name: "User", path: "user", component: User },
        ],
    },
    {
        //订单详情
        name: "ShopDetail",
        path: "/shopdetail",
        component: ShopDetail,
    },
    {
        //用户更新信息页面
        name: "UserUpdate",
        path: "/userupdate",
        component: UserUpdate,
    },
    {
        //用户等级规则
        name: "RoleShow",
        path: "/roleshow",
        component: RoleShow,
    },
    {
        //积分明细
        name: "NounAdjective",
        path: "/nounadjective",
        component: NounAdjective,
    },
    {
        //钱包
        name: "Pay",
        path: "/pay",
        component: Pay,
    },
    {
        //充值
        name: "Verb",
        path: "/verb",
        component: Verb,
    },
    {
        //隐私条款
        name: "PrivacyShow",
        path: "/privacyshow",
        component: PrivacyShow,
    },
    {
        //用户服务条例
        name: "UserShow",
        path: "/usershow",
        component: UserShow,
    },
    {
        //订单结算
        name: "Settlement",
        path: "/settlement",
        component: Settlement,
    },
];

//创建路由实例
const router = new VueRouter({
    routes,
});
router.beforeEach((to, from, next) => {
    isLogin(to, from, next);
});
//路由守卫 是否登录
function isLogin(to, from, next) {
    if (to.path == "/login") {
        next();
    } else {
        if (
            typeof window.sessionStorage["token"] == "string" &&
            window.sessionStorage["token"].length > 0
        ) {
            //解析token
            next();
        } else {
            next("/login");
        }
    }
}

export default router;
