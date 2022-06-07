<template>
    <div class="UserUpdate">
        <div class="return">
            <van-icon name="arrow-left" @click="$router.go(-1)" />
        </div>
        <!-- 用户头像 -->
        <div class="userImg">
            <van-image
                round
                width="12.55vh"
                height="12.55vh"
                :src="userImgUrl"
            />
        </div>
        <!-- 用户信息 -->
        <div class="info">
            <van-field
                v-model="userInfo.phone"
                name="手机号"
                label="手机号"
                placeholder="手机号"
                readonly
            />
            <van-field name="radio" label="性别">
                <template #input>
                    <van-radio-group
                        v-model="userInfo.sex"
                        direction="horizontal"
                    >
                        <van-radio name="男">男</van-radio>
                        <van-radio name="女">女</van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <van-field
                readonly
                clickable
                name="calendar"
                :value="userInfo.birthday"
                label="生日"
                placeholder="点击选择日期"
                @click="showCalendar = true"
            />
            <van-calendar
                :min-date="new Date(2021, 0, 1)"
                :max-date="new Date()"
                v-model="showCalendar"
                @confirm="onConfirm"
            />
            <!-- 提交保存 -->
            <div style="margin: 1rem">
                <van-button
                    round
                    block
                    type="info"
                    native-type="submit"
                    color="linear-gradient(90deg, rgb(234, 45, 76) 0%, rgb(241, 80, 49) 100%)"
                    @click="commitUserInfo()"
                    >保存</van-button
                >
            </div>
        </div>
        <!-- 退出登录 -->
        <div class="quit" @click="quit">退出登录</div>

        <van-overlay
            :show="overlayShow"
            style="display: flex; justify-content: center; align-items: center"
            ><van-loading
        /></van-overlay>
    </div>
</template>

<script>
import { Dialog, Toast } from "vant";
import { userUpdate, userNext } from "@/api/user/user.js";
export default {
    name: "UserUpdate",
    data() {
        return {
            userInfo: {
                sex: this.$store.state.user.sex, //性别
                phone: this.$store.state.user.phone, //电话
                birthday: this.$store.state.user.birthday, //生日
            },
            showCalendar: false, //日期选择器
            overlayShow: false,
        };
    },
    methods: {
        onConfirm(date) {
            this.userInfo.birthday = `${date.getMonth() + 1}-${date.getDate()}`;
            this.showCalendar = false;
        },
        quit() {
            //退出
            Dialog.confirm({
                message: "是否退出登录?",
                // theme: "round-button",
            })
                .then(() => {
                    //确认
                    window.sessionStorage.removeItem("token");
                    this.$router.push("/login");
                })
                .catch(() => {
                    //取消
                    return;
                });
        },
        commitUserInfo() {
            //保存用户信息
            const userInfo = {};
            if (this.userInfo.birthday) {
                userInfo.birthday = this.birthdayFilter(this.userInfo.birthday);
            }
            if (this.userInfo.sex) {
                userInfo.sex = this.userInfo.sex;
            }
            this.overlayShow = true;
            userUpdate(userInfo)
                .then((res) => {
                    if (res.code === 200) {
                        //更新用户信息
                        userNext({})
                            .then((res2) => {
                                this.overlayShow = false;
                                if (res2.code === 200) {
                                    Toast(res.msg || res.message);
                                    this.$store.commit("changeUserInfo", {
                                        id: res2.data.info.id || null,
                                        phone: res2.data.info.phone || "",
                                        noun: res2.data.info.noun || 0,
                                        sex: res2.data.info.sex || "",
                                        birthday: res2.data.info.birthday || "",
                                        payNum:
                                            res2.data.info.balance || "0.00",
                                    });
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
        },
        birthdayFilter(value) {
            //格式化生日
            return value
                .split("-")
                .map((element) => {
                    let v = element;
                    if (v.length === 1) {
                        v = "0" + v;
                    }
                    return v;
                })
                .join("-");
        },
    },
    computed: {
        userImgUrl() {
            let value =
                this.$store.state.user.sex === ""
                    ? 0
                    : this.$store.state.user.sex === "男"
                    ? 1
                    : 2;
            return this.$store.state.user.imgUrl[value]; //用户头像
        },
    },
};
</script>

<style scoped>
.UserUpdate {
    background: #fafafa;
    height: 100vh;
}
.return {
    padding: 4.27vw;
    font-size: 1.5rem;
}
.userImg {
    height: 23.36vh;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
}
.quit {
    position: fixed;
    bottom: 7.28vh;
    left: 50%;
    transform: translateX(-50%);
    color: #999;
    font-size: 0.9rem;
}
</style>