<template>
    <div class="ShopDetail">
        <div class="top">
            <span class="returnLast" @click="$router.go(-1)"
                ><van-icon name="arrow-left"
            /></span>
            <span class="shopState">订单{{ state }}</span>
        </div>
        <div class="box">
            <!-- 店铺信息/点餐详情 -->
            <div class="detail">
                <div class="shopName">{{ item.shopName || "暂无数据" }}</div>
                <div class="shopList">
                    <ShopListItem
                        v-for="spItem in item.shopList"
                        :key="spItem.id"
                        :spItem="spItem"
                    />
                </div>
                <div class="price">
                    <span>
                        <span>共{{ item.num || "暂无数据" }}件商品,合计</span>
                        <span>¥{{ item.price || "暂无数据" }}</span>
                    </span>
                    <span>奖励{{ item.price || "暂无数据" }}积分</span>
                </div>
            </div>
            <!-- 点餐详细信息 -->
            <div class="shopInfo">
                <span>
                    <span class="shopLeft">下单时间</span>
                    <span>{{ item.time || "暂无数据" }}</span>
                </span>
                <span>
                    <span class="shopLeft">订单编号</span>
                    <span>{{ item.orderNumber || "暂无数据" }}</span>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import ShopListItem from "@/components/ShopDetail/ShopListItem";
export default {
    name: "ShopDetail",
    components: { ShopListItem },
    data() {
        return {
            item: {},
            state: "",
        };
    },
    mounted() {
        this.item = this.$route.query.item;
        this.state = this.$route.query.state;
    },
};
</script>

<style scoped>
.ShopDetail {
    width: 100vw;
    min-height: 100vh;
    background: linear-gradient(90deg, #ea2d4c 0%, #f15031 100%);
}
.top {
    height: 21.22vh;
    color: #fff;
    font-weight: 700;
    display: flex;
    justify-content: center;
    font-size: 1.5rem;
    flex-direction: column;
    padding: 0 5.12vw;
    box-sizing: border-box;
}
.returnLast {
    width: 1.5rem;
}
.shopState {
    margin-top: 1rem;
}
.box {
    height: 78.78vh;
    background: #fafafa;
    border-top-left-radius: 4vw;
    border-top-right-radius: 4vw;
    padding: 4.27vw;
    box-sizing: border-box;
    overflow-y: auto;
}
.detail {
    background: #fff;
    padding: 2.56vw;
    border-radius: 0.5rem;
}
.shopName {
    border-bottom: 1px dashed #999;
    padding-bottom: 4.27vw;
}
.price {
    padding-top: 4.27vw;
    border-top: 1px dashed #999;
    flex-direction: column;
    display: flex;
    align-items: flex-end;
}
.price > span:nth-child(1) {
    font-size: 0.9rem;
    color: #696969;
}
.price > span:nth-child(1) > span:nth-child(2) {
    color: #000;
    font-size: 1.2rem;
    margin-left: 0.2rem;
}
.price > span:nth-child(2) {
    color: #fc8100;
    margin-top: 1vw;
    font-size: 0.9rem;
}
.shopInfo {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    background: #fff;
    padding: 2.56vw;
    border-radius: 0.5rem;
    font-size: 0.8rem;
    height: 7.92vh;
    justify-content: space-evenly;
}
.shopLeft {
    color: #999;
    margin-right: 1rem;
}
</style>