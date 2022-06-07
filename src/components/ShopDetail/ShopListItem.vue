<template>
    <div class="ShopListItem">
        <div class="imgUrl">
            <van-image
                width="100%"
                height="100%"
                :src="spItem.imgUrl || spItem.shopImg[0]"
            />
        </div>
        <div class="tit">
            <span>¥{{ spItem.price }}</span>
            <span>
                {{ spItem.name || spItem.shopName }}
            </span>
            <span>{{
                spItem.tit || `${spItem.a}/${spItem.b}/${spItem.c}`
            }}</span>
            <span>x{{ spItem.num }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "ShopListItem",
    props: ["spItem"],
};
</script>

<style scoped>
.ShopListItem {
    height: 9.5vh;
    display: flex;
    padding: 0.6rem;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
}
.imgUrl {
    width: 7.52vh;
    border-radius: 0.5rem;
    overflow: hidden;
}
.tit {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: baseline;
    font-size: 0.8rem;
    color: #696969;
    padding-left: 2.56vw;
}
.tit > span:nth-child(1) {
    position: absolute;
    right: 0.6rem;
    top: 0.6rem;
    font-size: 1rem;
    color: #000;
}
.tit > span:nth-child(2) {
    font-size: 1.1rem;
    color: #000;
}
</style>