<template>
    <div class="VipCom" @click="$router.push('/user')">
        <div class="portrait">
            <!-- 用户头像 -->
            <van-image
                round
                width="6.33vh"
                height="6.33vh"
                :src="userInfo.userImgUrl"
            />
        </div>
        <div class="text">
            <!-- 用户信息 -->
            <span class="userName">{{ nounName }}</span>
            <span
                ><van-progress color="#ee0a24" :percentage="nounPercentage"
            /></span>
            <span class="tip">{{ nounTip }}</span>
        </div>
        <div class="noun">
            <!-- 用户积分 -->
            <span><van-icon name="gold-coin" /></span>
            <span>{{ userInfo.noun | nounFilter }}积分</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "VipCom",
    filters: {
        nounFilter(value) {
            if (value > 10000) {
                return "1W+";
            } else {
                return value;
            }
        },
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
            };
        },
        nounName() {
            //积分等级
            //积分
            let noun = this.userInfo.noun;
            // 积分等级名称
            let list = ["钻石会员", "铂金会员", "黄金会员", "白银会员"];
            let value;
            if (noun > 1000) {
                value = list[0];
            } else if (noun > 100) {
                value = list[1];
            } else if (noun > 20) {
                value = list[2];
            } else if (noun >= 0) {
                value = list[3];
            } else {
                value = "暂无积分数据";
            }
            return value;
        },
        nounPercentage() {
            //积分到下一等级的百分比
            //积分
            let noun = this.userInfo.noun;
            let value;
            if (noun > 1000) {
                value = 100;
            } else if (noun > 100) {
                value = ((noun - 101) / (1001 - 101)) * 100;
            } else if (noun > 20) {
                value = ((noun - 21) / (101 - 21)) * 100;
            } else if (noun >= 0) {
                value = (noun / 21) * 100;
            } else {
                value = 0;
            }
            return value.toFixed(1);
        },
        nounTip() {
            //到下一等级还差的积分
            let noun = this.userInfo.noun;
            let value;
            if (noun > 1000) {
                value = 0;
            } else if (noun > 100) {
                value = 1000 - noun + 1;
            } else if (noun > 20) {
                value = 100 - noun + 1;
            } else if (noun >= 0) {
                value = 20 - noun + 1;
            } else {
                value = NaN;
            }
            if (!isNaN(value)) {
                if (value) {
                    value = `还需${value}积分升级到下一级`;
                } else {
                    value = `您已经达到最高等级`;
                }
            } else {
                value = `暂无积分数据`;
            }
            return value;
        },
    },
};
</script>

<style scoped>
.VipCom {
    width: 100%;
    height: 100%;
    display: flex;
}
.portrait {
    width: 19.65vw;
    display: flex;
    justify-content: center;
    align-items: center;
}
.text {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}
.userName {
    font-size: 1.1rem;
    font-weight: 500;
}
.tip {
    font-size: 0.8rem;
    color: #999;
}
.noun {
    width: 25.64vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #ee0a24;
}
.noun > span:nth-child(1) {
    font-size: 4.69vh;
    color: #faa863;
}
.noun > span:nth-child(2) {
    font-size: 0.9rem;
}
</style>