<template>
    <div class="video__component">
        <div
            class="component__remove component__container"
        >
            <img
                @click="toggleImgOptions"
                src="~/static/imgs/video-preview.jpg"
                alt="Video Preview"
                class="video__preview__img"
            >
            <div
                v-if="componentData.optionsShown"
                contenteditable
                class="options__editable__bottom"
            >
                {{ componentData.elementData.videoCode }}
            </div>
            <Optionsbuttons
                v-if="componentData.optionsShown"
                :componentData="componentData"
            />
        </div>
        <div
            class="page__video__wrapper site__element"
            v-html="componentData.elementData.videoCode"
        ></div>
    </div>
</template>

<script>
export default {
    props: {
        type: String,
        componentData: Object,
        group: Boolean
    },
    data() {
        return {

        };
    },
    methods: {
        toggleImgOptions() {
            this.componentData.optionsShown = !this.componentData.optionsShown;
        }
    }
}
</script>

<style>
.video__component {
    margin: 24px auto 0;
    width: 100%;
}
.video__preview__img {
    width: 100%;
    max-width: 100%;
    margin: 0px 0;
    cursor: pointer;
    z-index: 1;
}
.page__video__wrapper {
    display: none;
}
.component__options--video {
    align-items: flex-end;
}
</style>