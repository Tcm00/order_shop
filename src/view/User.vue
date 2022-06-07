<template>
    <div class="User">
        <!-- 用户信息 -->
        <div class="userInfo">
            <span class="userImg" @click="$router.push('/userupdate')">
                <van-image
                    round
                    width="7.12vh"
                    height="7.12vh"
                    :src="userInfo.userImgUrl"
                />
            </span>
            <span class="userPhone">{{ userInfo.phone | changePhone }}</span>
        </div>
        <!-- 会员详情 -->
        <div class="userNoun radius">
            <UserNoun :noun="userInfo.noun" />
        </div>
        <!-- 积分明细 钱包 -->
        <div class="nounTit">
            <div
                class="nounShop radius"
                @click="$router.push('/nounadjective')"
            >
                <NounTit :noun="userInfo.noun" name="积分明细">
                    <van-icon name="gold-coin" />
                </NounTit>
            </div>
            <div class="radius" @click="$router.push('/pay')">
                <NounTit :noun="userInfo.payNum" name="钱包">
                    <van-icon name="balance-list" />
                </NounTit>
            </div>
        </div>
        <div class="bottomBox">
            <van-cell-group>
                <van-cell
                    icon="description"
                    title="隐私政策"
                    is-link
                    @click="$router.push('/privacyshow')"
                />
                <van-cell
                    icon="flag-o"
                    title="用户服务协议"
                    is-link
                    @click="$router.push('/usershow')"
                />
            </van-cell-group>
        </div>
    </div>
</template>

<script>
import UserNoun from "@/components/User/UserNoun";
import NounTit from "@/components/User/NounTit";
export default {
    name: "User",
    components: { UserNoun, NounTit },
    data() {
        return {};
    },
    computed: {
        userInfo() {
            let value =
                this.$store.state.user.sex === ""
                    ? 0
                    : this.$store.state.user.sex === "男"
                    ? 1
                    : 2;
            return {
                //用户信息
                userImgUrl: this.$store.state.user.imgUrl[value], //用户头像
                noun: this.$store.state.user.noun, //积分
                sex: this.$store.state.user.sex, //性别
                phone: this.$store.state.user.phone, //电话
                birthday: this.$store.state.user.birthday, //生日
                payNum: this.$store.state.user.payNum, //钱包
            };
        },
    },
    filters: {
        changePhone(value) {
            //电话加密
            return value.slice(0, 3) + "******" + value.slice(-3);
        },
    },
};
</script>

<style scoped>
.User {
    padding: 3.84vw;
    background: #fafafa;
}
.radius {
    border-radius: 2.13vw;
    overflow: hidden;
}
.userInfo {
    height: 7.12vh;
    display: flex;
    margin-bottom: 3.84vw;
}
.userPhone {
    margin-left: 3.84vw;
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    font-weight: 400;
}
.userNoun {
    height: 20.61vh;
}
.nounTit {
    height: 7.9vh;
    margin-top: 3.84vw;
    display: flex;
    justify-content: space-between;
}
.nounTit > div {
    width: 48%;
    height: 100%;
    background-color: #fff;
}
.bottomBox {
    margin-top: 3.84vw;
}
</style>