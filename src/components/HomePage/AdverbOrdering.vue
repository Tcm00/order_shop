<template>
    <div class="AdverbOrdering" @click="$router.push('/order')">
        <div class="AdverbOrder">立即点餐</div>
        <!-- 按钮 -->
        <div class="btn">
            <van-icon name="arrow" />
        </div>
    </div>
</template>

<script>
export default {
    name: "AdverbOrdering",
};
</script>

<style scoped>
.AdverbOrdering {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.75rem;
    overflow: hidden;
}
.AdverbOrder {
    font-size: 1.8rem;
    font-weight: 500;
    z-index: 1;
}
.btn {
    width: 1.8rem;
    height: 1.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(90deg, #ea2d4c 0%, #f15031 100%);

    color: #fff;
    border-radius: 50%;
    margin-left: 1.4rem;
}
</style>