<template>
    <div class="Settlement">
        <!-- 返回 -->
        <van-icon class="return" name="arrow-left" @click="$router.go(-1)" />
        <div class="box">
            <!-- 店铺信息/点餐详情 -->
            <div class="detail">
                <div class="shopList">
                    <ShopListItem
                        v-for="s in $store.state.shop.skuList"
                        :key="s.id"
                        :spItem="s"
                    />
                </div>
                <div class="price">
                    <span>
                        <span
                            >共{{
                                $store.getters.skuPriceNum || "暂无数据"
                            }}件商品,合计</span
                        >
                        <span
                            >¥{{
                                $store.getters.skuPriceAll || "暂无数据"
                            }}</span
                        >
                    </span>
                </div>
            </div>
            <div class="bottom">
                <div class="txt">
                    结算:<span
                        >¥{{ $store.getters.skuPriceAll || "暂无数据" }}</span
                    >
                </div>
                <van-button
                    color="linear-gradient(to right, #ff6034, #ee0a24)"
                    round
                    @click="endBtn()"
                >
                    确认支付
                </van-button>
            </div>
        </div>
        <van-overlay
            :show="overlayShow"
            style="display: flex; justify-content: center; align-items: center"
            ><van-loading
        /></van-overlay>
    </div>
</template>

<script>
import ShopListItem from "@/components/ShopDetail/ShopListItem";
import { Toast, Loading, Overlay } from "vant";
import { orderTea } from "@/api/shop/shop.js";
import { userNext } from "@/api/user/user.js";
export default {
    name: "Settlement",
    components: { ShopListItem },
    data() {
        return {
            overlayShow: false,
        };
    },
    methods: {
        endBtn() {
            this.overlayShow = true;
            const shopList = [];
            this.$store.state.shop.skuList.forEach((item) => {
                shopList.push({
                    shopId: 1,
                    goodsId: item.id,
                    num: item.num,
                    details: `${item.a}/${item.b}/${item.c}`,
                });
            });
            orderTea(shopList)
                .then((res) => {
                    if (res.code === 200) {
                        userNext({})
                            .then((res2) => {
                                this.overlayShow = false;
                                if (res2.code === 200) {
                                    Toast(res.msg || res.message);
                                    this.$store.commit("changeUserInfo", {
                                        id: res2.data.info.id || null,
                                        phone: res2.data.info.phone || "",
                                        noun: res2.data.info.noun || 0,
                                        sex: res2.data.info.sex || "",
                                        birthday: res2.data.info.birthday || "",
                                        payNum:
                                            res2.data.info.balance || "0.00",
                                    });
                                    this.$router.push("/shop");
                                    this.$store.commit("delShopList");
                                } else {
                                    Toast(res2.msg || res2.message);
                                }
                            })
                            .catch((err) => {
                                this.overlayShow = false;
                                Toast("网络错误");
                            });
                    } else {
                        this.overlayShow = false;
                        Toast(res.msg || res.message);
                    }
                })
                .catch((err) => {
                    this.overlayShow = false;
                    Toast("网络错误");
                });
        },
    },
};
</script>

<style scoped>
.Settlement {
    position: relative;
    height: 100%;
    box-sizing: border-box;
    padding: 1rem;
    overflow-y: auto;
    font-size: 0.9rem;
    display: flex;
    flex-direction: column;
    background: #fafafa;
}
.return {
    font-size: 1.5rem;
}
.box {
    height: 78.78vh;
    background: #fafafa;
    border-top-left-radius: 4vw;
    border-top-right-radius: 4vw;
    padding: 4.27vw 0;
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
.bottom {
    width: 100%;
    height: 100px;
    background: #fff;
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    box-sizing: border-box;
}
.txt > span {
    padding: 0 0.3rem;
    font-size: 1.3rem;
    font-weight: 600;
}
</style>