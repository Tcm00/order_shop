<template>
    <div class="Sidebar">
        <van-sidebar v-model="activeKey">
            <van-sidebar-item
                v-for="(item, index) in list"
                :key="item.id"
                :title="item.typeName"
                @click="
                    $bus.$emit('clickSidebar', item.id);
                    activeKey = index;
                "
            />
        </van-sidebar>
    </div>
</template>

<script>
export default {
    name: "Sidebar",
    props: ["list"],
    activated() {
        this.$bus.$on("changeActive", (item) => {
            this.changeActiveKey(item);
        });
    },
    beforeDestroy() {
        this.$bus.$off("changeActive");
    },
    data() {
        return {
            activeKey: 0,
        };
    },
    methods: {
        changeActiveKey(item) {
            this.activeKey = item;
        },
    },
};
</script>

<style scoped>
.Sidebar {
    font-size: 0.9rem;
}
</style>