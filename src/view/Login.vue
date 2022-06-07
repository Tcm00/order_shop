<template>
    <div class="Login">
        <div class="login" v-if="isLogin">
            <div class="tit">
                <div>您好,</div>
                <div>请登录</div>
            </div>
            <div class="inputBox">
                <van-field
                    readonly
                    clickable
                    label="电话"
                    :value="login.phoneValue"
                    placeholder="请输入电话"
                    type="tel"
                    @touchstart.native.stop="
                        login.phoneShow = true;
                        login.psdShow = false;
                    "
                />
                <van-number-keyboard
                    v-model="login.phoneValue"
                    :show="login.phoneShow"
                    :maxlength="11"
                    @blur="login.phoneShow = false"
                />
                <van-field
                    readonly
                    clickable
                    label="密码"
                    :value="login.psdValue"
                    placeholder="请输入密码"
                    type="password"
                    @touchstart.native.stop="
                        login.psdShow = true;
                        login.phoneShow = false;
                    "
                />
                <van-number-keyboard
                    v-model="login.psdValue"
                    :show="login.psdShow"
                    @blur="login.psdShow = false"
                />
                <div class="changeLogin" @click="isLogin = false">
                    没有账号?点击注册
                </div>
                <div style="margin: 16px">
                    <van-button
                        round
                        block
                        type="info"
                        native-type="submit"
                        @click="loginBtn()"
                        >登录</van-button
                    >
                </div>
            </div>
        </div>
        <div class="sigin" v-else>
            <div class="tit">
                <div>您好,</div>
                <div>请注册</div>
            </div>
            <div class="inputBox">
                <van-field
                    readonly
                    clickable
                    label="电话"
                    :value="sign.phoneValue"
                    placeholder="请输入电话"
                    type="tel"
                    @touchstart.native.stop="
                        sign.phoneShow = true;
                        sign.psdShow = false;
                        sign.repsdShow = false;
                    "
                />
                <van-number-keyboard
                    v-model="sign.phoneValue"
                    :show="sign.phoneShow"
                    :maxlength="11"
                    @blur="sign.phoneShow = false"
                />
                <van-field
                    readonly
                    clickable
                    label="密码"
                    :value="sign.psdValue"
                    placeholder="请输入密码"
                    type="password"
                    @touchstart.native.stop="
                        sign.psdShow = true;
                        sign.phoneShow = false;
                        sign.repsdShow = false;
                    "
                />
                <van-number-keyboard
                    v-model="sign.psdValue"
                    :show="sign.psdShow"
                    @blur="sign.psdShow = false"
                />
                <van-field
                    readonly
                    clickable
                    label="确认密码"
                    :value="sign.repsdValue"
                    placeholder="请再次输入密码"
                    type="password"
                    @touchstart.native.stop="
                        sign.repsdShow = true;
                        sign.phoneShow = false;
                        sign.psdShow = false;
                    "
                />
                <van-number-keyboard
                    v-model="sign.repsdValue"
                    :show="sign.repsdShow"
                    @blur="sign.repsdShow = false"
                />
                <div class="changeLogin" @click="isLogin = true">
                    已有账号?点击登录
                </div>
                <div style="margin: 16px">
                    <van-button
                        round
                        block
                        type="info"
                        native-type="submit"
                        @click="signBtn()"
                        >注册</van-button
                    >
                </div>
            </div>
        </div>

        <van-overlay
            :show="overlayShow"
            style="display: flex; justify-content: center; align-items: center"
            ><van-loading
        /></van-overlay>
    </div>
</template>

<script>
import Vue from "vue";
import { Toast, Loading, Overlay } from "vant";
import { userLogin, userSign } from "@/api/user/user.js";

Vue.use(Overlay);

Vue.use(Loading);
Vue.use(Toast);
export default {
    name: "Login",
    data() {
        return {
            isLogin: true,
            overlayShow: false,
            login: {
                phoneShow: false,
                phoneValue: "",
                psdShow: false,
                psdValue: "",
            },
            sign: {
                phoneShow: false,
                phoneValue: "",
                psdShow: false,
                psdValue: "",
                repsdShow: false,
                repsdValue: "",
            },
        };
    },
    methods: {
        loginBtn() {
            if (!this.login.phoneValue) {
                Toast("请输入电话");
            } else if (!/^1[3456789]\d{9}$/.test(this.login.phoneValue)) {
                Toast("请输入正确的电话格式");
            } else if (!this.login.psdValue) {
                Toast("请输入密码");
            } else {
                this.overlayShow = true;
                userLogin({
                    phone: this.login.phoneValue,
                    password: this.login.psdValue,
                })
                    .then((res) => {
                        this.overlayShow = false;
                        if (res.code === 200) {
                            window.sessionStorage.setItem(
                                "token",
                                res.data.token.token
                            );
                            this.$store.commit("changeUserInfo", {
                                id: res.data.info.id || null,
                                phone: res.data.info.phone || "",
                                noun: res.data.info.noun || 0,
                                sex: res.data.info.sex || "",
                                birthday: res.data.info.birthday || "",
                                payNum: res.data.info.balance || "0.00",
                            });
                            this.$router.push("/");
                        } else {
                            Toast(res.msg || res.message);
                        }
                    })
                    .catch((err) => {
                        this.overlayShow = false;
                        Toast("网络错误");
                    });
            }
        },
        signBtn() {
            if (!this.sign.phoneValue) {
                Toast("请输入电话");
            } else if (!/^1[3456789]\d{9}$/.test(this.sign.phoneValue)) {
                Toast("请输入正确的电话格式");
            } else if (!this.sign.psdValue) {
                Toast("请输入密码");
            } else if (!this.sign.repsdValue) {
                Toast("请再次输入密码");
            } else if (this.sign.psdValue != this.sign.repsdValue) {
                Toast("两次输入密码不相同");
            } else {
                this.overlayShow = true;
                userSign({
                    phone: this.sign.phoneValue,
                    password: this.sign.psdValue,
                })
                    .then((res) => {
                        this.overlayShow = false;
                        if (res.code === 200) {
                            Toast(res.msg || res.message);
                            this.sign.phoneValue = "";
                            this.sign.psdValue = "";
                            this.sign.repsdValue = "";
                            this.isLogin = true;
                        } else {
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
};
</script>

<style scoped>
.tit {
    padding: 50px 16px 20px 16px;
    font-size: 1.5rem;
    font-weight: 600;
}
.changeLogin {
    padding: 10px 16px 0px 16px;
    text-align: right;
    font-size: 0.8rem;
    color: #999;
}
</style>