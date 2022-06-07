<template>
    <div class="Index">
        <TopIndex />
        <BottomNav />
    </div>
</template>

<script>
import TopIndex from "@/components/TopIndex.vue";
import BottomNav from "@/components/BottomNav.vue";
export default {
    name: "Index",
    components: {
        TopIndex,
        BottomNav,
    },
};
</script>

<style>
* {
    margin: 0;
    padding: 0;
}
body {
    font-size: 4.1vw;
}
.Index {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}
</style>
