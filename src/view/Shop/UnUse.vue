<template>
    <div class="UnUse">
        <div v-if="unUseList.length">
            <OrderItem
                v-for="item in unUseList"
                :key="item.id"
                :item="item"
                state="未使用"
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
    name: "UnUse",
    components: { OrderItem },
    mounted() {
        this.updateUnUse();
        this.updateList();
    },
    methods: {
        updateUnUse() {
            if (!this.isEnd) {
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
                                        id: good.recordId,
                                        name: good.goodsName,
                                        tit: good.details,
                                        price: good.goodsPrice,
                                        num: good.num,
                                        imgUrl: good.goodsUrl || "1",
                                    };
                                    num = num + good.num;
                                    price =
                                        price +
                                        Number(good.goodsPrice) * good.num;
                                    list.shopList.push(goodList);
                                });
                                list.price = price;
                                list.num = num;
                                this.unUseList.push(list);
                            });
                            this.$nextTick(() => {
                                this.isLoading = false;
                            });
                        } else {
                            this.isLoading = false;
                            Toast(res.msg || res.message);
                        }
                    })
                    .catch((err) => {
                        this.isLoading = false;
                        Toast("网络错误");
                    });
            }
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
            status: 0,
            unUseList: [
                //未使用订单列表
                // {
                //     id: "001",
                //     shopName: "蜜雪冰城合川缤果城店", //店铺名称
                //     time: "2022-02-24 16:06:09", //下单时间
                //     orderNumber: "1496790442736001025", //订单编号
                //     price: 15, //合计
                //     num: 2, //总个数
                //     shopList: [
                //         //商品列表
                //         {
                //             id: "001",
                //             name: "阿华田大圣代", //商品名称
                //             tit: "双炫", //商品附加信息
                //             num: 1, //商品数量
                //             price: 6, //价格
                //             imgUrl: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic11.canyin375.com%2Fuploads%2Fallimg%2F201113%2F1-2011131300435M.png&refer=http%3A%2F%2Fpic11.canyin375.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655883672&t=767242df5ebcf2a9ff97181744027a9c", //商品图片
                //         },
                //         {
                //             id: "002",
                //             name: "草莓啵啵(升级款)",
                //             tit: "常温/正常冰",
                //             num: 1,
                //             price: 9,
                //             imgUrl: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic11.canyin375.com%2Fuploads%2Fallimg%2F201113%2F1-2011131300435M.png&refer=http%3A%2F%2Fpic11.canyin375.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655883672&t=767242df5ebcf2a9ff97181744027a9c",
                //         },
                //     ],
                // },
            ],
        };
    },
};
</script>

<style scoped>
.UnUse {
    margin: 0 3.58vw;
    padding-top: 1.78vh;
}
.isLoading {
    display: flex;
    justify-content: center;
}
</style>