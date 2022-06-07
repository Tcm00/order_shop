<template>
    <div class="Aggregate" @click="$router.push(path)">
        <span class="tit">{{ name }}</span>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "Aggregate",
    props: ["name", "path"],
};
</script>

<style scoped>
.Aggregate {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    border-radius: 0.75rem;
    overflow: hidden;
}
.tit {
    font-size: 1.1rem;
    margin-top: 0.5rem;
}
i {
    position: absolute;
    bottom: 0.3rem;
    right: 0.3rem;
    z-index: 1;
    font-size: 5.14vh;
    color: #ea2d4c;
}
</style>