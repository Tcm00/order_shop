<template>
    <div class="BottomNav">
        <van-tabbar route active-color="#ee0a24" inactive-color="#000">
            <van-tabbar-item
                v-for="item in navList"
                :key="item.id"
                :icon="item.icon"
                :to="item.path"
                >{{ item.name }}</van-tabbar-item
            >
        </van-tabbar>
    </div>
</template>

<script>
export default {
    name: "BottomNav",
    data() {
        return {
            navList: [
                //导航列表
                { id: "01", name: "首页", path: "/home", icon: "home-o" },
                {
                    id: "02",
                    name: "点餐",
                    path: "/order",
                    icon: "shopping-cart-o",
                },
                { id: "03", name: "订单", path: "/shop", icon: "coupon-o" },
                { id: "04", name: "我的", path: "/user", icon: "user-o" },
            ],
        };
    },
};
</script>

<style scoped>
.BottomNav {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
}
.BottomNav > div {
    height: 90px !important;
}
</style>