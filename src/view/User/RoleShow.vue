<template>
    <div class="RoleShow">
        <van-icon class="return" name="arrow-left" @click="$router.go(-1)" />
        <h1 class="tit">会员等级规则</h1>
        <h3>积分</h3>
        <p>
            积分是根据用户在账户信息、消费金额等方面行为，综合算出的分值。积分实时更新，积分越高则会员等级越高，会员可享受的权益越多。
        </p>
        <h3>会员等级</h3>
        <p>
            会员等级是由用户在一定时期内累计获取的积分所决定的，会员达到相应等级的积分即可升级并享受对应权益。各等级对应甜蜜值对照表如下：
        </p>
        <van-cell-group>
            <van-cell title="白银会员" value="0-20" />
            <van-cell title="黄金会员" value="21-100" />
            <van-cell title="铂金会员" value="101-1000" />
            <van-cell title="钻石会员" value="1000以上" />
        </van-cell-group>
    </div>
</template>

<script>
export default {
    name: "RoleShow",
};
</script>

<style scoped>
.RoleShow {
    padding: 1rem;
    overflow-y: auto;
    font-size: 0.9rem;
}
.return {
    font-size: 1.5rem;
}
.tit {
    margin: 0.8rem 0;
    text-align: center;
}
</style>