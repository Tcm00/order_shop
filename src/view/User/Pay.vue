<template>
    <div class="Pay">
        <!-- 返回 -->
        <van-icon class="return" name="arrow-left" @click="$router.go(-1)" />
        <!-- 钱包主体 -->
        <div class="box">
            <!-- 钱包图标 -->
            <span class="payIco"><van-icon name="gold-coin" /></span>
            <!-- 我的钱包 -->
            <span class="myPay">我的钱包</span>
            <!-- 钱包金额 -->
            <span class="payNum">¥{{ $store.state.user.payNum }}</span>
            <!-- 充值 -->
            <span class="payBtn">
                <van-button
                    @click="$router.push('/verb')"
                    color="linear-gradient(90deg, #ea2d4c 0%, #f15031 100%)"
                >
                    充值
                </van-button>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: "Pay",
};
</script>

<style scoped>
.Pay {
    position: relative;
    height: 100%;
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
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.payIco {
    font-size: 4rem;
    color: #f79851;
    margin-top: 3rem;
}
.myPay {
    font-size: 1.1rem;
    margin-top: 1.5rem;
}
.payNum {
    font-size: 3rem;
    margin-top: 1rem;
    font-weight: 600;
}
.payBtn {
    position: fixed;
    bottom: 9rem;
    left: 50%;
    transform: translateX(-50%);
}
.Pay .box .van-button {
    width: 44.87vw;
    border-radius: 0.5rem;
}
</style>