<template>
    <div
        class="OrderItem"
        @click="$router.push({ path: '/ShopDetail', query: { item, state } })"
    >
        <div class="shopName">{{ item.shopName }}</div>
        <div class="time">{{ item.time }}</div>
        <div class="imgs">
            <van-image
                v-for="img in item.shopList"
                :key="img.id"
                width="7.04vh"
                height="7.04vh"
                :src="img.imgUrl"
            />
            <div class="over" v-if="item.shopList.length > 5">
                +{{ item.shopList.length - 5 }}
            </div>
        </div>
        <div class="price">
            <span class="num">共{{ item.num }}件</span>
            <span class="priceAll">¥{{ item.price }}</span>
        </div>
        <div class="state">{{ state }}</div>
    </div>
</template>

<script>
export default {
    name: "OrderItem",
    props: ["item", "state"],
};
</script>

<style scoped>
.OrderItem {
    width: 100%;
    height: 19vh;
    background: #fff;
    border-radius: 0.75rem;
    box-shadow: 0px 0px 16px 1px rgb(0 0 0 / 5%);
    margin-bottom: 1.78vh;
    padding: 2.4vw;
    font-size: 1rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: relative;
    overflow: hidden;
}
.time {
    font-size: 0.8rem;
    color: #999;
}
.imgs {
    overflow: hidden;
    height: 7.04vh;
    white-space: nowrap;
    /* width: 200%; */
}
.imgs .van-image {
    border-radius: 0.5rem;
    overflow: hidden;
    margin-right: 1.7vw;
}
.imgs .van-image:nth-child(n + 6) {
    display: none;
}
.over {
    width: 7.04vh;
    height: 7.04vh;
    display: inline-block;
    border-radius: 0.5rem;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.8);
    text-align: center;
    line-height: 7.04vh;
    color: #fff;
    transform: translateX(calc(-7.04vh - 1.7vw));
}
.price {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.num {
    font-size: 0.9rem;
    color: #999;
    margin-right: 2.56vw;
}
.state {
    position: absolute;
    top: 2.4vw;
    right: 2.4vw;
    font-size: 1.1rem;
    color: #999;
}
</style>