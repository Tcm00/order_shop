<template>
    <div class="Home">
        <!-- 首页轮播图 -->
        <div class="rotationMap">
            <RotationMap />
        </div>
        <!-- 会员信息 -->
        <div class="vip boxOption">
            <vip />
        </div>
        <!-- 门店名称 -->
        <div class="storeName">
            <van-icon name="location-o" />
            {{ storeName || "暂无店铺信息" }}
        </div>
        <!-- 立即点餐 -->
        <div class="adverbOrdering boxOption">
            <AdverbOrdering />
        </div>
        <!-- 订单详情 积分明细 -->
        <div class="aggregate">
            <div class="aggregateOption">
                <Aggregate name="订单详情" path="/shop">
                    <van-icon name="cart" />
                </Aggregate>
            </div>
            <div class="aggregateOption">
                <Aggregate name="钱包" path="/pay">
                    <van-icon name="gift" />
                </Aggregate>
            </div>
        </div>
    </div>
</template>

<script>
import RotationMap from "@/components/HomePage/RotationMap.vue";
import vip from "@/components/HomePage/VipCom.vue";
import AdverbOrdering from "@/components/HomePage/AdverbOrdering.vue";
import Aggregate from "@/components/HomePage/Aggregate";
import { getShopInfo } from "@/api/shop/shop.js";
import { Toast } from "vant";
export default {
    name: "Home",
    components: {
        RotationMap,
        vip,
        AdverbOrdering,
        Aggregate,
        AdverbOrdering,
    },
    mounted() {
        this.getShopName();
    },
    methods: {
        getShopName() {
            getShopInfo({ id: 1 })
                .then((res) => {
                    if (res.code === 200) {
                        this.storeName = res.data.shopInfo.shopname || "";
                    } else {
                        Toast(res.msg || res.message);
                    }
                })
                .catch((err) => {
                    Toast("网络错误");
                });
        },
    },
    data() {
        return {
            storeName: "", //门店名称
        };
    },
};
</script>

<style scoped>
.HomePage {
    background-color: #fafafa;
}
.rotationMap {
    height: 38.81vh;
    overflow: hidden;
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    background: #999;
}
.boxOption {
    margin: 0 4.29vw;
    border-radius: 0.75rem;
    background: #fff;
    box-shadow: 0px 0px 16px 1px rgb(0 0 0 / 13%);
    overflow: hidden;
}
.vip {
    height: 10.69vh;
    z-index: 1;
    transform: translateY(-2.6vh);
}
.storeName {
    margin: 0 5.04vw 0.5rem 5.04vw;
    font-size: 0.85rem;
    color: #696969;
}
.adverbOrdering {
    height: 20.99vh;
}
.aggregate {
    margin: 1rem 4.29vw 0 4.29vw;
    height: 9.9vh;
    display: flex;
    justify-content: space-between;
}
.aggregateOption {
    width: 48%;
    border-radius: 0.75rem;
    background: #fff;
    box-shadow: 0px 0px 16px 1px rgb(0 0 0 / 13%);
    overflow: hidden;
}
</style>