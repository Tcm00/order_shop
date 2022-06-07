<template>
    <div class="NounTit">
        <span class="noun">{{ noun }}</span>
        <span class="name">{{ name }}</span>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "NounTit",
    props: ["noun", "name"],
};
</script>

<style scoped>
.NounTit {
    width: 100%;
    height: 100%;
    padding: 1rem 0.9rem;
    display: flex;
    flex-direction: column;
    font-size: 1.1rem;
    justify-content: center;
    box-sizing: border-box;
    position: relative;
}
.name {
    font-size: 0.9rem;
    margin-top: 0.1rem;
    color: #999;
}
i {
    position: absolute;
    right: 0.9rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 4.5vh;
    color: #f79851;
}
</style>