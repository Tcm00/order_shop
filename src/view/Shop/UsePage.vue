<template>
    <div class="UsePage">
        <div v-if="usePageList.length">
            <OrderItem
                v-for="item in usePageList"
                :key="item.id"
                :item="item"
                state="已使用"
            />
        </div>

        <div v-else>
            <van-empty description="您没有订单哟!" />
        </div>
        <div v-show="isLoading" class="isLoading">
            <van-loading type="spinner" />
        </div>
    </div>
</template>

<script>
import OrderItem from "@/components/Shop/OrderItem";
import { getHistory } from "@/api/shop/shop.js";
import { Toast } from "vant";
export default {
    name: "UsePage",
    components: { OrderItem },
    mounted() {
        this.updateUse();
        this.updateList();
    },
    methods: {
        updateUse() {
            getHistory({
                pageNumber: this.pageNumber,
                size: this.size,
                status: this.status,
            })
                .then((res) => {
                    if (res.code === 200) {
                        this.pageNumber++;
                        if (res.data.history.records.length < this.size) {
                            this.isEnd = true;
                        }
                        res.data.history.records.forEach((item) => {
                            const list = {
                                id: item.recordId,
                                shopName: item.shopName,
                                time: this.formatDateTime(item.createTime),
                                orderNumber: item.orderid,
                                shopList: [],
                            };
                            let num = 0;
                            let price = 0;
                            item.goodsinfos.forEach((good) => {
                                let goodList = {
                                    id: good.orderId,
                                    name: good.goodsName,
                                    tit: good.details,
                                    price: good.sum,
                                    num: good.num,
                                    imgUrl: good.goodsUrl || "1",
                                };
                                num = num + good.num;
                                price = price + Number(good.sum) * good.num;
                                list.shopList.push(goodList);
                            });
                            list.price = price;
                            list.num = num;
                            this.usePageList.push(list);
                            this.$nextTick(() => {
                                this.isLoading = false;
                            });
                        });
                    } else {
                        Toast(res.msg || res.message);
                    }
                })
                .catch((err) => {
                    Toast("网络错误");
                });
        },
        formatDateTime(inputTime) {
            var date = new Date(inputTime);
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? "0" + m : m;
            var d = date.getDate();
            d = d < 10 ? "0" + d : d;
            var h = date.getHours();
            h = h < 10 ? "0" + h : h;
            var minute = date.getMinutes();
            var second = date.getSeconds();
            minute = minute < 10 ? "0" + minute : minute;
            second = second < 10 ? "0" + second : second;
            return (
                y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second
            );
        },
        updateList() {
            this.$bus.$on("updataShop", () => {
                if (!this.isEnd) {
                    if (!this.isLoading) {
                        console.log(1111);
                        this.isLoading = true;
                        this.updateUnUse();
                    }
                }
            });
        },
    },
    data() {
        return {
            isEnd: false,
            isLoading: false,
            pageNumber: 1,
            size: 10,
            status: 1,
            usePageList: [
                //已使用订单列表
            ],
        };
    },
};
</script>

<style scoped>
.UsePage {
    margin: 0 3.58vw;
    padding-top: 1.78vh;
}
.isLoading {
    display: flex;
    justify-content: center;
}
</style>