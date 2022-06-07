<template>
    <div class="UserNoun">
        <!-- 用户信息 -->
        <div class="nounTxt">
            <span class="nounTxtTit">{{ nounName }}</span>
            <span class="nounTxtNum">{{ nounNum }}</span>
            <span class="nounTxtPercent">
                <van-progress color="#F79851" :percentage="nounPercentage" />
            </span>
            <span class="nounTxtTip">{{ nounTip }}</span>
        </div>
        <!-- 查看权益 -->
        <div class="nounMore" @click="$router.push('/roleshow')">
            <span class="fontLogo"><van-icon name="gift-o" /></span>
            <span class="fontTitle">查看规则</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "UserNoun",
    props: ["noun"],
    computed: {
        nounName() {
            //积分等级
            //积分
            let noun = this.noun;
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
        nounNum() {
            //积分剩余百分比
            let noun = this.noun;
            let value = "积分值:";
            if (noun > 1000) {
                value = `${value}已满`;
            } else if (noun > 100) {
                value = `${value}${noun}/1000`;
            } else if (noun > 20) {
                value = `${value}${noun}/100`;
            } else if (noun >= 0) {
                value = `${value}${noun}/20`;
            } else {
                value = `${value}无数据`;
            }
            return value;
        },
        nounPercentage() {
            //积分到下一等级的百分比
            //积分
            let noun = this.noun;
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
            let noun = this.noun;
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
.UserNoun {
    padding: 4.27vw;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 2.13vw;
    background: linear-gradient(90deg, #ea2d4c 0%, #f15031 100%);
    display: flex;
    box-sizing: border-box;
    color: #fff;
    font-size: 1rem;
}
.nounTxtNum {
    font-size: 0.8rem;
}
.nounTxt {
    width: 58.4%;
    height: 100%;
}
.nounMore {
    width: 41.6%;
    height: 100%;
}
.nounTxt {
    display: flex;
    flex-direction: column;
}
.nounTxtTit {
    font-size: 1.6rem;
    font-weight: 800;
    margin-bottom: 2.77vh;
}
.nounTxtPercent {
    margin: 1.58vh 0;
}
.nounTxtTip {
    font-size: 0.8rem;
}
.nounMore {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.fontLogo {
    font-size: 3.5rem;
}
.fontTitle {
    font-size: 0.9rem;
}
</style>