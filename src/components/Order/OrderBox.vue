<template>
    <div class="OrderBox">
        <div class="typeList" v-for="t in list" :key="t.id">
            <div class="title" :name="t.id">{{ t.typeName }}</div>
            <div class="shopList" v-for="s in t.typeList" :key="s.id">
                <ShopListBox :s="s" />
            </div>
        </div>
    </div>
</template>

<script>
import ShopListBox from "@/components/Order/ShopListBox";
export default {
    name: "OrderBox",
    components: { ShopListBox },
    props: ["list"],
};
</script>

<style scoped>
.title {
    padding: 8px 16px 0 16px;
}
</style>