<template>
    <div class="page__tooltip">
        <span>
            {{ tip.tip_text }}
        </span>
    </div>
</template>

<script>
export default {
    props: {
        tip: Object
    },
    methods: {
        
    }
}
</script>

<style>
    .page__tooltip {
        
        width: 100%;
        width: 180px;
        height: 70px;
        background-color: black;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 5px 8px;
        z-index: 4;
        position: absolute;
        top: -80px;
        left: 50%;
        transform: translate(-50%, 0);
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: center;
        align-items: center;
    }
    .page__tooltip::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: black transparent transparent transparent;
    }
</style>