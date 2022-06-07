<template>
    <div class="Verb">
        <!-- 返回 -->
        <van-icon class="return" name="arrow-left" @click="$router.go(-1)" />
        <!-- 充值主体 -->
        <div class="box">
            <!-- 充值金额 -->
            <span class="myPay">充值金额</span>
            <!-- 充值数额 -->
            <span class="payNum" @click="show = true"
                >¥<span>{{ num | numFilter }}</span></span
            >
            <!-- 充值 -->
            <van-number-keyboard
                :show="show"
                theme="custom"
                extra-key="."
                close-button-text="充值"
                @blur="onBlur"
                @input="onInput"
                @delete="onDelete"
            />
        </div>

        <van-overlay
            :show="overlayShow"
            style="display: flex; justify-content: center; align-items: center"
            ><van-loading
        /></van-overlay>
    </div>
</template>

<script>
import { userAddMoney, userNext } from "@/api/user/user.js";
import { Toast } from "vant";
export default {
    name: "Verb",
    data() {
        return {
            num: "",
            show: true,
            overlayShow: false,
        };
    },

    methods: {
        onInput(value) {
            //点击键盘事件
            this.num = this.num + value;
        },
        onDelete() {
            //删除事件
            this.num = this.num.slice(0, this.num.length - 1);
        },
        onBlur() {
            this.show = false;
            if (this.num) {
                this.overlayShow = true;
                userAddMoney({
                    money: this.num,
                })
                    .then((res) => {
                        if (res.code === 200) {
                            userNext({})
                                .then((res2) => {
                                    this.overlayShow = false;
                                    if (res2.code === 200) {
                                        this.$store.commit("changeUserInfo", {
                                            id: res2.data.info.id || null,
                                            phone: res2.data.info.phone || "",
                                            noun: res2.data.info.noun || 0,
                                            sex: res2.data.info.sex || "",
                                            birthday:
                                                res2.data.info.birthday || "",
                                            payNum:
                                                res2.data.info.balance ||
                                                "0.00",
                                        });
                                        this.$router.go(-1);
                                    } else {
                                        Toast(res2.msg || res2.message);
                                    }
                                })
                                .catch((err) => {
                                    this.overlayShow = false;
                                    Toast("网络错误");
                                });
                        } else {
                            this.overlayShow = false;
                            Toast(res.msg || res.message);
                        }
                    })
                    .catch((err) => {
                        this.overlayShow = false;
                        Toast("网络错误");
                    });
            }
        },
    },
    filters: {
        numFilter(value) {
            return isNaN(Number(value)) ? "输入有误" : Number(value);
        },
    },
};
</script>

<style scoped>
.Verb {
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
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
}
.myPay {
    font-size: 0.9rem;
    margin-top: 2rem;
}
.payNum {
    font-size: 3rem;
    font-weight: 600;
    width: 100%;
    border-bottom: 1px solid #ccc;
    margin-top: 0.8rem;
}
.payNum span {
    padding-left: 0.6rem;
}
</style>