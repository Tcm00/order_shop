<template>
    <div class="TopIndex">
        <!--keep-alive 表示页面不会被销毁，即保持页面状态-->
        <keep-alive>
            <router-view v-if="$route.meta.keepalive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepalive"></router-view>
    </div>
</template>

<script>
export default {
    name: "TopIndex",
};
</script>
<style scoped>
.TopIndex {
    width: 100%;
    height: calc(100% - 10.44vh);
}
.TopIndex > div {
    min-height: 100%;
}
</style>