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
            :data-component-type="componentData.componentName"
            data-input-type="videoCode"
            v-html="componentData.elementData.videoCode"
            class="page__video__wrapper site__element"
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
        grabTexts(els) {
            let newObj = {};
            Array.from(els).forEach(element => {
                let textType = element.getAttribute("data-input-type");
                if (element.nodeName === "IMG") {
                    newObj[textType] = element.closest(".page__external__data__container").querySelector(".options__editable").textContent.trim();
                } else {
                    newObj[textType] = element.innerHTML.trim();
                }
            });
            return newObj;
        },
        updateTarget(event, newListItems) {
            let newComponentData = JSON.parse(JSON.stringify(this.componentData));
            if (newComponentData.componentName.toLowerCase() === "list") {
                if (newListItems) {
                    newComponentData.elementData.listItems = newListItems;
                } else {
                    Object.assign(newComponentData.elementData.listItems, this.getNewListItems(event));
                }
            } else {
                let textsToGrab = this.grabTexts(this.$el.querySelectorAll("[data-input-type]"));
                Object.assign(newComponentData.elementData, textsToGrab);
            }
            let info = {
                newComponentData: newComponentData,
                oldComponentData: this.componentData
            };
            newComponentData.componentChanges += 1;
            if (!this.group) {
                this.$nuxt.$emit("updateTarget", info);
            } else {
                info.parentData = this.parentData;
                this.$nuxt.$emit("updateGroupTarget", info);
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