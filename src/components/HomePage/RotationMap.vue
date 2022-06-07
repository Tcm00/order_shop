<template>
    <div class="RotationMap">
        <van-swipe class="swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="item in imgList" :key="item.id">
                <van-image :src="item.url" />
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
import { getSwipe } from "@/api/shop/shop.js";
export default {
    name: "RotationMap",
    mounted() {
        this.getSwipeList();
    },
    methods: {
        getSwipeList() {
            getSwipe({}).then((res) => {
                if (res.code === 200) {
                    res.data.swipes.forEach((swipe) => {
                        this.imgList.push(swipe);
                    });
                }
            });
        },
    },
    data() {
        return {
            imgList: [
                //轮博图列表
                // {
                //     id: "001",
                //     url: "https://t7.baidu.com/it/u=1732966997,2981886582&fm=193&f=GIF",
                //     linkId: "123",
                // },
                // {
                //     id: "002",
                //     url: "https://t7.baidu.com/it/u=1417505637,1247476664&fm=193&f=GIF",
                //     linkId: "123",
                // },
                // {
                //     id: "003",
                //     url: "https://t7.baidu.com/it/u=4265852580,160349292&fm=193&f=GIF",
                //     linkId: "123",
                // },
            ],
        };
    },
};
</script>

<style scoped>
.RotationMap,
.swipe,
.van-swipe-item,
.van-image,
.van-swipe-item > img {
    width: 100%;
    height: 100%;
}
</style>