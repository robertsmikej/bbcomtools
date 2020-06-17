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
                @blur="updateTarget"
                data-type="videoCode"
                contenteditable
                class="options__editable__bottom"
            >
                {{ componentData.newElementData.listItems.videoCode }}
            </div>
            <Optionsbuttons
                v-if="componentData.optionsShown"
                :componentData="componentData"
            />
        </div>
        <div
            class="page__video__wrapper site__element"
            v-html="componentData.newElementData.listItems.videoCode"
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
        updateTarget() {
            let newComponentData = JSON.parse(JSON.stringify(this.componentData));
            if (event.target.getAttribute("data-type").toLowerCase() === "li") {
                let newLi = {li: event.target.innerHTML.trim()};
                let listItem = event.target.getAttribute("data-component-list-number");
                newComponentData.newElementData.listItems.listItems[listItem] = newLi;
            } else {
                let listType = event.target.getAttribute("data-type");
                newComponentData.newElementData.listItems[listType].text = event.target.innerHTML.trim();
                newComponentData.componentChanges += 1;
            }
            let info = {newComponentData: newComponentData};
            if (!this.componentData.hasOwnProperty("parentData")) {
                this.$nuxt.$emit("updateTarget", info);
            } else {
                if (this.componentData.parentUniqueName) {
                    this.$nuxt.$emit("updateTargetGroup", info);
                }
            }
        },
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