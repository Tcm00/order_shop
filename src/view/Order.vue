<template>
    <div class="Order">
        <div class="box">
            <!-- 侧边栏 -->
            <div class="sidebar">
                <Sidebar :list="orderObj.shopType" />
            </div>
            <!-- 主体 -->
            <div class="orderBox" @scroll="scrollBox">
                <OrderBox :list="orderObj.shopType" />
            </div>
        </div>
        <!-- 购物车 -->
        <div class="goodsAction">
            <GoodsAction />
        </div>
    </div>
</template>

<script>
import GoodsAction from "@/components/Order/GoodsAction";
import Sidebar from "@/components/Order/Sidebar";
import OrderBox from "@/components/Order/OrderBox";
import { getGoods } from "@/api/shop/shop.js";
export default {
    name: "Order",
    components: { GoodsAction, Sidebar, OrderBox },
    mounted() {
        this.getGoodsList();
        this.$bus.$on("clickSidebar", (item) => {
            this.changeSidebar(item);
        });
    },
    beforeDestroy() {
        this.$bus.$off("clickSidebar");
    },
    methods: {
        changeSidebar(item) {
            //锚点定位
            const box = document.querySelector(".orderBox");
            box.scrollTop = this.getElementTop(
                document.getElementsByName(item)[0]
            );
        },
        scrollBox(e) {
            //监听滚动
            let scroll = e.target.scrollTop;
            const stArr = [];
            const idArr = [];
            this.orderObj.shopType.forEach((st) => {
                stArr.push(st.id);
            });

            stArr.forEach((id) => {
                idArr.push(
                    this.getElementTop(document.getElementsByName(id)[0])
                );
            });
            idArr.reduce((prev, cur, index) => {
                if (scroll >= prev && scroll < cur) {
                    this.$bus.$emit("changeActive", index - 1);
                }
                return cur;
            });
        },
        getGoodsList() {
            //获取商品信息
            getGoods().then((res) => {
                if (res.code === 200) {
                    let data = res.data.menu;
                    this.changeOrderList(data);
                }
            });
        },
        getElementTop(element) {
            var actualTop = element.offsetTop; //这是获取元素距父元素顶部的距离
            var current = element.offsetParent; //这是获取父元素
            while (current !== null) {
                //当它上面有元素时就继续执行
                actualTop += current.offsetTop; //这是获取父元素距它的父元素顶部的距离累加起来
                current = current.offsetParent; //继续找父元素
            }
            return actualTop;
        },
        changeOrderList(data) {
            data.forEach((shop) => {
                let shopTypeIndex;
                if (
                    this.orderObj.shopType.some((type, index) => {
                        if (type.typeName === shop.classInfo) {
                            shopTypeIndex = index;
                            return true;
                        }
                    })
                ) {
                    let shopList = {
                        id: shop.id,
                        shopName: shop.goodsname, //商品名称
                        shopTit: shop.describe, //商品详情信息
                        shopImg: shop.url, //商品图片
                        shopPrice: shop.goodsprice, //商品价格
                        a: shop.typea,
                        b: shop.typeb,
                        c: shop.typec,
                    };
                    this.orderObj.shopType[shopTypeIndex].typeList.push(
                        shopList
                    );
                } else {
                    let shopList = {
                        id: shop.id,
                        shopName: shop.goodsname, //商品名称
                        shopTit: shop.describe, //商品详情信息
                        shopImg: shop.url, //商品图片
                        shopPrice: shop.goodsprice, //商品价格
                        a: shop.typea,
                        b: shop.typeb,
                        c: shop.typec,
                    };
                    let shopType = {
                        id: shop.classInfo,
                        typeName: shop.classInfo,
                        typeList: [shopList],
                    };
                    this.orderObj.shopType.push(shopType);
                }
            });
        },
    },
    data() {
        return {
            orderObj: {
                shopType: [
                    //商品类型
                    // {
                    //     id: "当季新品",
                    //     typeName: "当季新品", //类型名称
                    //     typeList: [
                    //         //类型列表
                    //         {
                    //             id: "001",
                    //             shopName: "三拼霸霸奶茶", //商品名称
                    //             shopTit: "当季新品", //商品详情信息
                    //             shopImg:
                    //                 "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic11.canyin375.com%2Fuploads%2Fallimg%2F201113%2F1-2011131300435M.png&refer=http%3A%2F%2Fpic11.canyin375.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655883672&t=767242df5ebcf2a9ff97181744027a9c", //商品图片
                    //             shopPrice: 8, //商品价格
                    //             a: ["糖", "盐", "珍珠"],
                    //             b: ["冰", "常温", "热"],
                    //             c: ["无糖", "半糖", "全糖"],
                    //         },
                    //         {
                    //             id: "001",
                    //             shopName: "三拼霸霸奶茶", //商品名称
                    //             shopTit: "当季新品", //商品详情信息
                    //             shopImg:
                    //                 "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic11.canyin375.com%2Fuploads%2Fallimg%2F201113%2F1-2011131300435M.png&refer=http%3A%2F%2Fpic11.canyin375.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655883672&t=767242df5ebcf2a9ff97181744027a9c", //商品图片
                    //             shopPrice: 8, //商品价格
                    //             a: ["糖", "盐", "珍珠"],
                    //             b: ["冰", "常温", "热"],
                    //             c: ["无糖", "半糖", "全糖"],
                    //         },
                    //         {
                    //             id: "001",
                    //             shopName: "三拼霸霸奶茶", //商品名称
                    //             shopTit: "当季新品", //商品详情信息
                    //             shopImg:
                    //                 "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic11.canyin375.com%2Fuploads%2Fallimg%2F201113%2F1-2011131300435M.png&refer=http%3A%2F%2Fpic11.canyin375.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655883672&t=767242df5ebcf2a9ff97181744027a9c", //商品图片
                    //             shopPrice: 8, //商品价格
                    //             a: ["糖", "盐", "珍珠"],
                    //             b: ["冰", "常温", "热"],
                    //             c: ["无糖", "半糖", "全糖"],
                    //         },
                    //         {
                    //             id: "001",
                    //             shopName: "三拼霸霸奶茶", //商品名称
                    //             shopTit: "当季新品", //商品详情信息
                    //             shopImg:
                    //                 "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic11.canyin375.com%2Fuploads%2Fallimg%2F201113%2F1-2011131300435M.png&refer=http%3A%2F%2Fpic11.canyin375.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655883672&t=767242df5ebcf2a9ff97181744027a9c", //商品图片
                    //             shopPrice: 8, //商品价格
                    //             a: ["糖", "盐", "珍珠"],
                    //             b: ["冰", "常温", "热"],
                    //             c: ["无糖", "半糖", "全糖"],
                    //         },
                    //         {
                    //             id: "001",
                    //             shopName: "三拼霸霸奶茶", //商品名称
                    //             shopTit: "当季新品", //商品详情信息
                    //             shopImg:
                    //                 "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic11.canyin375.com%2Fuploads%2Fallimg%2F201113%2F1-2011131300435M.png&refer=http%3A%2F%2Fpic11.canyin375.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655883672&t=767242df5ebcf2a9ff97181744027a9c", //商品图片
                    //             shopPrice: 8, //商品价格
                    //             a: ["糖", "盐", "珍珠"],
                    //             b: ["冰", "常温", "热"],
                    //             c: ["无糖", "半糖", "全糖"],
                    //         },
                    //         {
                    //             id: "001",
                    //             shopName: "三拼霸霸奶茶", //商品名称
                    //             shopTit: "当季新品", //商品详情信息
                    //             shopImg:
                    //                 "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic11.canyin375.com%2Fuploads%2Fallimg%2F201113%2F1-2011131300435M.png&refer=http%3A%2F%2Fpic11.canyin375.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655883672&t=767242df5ebcf2a9ff97181744027a9c", //商品图片
                    //             shopPrice: 8, //商品价格
                    //             a: ["糖", "盐", "珍珠"],
                    //             b: ["冰", "常温", "热"],
                    //             c: ["无糖", "半糖", "全糖"],
                    //         },
                    //         {
                    //             id: "001",
                    //             shopName: "三拼霸霸奶茶", //商品名称
                    //             shopTit: "当季新品", //商品详情信息
                    //             shopImg:
                    //                 "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic11.canyin375.com%2Fuploads%2Fallimg%2F201113%2F1-2011131300435M.png&refer=http%3A%2F%2Fpic11.canyin375.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655883672&t=767242df5ebcf2a9ff97181744027a9c", //商品图片
                    //             shopPrice: 8, //商品价格
                    //             a: ["糖", "盐", "珍珠"],
                    //             b: ["冰", "常温", "热"],
                    //             c: ["无糖", "半糖", "全糖"],
                    //         },
                    //         {
                    //             id: "002",
                    //             shopName: "三拼霸霸奶茶", //商品名称
                    //             shopTit: "当季新品", //商品详情信息
                    //             shopImg:
                    //                 "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic11.canyin375.com%2Fuploads%2Fallimg%2F201113%2F1-2011131300435M.png&refer=http%3A%2F%2Fpic11.canyin375.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655883672&t=767242df5ebcf2a9ff97181744027a9c", //商品图片
                    //             shopPrice: 8, //商品价格
                    //             a: ["糖", "盐", "珍珠"],
                    //             b: ["冰", "常温", "热"],
                    //             c: ["无糖", "半糖", "全糖"],
                    //         },
                    //     ],
                    // },
                    // {
                    //     id: "果茶",
                    //     typeName: "果茶",
                    //     typeList: [
                    //         {
                    //             id: "003",
                    //             shopName: "三拼霸霸奶茶", //商品名称
                    //             shopTit: "当季新品", //商品详情信息
                    //             shopImg:
                    //                 "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic11.canyin375.com%2Fuploads%2Fallimg%2F201113%2F1-2011131300435M.png&refer=http%3A%2F%2Fpic11.canyin375.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655883672&t=767242df5ebcf2a9ff97181744027a9c", //商品图片
                    //             shopPrice: 8, //商品价格
                    //         },
                    //         {
                    //             id: "004",
                    //             shopName: "三拼霸霸奶茶", //商品名称
                    //             shopTit: "当季新品", //商品详情信息
                    //             shopImg:
                    //                 "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic11.canyin375.com%2Fuploads%2Fallimg%2F201113%2F1-2011131300435M.png&refer=http%3A%2F%2Fpic11.canyin375.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655883672&t=767242df5ebcf2a9ff97181744027a9c", //商品图片
                    //             shopPrice: 8, //商品价格
                    //             a: ["糖", "盐", "珍珠"],
                    //             b: ["冰", "常温", "热"],
                    //             c: ["无糖", "半糖", "全糖"],
                    //         },
                    //         {
                    //             id: "005",
                    //             shopName: "三拼霸霸奶茶", //商品名称
                    //             shopTit: "当季新品", //商品详情信息
                    //             shopImg:
                    //                 "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic11.canyin375.com%2Fuploads%2Fallimg%2F201113%2F1-2011131300435M.png&refer=http%3A%2F%2Fpic11.canyin375.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655883672&t=767242df5ebcf2a9ff97181744027a9c", //商品图片
                    //             shopPrice: 8, //商品价格
                    //             a: ["糖", "盐", "珍珠"],
                    //             b: ["冰", "常温", "热"],
                    //             c: ["无糖", "半糖", "全糖"],
                    //         },
                    //     ],
                    // },
                    // {
                    //     id: "冰淇淋",
                    //     typeName: "冰淇淋",
                    //     typeList: [
                    //         {
                    //             id: "006",
                    //             shopName: "三拼霸霸奶茶", //商品名称
                    //             shopTit: "当季新品", //商品详情信息
                    //             shopImg:
                    //                 "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic11.canyin375.com%2Fuploads%2Fallimg%2F201113%2F1-2011131300435M.png&refer=http%3A%2F%2Fpic11.canyin375.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655883672&t=767242df5ebcf2a9ff97181744027a9c", //商品图片
                    //             shopPrice: 8, //商品价格
                    //             a: ["糖", "盐", "珍珠"],
                    //             b: ["冰", "常温", "热"],
                    //             c: ["无糖", "半糖", "全糖"],
                    //         },
                    //         {
                    //             id: "006",
                    //             shopName: "三拼霸霸奶茶", //商品名称
                    //             shopTit: "当季新品", //商品详情信息
                    //             shopImg:
                    //                 "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic11.canyin375.com%2Fuploads%2Fallimg%2F201113%2F1-2011131300435M.png&refer=http%3A%2F%2Fpic11.canyin375.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655883672&t=767242df5ebcf2a9ff97181744027a9c", //商品图片
                    //             shopPrice: 8, //商品价格
                    //             a: ["糖", "盐", "珍珠"],
                    //             b: ["冰", "常温", "热"],
                    //             c: ["无糖", "半糖", "全糖"],
                    //         },
                    //         {
                    //             id: "006",
                    //             shopName: "三拼霸霸奶茶", //商品名称
                    //             shopTit: "当季新品", //商品详情信息
                    //             shopImg:
                    //                 "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic11.canyin375.com%2Fuploads%2Fallimg%2F201113%2F1-2011131300435M.png&refer=http%3A%2F%2Fpic11.canyin375.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655883672&t=767242df5ebcf2a9ff97181744027a9c", //商品图片
                    //             shopPrice: 8, //商品价格
                    //             a: ["糖", "盐", "珍珠"],
                    //             b: ["冰", "常温", "热"],
                    //             c: ["无糖", "半糖", "全糖"],
                    //         },
                    //         {
                    //             id: "006",
                    //             shopName: "三拼霸霸奶茶", //商品名称
                    //             shopTit: "当季新品", //商品详情信息
                    //             shopImg:
                    //                 "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic11.canyin375.com%2Fuploads%2Fallimg%2F201113%2F1-2011131300435M.png&refer=http%3A%2F%2Fpic11.canyin375.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655883672&t=767242df5ebcf2a9ff97181744027a9c", //商品图片
                    //             shopPrice: 8, //商品价格
                    //             a: ["糖", "盐", "珍珠"],
                    //             b: ["冰", "常温", "热"],
                    //             c: ["无糖", "半糖", "全糖"],
                    //         },
                    //         {
                    //             id: "006",
                    //             shopName: "三拼霸霸奶茶", //商品名称
                    //             shopTit: "当季新品", //商品详情信息
                    //             shopImg:
                    //                 "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic11.canyin375.com%2Fuploads%2Fallimg%2F201113%2F1-2011131300435M.png&refer=http%3A%2F%2Fpic11.canyin375.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655883672&t=767242df5ebcf2a9ff97181744027a9c", //商品图片
                    //             shopPrice: 8, //商品价格
                    //             a: ["糖", "盐", "珍珠"],
                    //             b: ["冰", "常温", "热"],
                    //             c: ["无糖", "半糖", "全糖"],
                    //         },
                    //         {
                    //             id: "006",
                    //             shopName: "三拼霸霸奶茶", //商品名称
                    //             shopTit: "当季新品", //商品详情信息
                    //             shopImg:
                    //                 "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic11.canyin375.com%2Fuploads%2Fallimg%2F201113%2F1-2011131300435M.png&refer=http%3A%2F%2Fpic11.canyin375.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655883672&t=767242df5ebcf2a9ff97181744027a9c", //商品图片
                    //             shopPrice: 8, //商品价格
                    //             a: ["糖", "盐", "珍珠"],
                    //             b: ["冰", "常温", "热"],
                    //             c: ["无糖", "半糖", "全糖"],
                    //         },
                    //         {
                    //             id: "006",
                    //             shopName: "三拼霸霸奶茶", //商品名称
                    //             shopTit: "当季新品", //商品详情信息
                    //             shopImg:
                    //                 "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic11.canyin375.com%2Fuploads%2Fallimg%2F201113%2F1-2011131300435M.png&refer=http%3A%2F%2Fpic11.canyin375.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655883672&t=767242df5ebcf2a9ff97181744027a9c", //商品图片
                    //             shopPrice: 8, //商品价格
                    //             a: ["糖", "盐", "珍珠"],
                    //             b: ["冰", "常温", "热"],
                    //             c: ["无糖", "半糖", "全糖"],
                    //         },
                    //         {
                    //             id: "006",
                    //             shopName: "三拼霸霸奶茶", //商品名称
                    //             shopTit: "当季新品", //商品详情信息
                    //             shopImg:
                    //                 "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic11.canyin375.com%2Fuploads%2Fallimg%2F201113%2F1-2011131300435M.png&refer=http%3A%2F%2Fpic11.canyin375.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655883672&t=767242df5ebcf2a9ff97181744027a9c", //商品图片
                    //             shopPrice: 8, //商品价格
                    //             a: ["糖", "盐", "珍珠"],
                    //             b: ["冰", "常温", "热"],
                    //             c: ["无糖", "半糖", "全糖"],
                    //         },
                    //         {
                    //             id: "006",
                    //             shopName: "三拼霸霸奶茶", //商品名称
                    //             shopTit: "当季新品", //商品详情信息
                    //             shopImg:
                    //                 "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic11.canyin375.com%2Fuploads%2Fallimg%2F201113%2F1-2011131300435M.png&refer=http%3A%2F%2Fpic11.canyin375.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655883672&t=767242df5ebcf2a9ff97181744027a9c", //商品图片
                    //             shopPrice: 8, //商品价格
                    //             a: ["糖", "盐", "珍珠"],
                    //             b: ["冰", "常温", "热"],
                    //             c: ["无糖", "半糖", "全糖"],
                    //         },
                    //     ],
                    // },
                ],
            },
        };
    },
};
</script>

<style scoped>
.box {
    height: calc(100vh - 140px);
    display: flex;
}
.sidebar {
    width: 80px;
    height: 100%;
    overflow-y: auto;
    background-color: #f7f8fa;
}
.orderBox {
    flex: 1;
    height: 100%;
    overflow-y: auto;
}
</style>