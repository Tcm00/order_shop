<template>
    <div class="ShopListBox">
        <van-card
            :price="s.shopPrice || s.price"
            :desc="s.shopTit || `${s.a}/${s.b}/${s.c}`"
            :title="s.shopName"
            :thumb="s.shopImg[0]"
        >
            <template #footer>
                <template v-if="num > 0">
                    <van-button size="mini" @click="num--" round>
                        <van-icon name="minus" />
                    </van-button>
                    <span class="num">{{ num }}</span>
                    <van-button size="mini" @click="num++" round>
                        <van-icon name="plus" />
                    </van-button>
                </template>
                <template v-else>
                    <van-button
                        round
                        @click="show = true"
                        size="mini"
                        icon="plus"
                        color="linear-gradient(to right, #ff6034, #ee0a24)"
                    />
                </template>
                <van-sku
                    v-model="show"
                    :sku="sku"
                    :goods="goods"
                    :goods-id="s.id"
                    :hide-stock="true"
                    :show-add-cart-btn="false"
                    buy-text="加入购物车"
                    @buy-clicked="onBuyClicked"
                />
            </template>
        </van-card>
    </div>
</template>

<script>
export default {
    name: "ShopListBox",
    props: ["s"],
    computed: {
        num: {
            get() {
                let arr = this.$store.state.shop.skuList.filter((item) => {
                    if (this.s.id === item.id) {
                        return item;
                    }
                });
                // console.log(this.$store.state.shop.skuList);
                try {
                    return arr[0].num;
                } catch (err) {
                    return 0;
                }
            },
            set(value) {
                this.$store.commit("changeSkuListNum", {
                    id: this.s.id,
                    num: value,
                });
            },
        },
    },
    methods: {
        onBuyClicked(value) {
            const S1 = [],
                S2 = [],
                S3 = [];
            this.sku.tree[0].v.forEach((item) => {
                S1.push(item.name);
            });
            this.sku.tree[1].v.forEach((item) => {
                S2.push(item.name);
            });
            this.sku.tree[2].v.forEach((item) => {
                S3.push(item.name);
            });
            const item = {
                id: this.s.id,
                shopName: this.s.shopName,
                shopImg: this.s.shopImg,
                a: S1[Number(value.selectedSkuComb.s1) - 1],
                b: S2[Number(value.selectedSkuComb.s2) - 1],
                c: S3[Number(value.selectedSkuComb.s3) - 1],
                num: value.selectedNum,
                price: this.s.shopPrice,
            };
            this.$store.commit("pushSkuList", item);
            this.show = false;
        },
    },
    data() {
        return {
            show: false,
            goods: {
                // 默认商品 sku 缩略图
                picture: this.s.shopImg[0],
            },
            sku: {
                // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
                // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
                tree: [
                    // 商品属性
                    {
                        k_id: "001", // 属性id
                        k: "杯型", // 属性名
                        k_s: "s1",
                        is_multiple: false, // 是否可多选
                        v: [
                            {
                                id: "001", // 属性值id
                                name: "超大杯", // 属性值名
                                price: 0, // 属性值加价
                            },
                            {
                                id: "002",
                                name: "大杯",
                                price: 0,
                            },
                            {
                                id: "003",
                                name: "中杯",
                                price: 0,
                            },
                        ],
                    },
                    {
                        k_id: "002", // 属性id
                        k: "温度", // 属性名
                        k_s: "s2",
                        is_multiple: false, // 是否可多选
                        v: [
                            {
                                id: "001", // 属性值id
                                name: "冰", // 属性值名
                                price: 0, // 属性值加价
                            },
                            {
                                id: "002",
                                name: "常温",
                                price: 0,
                            },
                            {
                                id: "003",
                                name: "热",
                                price: 0,
                            },
                        ],
                    },
                    {
                        k_id: "003", // 属性id
                        k: "糖度", // 属性名
                        k_s: "s3",
                        is_multiple: false, // 是否可多选
                        v: [
                            {
                                id: "001", // 属性值id
                                name: "无糖", // 属性值名
                                price: 0, // 属性值加价
                            },
                            {
                                id: "002",
                                name: "半糖",
                                price: 0,
                            },
                            {
                                id: "003",
                                name: "全糖",
                                price: 0,
                            },
                        ],
                    },
                ],
                // 所有 sku 的组合列表
                list: [
                    {
                        // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
                        // 值：skuValueId（规格值 id）
                        id: "001",
                        s1: "001",
                        s2: "001",
                        s3: "001",
                        price: this.s.shopPrice * 100, // 价格（单位分）
                        stock_num: 99999, // 当前 sku 组合对应的库存
                    },
                    {
                        // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
                        // 值：skuValueId（规格值 id）
                        id: "002",
                        s1: "002",
                        s2: "002",
                        s3: "002",
                        price: this.s.shopPrice * 100, // 价格（单位分）
                        stock_num: 99999, // 当前 sku 组合对应的库存
                    },
                    {
                        // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
                        // 值：skuValueId（规格值 id）
                        id: "003",
                        s1: "003",
                        s2: "003",
                        s3: "003",
                        price: this.s.shopPrice * 100, // 价格（单位分）
                        stock_num: 99999, // 当前 sku 组合对应的库存
                    },
                    {
                        // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
                        // 值：skuValueId（规格值 id）
                        id: "004",
                        s1: "001",
                        s2: "001",
                        s3: "002",
                        price: this.s.shopPrice * 100, // 价格（单位分）
                        stock_num: 99999, // 当前 sku 组合对应的库存
                    },
                    {
                        // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
                        // 值：skuValueId（规格值 id）
                        id: "005",
                        s1: "001",
                        s2: "001",
                        s3: "003",
                        price: this.s.shopPrice * 100, // 价格（单位分）
                        stock_num: 99999, // 当前 sku 组合对应的库存
                    },
                    {
                        // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
                        // 值：skuValueId（规格值 id）
                        id: "006",
                        s1: "001",
                        s2: "002",
                        s3: "001",
                        price: this.s.shopPrice * 100, // 价格（单位分）
                        stock_num: 99999, // 当前 sku 组合对应的库存
                    },
                    {
                        // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
                        // 值：skuValueId（规格值 id）
                        id: "007",
                        s1: "001",
                        s2: "002",
                        s3: "002",
                        price: this.s.shopPrice * 100, // 价格（单位分）
                        stock_num: 99999, // 当前 sku 组合对应的库存
                    },
                    {
                        // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
                        // 值：skuValueId（规格值 id）
                        id: "008",
                        s1: "001",
                        s2: "002",
                        s3: "003",
                        price: this.s.shopPrice * 100, // 价格（单位分）
                        stock_num: 99999, // 当前 sku 组合对应的库存
                    },
                    {
                        // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
                        // 值：skuValueId（规格值 id）
                        id: "009",
                        s1: "001",
                        s2: "003",
                        s3: "001",
                        price: this.s.shopPrice * 100, // 价格（单位分）
                        stock_num: 99999, // 当前 sku 组合对应的库存
                    },
                    {
                        // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
                        // 值：skuValueId（规格值 id）
                        id: "010",
                        s1: "001",
                        s2: "003",
                        s3: "002",
                        price: this.s.shopPrice * 100, // 价格（单位分）
                        stock_num: 99999, // 当前 sku 组合对应的库存
                    },
                    {
                        // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
                        // 值：skuValueId（规格值 id）
                        id: "011",
                        s1: "001",
                        s2: "003",
                        s3: "003",
                        price: this.s.shopPrice * 100, // 价格（单位分）
                        stock_num: 99999, // 当前 sku 组合对应的库存
                    },
                    {
                        // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
                        // 值：skuValueId（规格值 id）
                        id: "012",
                        s1: "002",
                        s2: "001",
                        s3: "001",
                        price: this.s.shopPrice * 100, // 价格（单位分）
                        stock_num: 99999, // 当前 sku 组合对应的库存
                    },
                    {
                        // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
                        // 值：skuValueId（规格值 id）
                        id: "013",
                        s1: "002",
                        s2: "001",
                        s3: "002",
                        price: this.s.shopPrice * 100, // 价格（单位分）
                        stock_num: 99999, // 当前 sku 组合对应的库存
                    },
                    {
                        // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
                        // 值：skuValueId（规格值 id）
                        id: "014",
                        s1: "002",
                        s2: "001",
                        s3: "003",
                        price: this.s.shopPrice * 100, // 价格（单位分）
                        stock_num: 99999, // 当前 sku 组合对应的库存
                    },
                    {
                        // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
                        // 值：skuValueId（规格值 id）
                        id: "015",
                        s1: "002",
                        s2: "002",
                        s3: "001",
                        price: this.s.shopPrice * 100, // 价格（单位分）
                        stock_num: 99999, // 当前 sku 组合对应的库存
                    },
                    {
                        // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
                        // 值：skuValueId（规格值 id）
                        id: "016",
                        s1: "002",
                        s2: "002",
                        s3: "003",
                        price: this.s.shopPrice * 100, // 价格（单位分）
                        stock_num: 99999, // 当前 sku 组合对应的库存
                    },
                    {
                        // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
                        // 值：skuValueId（规格值 id）
                        id: "017",
                        s1: "002",
                        s2: "003",
                        s3: "001",
                        price: this.s.shopPrice * 100, // 价格（单位分）
                        stock_num: 99999, // 当前 sku 组合对应的库存
                    },
                    {
                        // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
                        // 值：skuValueId（规格值 id）
                        id: "018",
                        s1: "002",
                        s2: "003",
                        s3: "002",
                        price: this.s.shopPrice * 100, // 价格（单位分）
                        stock_num: 99999, // 当前 sku 组合对应的库存
                    },
                    {
                        // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
                        // 值：skuValueId（规格值 id）
                        id: "019",
                        s1: "002",
                        s2: "003",
                        s3: "003",
                        price: this.s.shopPrice * 100, // 价格（单位分）
                        stock_num: 99999, // 当前 sku 组合对应的库存
                    },
                    {
                        // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
                        // 值：skuValueId（规格值 id）
                        id: "020",
                        s1: "003",
                        s2: "001",
                        s3: "001",
                        price: this.s.shopPrice * 100, // 价格（单位分）
                        stock_num: 99999, // 当前 sku 组合对应的库存
                    },
                    {
                        // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
                        // 值：skuValueId（规格值 id）
                        id: "021",
                        s1: "003",
                        s2: "001",
                        s3: "002",
                        price: this.s.shopPrice * 100, // 价格（单位分）
                        stock_num: 99999, // 当前 sku 组合对应的库存
                    },
                    {
                        // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
                        // 值：skuValueId（规格值 id）
                        id: "022",
                        s1: "003",
                        s2: "001",
                        s3: "003",
                        price: this.s.shopPrice * 100, // 价格（单位分）
                        stock_num: 99999, // 当前 sku 组合对应的库存
                    },
                    {
                        // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
                        // 值：skuValueId（规格值 id）
                        id: "023",
                        s1: "003",
                        s2: "002",
                        s3: "001",
                        price: this.s.shopPrice * 100, // 价格（单位分）
                        stock_num: 99999, // 当前 sku 组合对应的库存
                    },
                    {
                        // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
                        // 值：skuValueId（规格值 id）
                        id: "024",
                        s1: "003",
                        s2: "002",
                        s3: "002",
                        price: this.s.shopPrice * 100, // 价格（单位分）
                        stock_num: 99999, // 当前 sku 组合对应的库存
                    },
                    {
                        // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
                        // 值：skuValueId（规格值 id）
                        id: "025",
                        s1: "003",
                        s2: "002",
                        s3: "003",
                        price: this.s.shopPrice * 100, // 价格（单位分）
                        stock_num: 99999, // 当前 sku 组合对应的库存
                    },
                    {
                        // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
                        // 值：skuValueId（规格值 id）
                        id: "026",
                        s1: "003",
                        s2: "003",
                        s3: "001",
                        price: this.s.shopPrice * 100, // 价格（单位分）
                        stock_num: 99999, // 当前 sku 组合对应的库存
                    },
                    {
                        // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
                        // 值：skuValueId（规格值 id）
                        id: "027",
                        s1: "003",
                        s2: "003",
                        s3: "002",
                        price: this.s.shopPrice * 100, // 价格（单位分）
                        stock_num: 99999, // 当前 sku 组合对应的库存
                    },
                ],
                price: this.s.shopPrice, // 默认价格（单位元）
                stock_num: 99999, // 商品总库存
                none_sku: false, // 是否无规格商品
            },
        };
    },
};
</script>

<style scoped>
.ShopListBox {
    position: relative;
}
.ShopListBox .van-card {
    background-color: #fff;
    font-size: 0.8rem;
}
.ShopListBox .van-card__footer {
    display: flex;
    align-items: center;
    right: 16px;
    bottom: 8px;
    position: absolute;
}
.num {
    padding: 0 0.2rem 0 0.4rem;
}
.ShopListBox .van-button {
    width: 25px;
}
</style>
<style>
.van-sku-header__goods-info .van-sku__goods-price {
    display: flex !important;
}
</style>