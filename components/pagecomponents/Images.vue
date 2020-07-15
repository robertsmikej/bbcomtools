<template>
    <div class="page__component page__image__container">
        <picture>
            <source 
                :srcset="componentData.elementData.imgSrcMobile"
                :media="'(min-width: ' + componentData.elementData.imgChangeToMobile + ')'"
            >
            <img
                @click="toggleOptions"
                :src="componentData.elementData.imgSrcDesktop"
                :alt="componentData.elementData.imgAlt"
            />
        </picture>
        <div
            v-show="this.optionsShown"
            class="options__editable__bottom"
        >
            <p class="options__description__para">Desktop Image URL</p>
            <div
                @blur="updateTarget"
                contenteditable
                class="options__editable options--imgsrc--desktop component__remove"
            >
                {{ componentData.elementData.imgSrcDesktop }}
            </div>
            <p class="options__description__para">Mobile Image URL</p>
            <div
                @blur="updateTarget"
                contenteditable
                class="options__editable options--imgsrc--mobile component__remove"
            >
                {{ componentData.elementData.imgSrcMobile }}
            </div>
            <p class="options__description__para">Image Alt Text</p>
            <div
                @blur="updateTarget"
                contenteditable
                class="options__editable options--img--alt component__remove"
            >
                {{ componentData.elementData.imgAlt }}
            </div>
            <p class="options__description__para">When IMG Changes To Mobile - 768px Default</p>
            <div
                @blur="updateTarget"
                contenteditable
                class="options__editable options--img--changetomobile component__remove"
            >
                {{ componentData.elementData.imgChangeToMobile }}
            </div>
        </div>
        <Optionsbuttons
            v-if="this.optionsShown"
            :componentData="componentData"
        />
    </div>
</template>

<script>
export default {
    props: {
        componentData: Object
    },
    data() {
        return {
            optionsShown: this.componentData.optionsShown
        }
    },
    methods: {
        updateTarget(event, newListItems) {
            let newComponentData = JSON.parse(JSON.stringify(this.componentData));
            newComponentData.componentChanges += 1;
            if (newComponentData.uniqueName === this.componentData.uniqueName) {
                let info = {
                    newComponentData: newComponentData
                };
                this.$nuxt.$emit("updateTarget", info);
            }
        },
        toggleOptions() {
            this.optionsShown = !this.optionsShown;
        }
    }
}
</script>

<style>

</style>