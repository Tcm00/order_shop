<template>
    <div class="NounAdjective">
        <!-- 返回 -->
        <van-icon class="return" name="arrow-left" @click="$router.go(-1)" />
        <div class="box" @scroll="boxScroll">
            <div v-if="nounList.length">
                <van-cell-group>
                    <van-cell
                        v-for="item in nounList"
                        :key="item.id"
                        :title="item.name"
                        :value="item.noun"
                        :label="item.time"
                    />
                </van-cell-group>
                <div v-show="isLoading" class="isLoading">
                    <van-loading type="spinner" />
                </div>
            </div>
            <div v-else>
                <van-empty description="您没有积分信息哟～" />
            </div>
        </div>
    </div>
</template>

<script>
import { getHistory } from "@/api/shop/shop.js";
import { Toast } from "vant";
export default {
    name: "NounAdjective",
    mounted() {
        this.updateNoun();
    },
    methods: {
        updateNoun() {
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
                                time: this.formatDateTime(item.createTime),
                                name: "购买商品",
                            };

                            let price = 0;
                            item.goodsinfos.forEach((good) => {
                                price =
                                    price + Number(good.goodsPrice) * good.num;
                            });
                            list.noun = "+" + price;
                            this.nounList.push(list);
                        });
                        this.$nextTick(() => {
                            this.isLoading = false;
                        });
                    } else {
                        Toast(res.msg || res.message);
                        this.isLoading = false;
                    }
                })
                .catch((err) => {
                    this.isLoading = false;
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
        boxScroll(e) {
            if (
                e.target.scrollTop +
                    e.target.clientHeight -
                    e.target.scrollHeight >=
                -1
            ) {
                if (!this.isEnd) {
                    if (!this.isLoading) {
                        this.isLoading = true;
                        this.updateNoun();
                    }
                }
            }
        },
    },
    data() {
        return {
            isEnd: false,
            isLoading: false,
            pageNumber: 1,
            size: 20,
            status: 2,
            nounList: [
                // {
                //     //积分详情列表
                //     id: "001",
                //     time: "2022-05-24 20:23:17", //时间
                //     noun: "+5", //分值
                //     name: "购买商品", //动作
                // },
            ],
        };
    },
};
</script>

<style scoped>
.NounAdjective {
    position: relative;
    height: 100%;
    background: #fafafa;
    box-sizing: border-box;
    padding: 1rem;
    overflow-y: auto;
    font-size: 0.9rem;
    display: flex;
    flex-direction: column;
}
.return {
    font-size: 1.5rem;
}
.box {
    margin-top: 1rem;
    border-radius: 0.5rem;
    overflow-y: auto;
}
.isLoading {
    display: flex;
    justify-content: center;
}
</style>