<template>
    <div class="Shop">
        <div class="banner">
            <!-- 未使用 -->
            <span :class="isUse ? '' : 'active'" @click="changeUser(0)"
                >未使用</span
            >
            <!-- 已使用 -->
            <span :class="isUse ? 'active' : ''" @click="changeUser(1)"
                >已使用</span
            >
        </div>
        <div class="box" @scroll="boxScroll">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    name: "Shop",
    data() {
        return {
            isUse: false, //是否使用
        };
    },
    mounted() {
        if (this.$route.path === "/shop/usepage") {
            this.isUse = true;
        }
    },
    methods: {
        changeUser(type) {
            if (type) {
                if (this.$route.path !== "/shop/usepage") {
                    this.isUse = true;
                    this.$router.push("/shop/usepage");
                }
            } else {
                if (this.$route.path !== "/shop/unuse") {
                    this.isUse = false;
                    this.$router.push("/shop/unuse");
                }
            }
        },
        boxScroll(e) {
            if (
                e.target.scrollTop +
                    e.target.clientHeight -
                    e.target.scrollHeight >=
                -1
            ) {
                this.$bus.$emit("updataShop");
            }
        },
    },
};
</script>

<style scoped>
.Shop {
    background: #fafafa;
}
.banner {
    height: 3.75rem;
    background: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1.05rem;
}

.banner span {
    color: #999;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.banner .active {
    color: #000;
    border-bottom: 4px solid rgb(238, 10, 36);
    z-index: 1;
}
.box {
    height: calc(100vh - 3.75rem - 90px);
    overflow-y: auto;
}
</style>