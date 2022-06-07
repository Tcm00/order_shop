<template>
    <div class="GoodsAction">
        <van-goods-action>
            <span
                class="tit"
                @click="
                    if ($store.getters.skuPriceAll) {
                        show = true;
                    }
                "
                ><span>合计:</span>¥{{ $store.getters.skuPriceAll }}</span
            >
            <van-goods-action-button
                v-if="!$store.getters.skuPriceAll"
                type="default"
                text="请选择商品"
            />
            <van-goods-action-button
                v-else
                type="danger"
                text="去结算"
                @click="$router.push('/settlement')"
            />
        </van-goods-action>
        <van-popup
            v-model="show"
            round
            position="bottom"
            :style="{ height: '50%' }"
        >
            <div
                class="shopList"
                v-for="s in $store.state.shop.skuList"
                :key="s.id"
            >
                <ShopListBox :s="s" />
            </div>
        </van-popup>
    </div>
</template>

<script>
import ShopListBox from "@/components/Order/ShopListBox";
export default {
    name: "GoodsAction",
    components: { ShopListBox },
    data() {
        return {
            show: false,
        };
    },
};
</script>

<style scoped>
.GoodsAction .van-goods-action {
    transform: translateY(-90px);
}
.tit {
    display: inline-block;
    width: 60%;
    padding: 0.5rem;
    font-size: 1.2rem;
    font-weight: 700;
}
.tit > span {
    font-weight: 400;
    font-size: 0.9rem;
    color: #696969;
}
</style>