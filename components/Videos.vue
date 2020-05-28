<template>
    <div class="page__video component__outer component__outer--max-width">
        <div v-if="!componentData.optionsHidden" class="component__options--individual">
            <textarea v-model="componentData.elementData.videoCode" class="text__text__area" type="text" placeholder="Video URL"/>
            <Optionsbuttons :componentData="componentData"/>
        </div>
        <div class="component__remove" @click="checkOptions">
            <img src="../static/imgs/video-preview.jpg" alt="Video Preview" class="video__preview__img">
        </div>
        <div class="component__wrap video__wrapper" @click="checkOptions" v-html="componentData.elementData.videoCode"></div>
    </div>
</template>

<script>
export default {
    props: {
        type: String,
        componentData: Object
    },
    data() {
        return {

        };
    },
    methods: {
        checkOptions() {
            let info = {
                componentData: this.componentData
            };
            this.$nuxt.$emit("toggleOptions", info);
        }
    }
}
</script>

<style>
.page__video {
    margin: 24px auto;
    width: 100%;
}
.video__preview__img {
    width: 100%;
    max-width: 100%;
    margin: 0px 0;
    cursor: pointer;
    z-index: 1;
}
.video__wrapper {
    display: none;
}
</style>