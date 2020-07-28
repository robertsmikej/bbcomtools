<template>
    <div class="page__image__container">
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
            v-show="componentData.optionsShown"
            class="options__editable__bottom"
        >
            <div class="options__editable__container">
                <span class="options__description element__exclude">Desktop Image URL</span>
                <div
                    @blur="updateTarget"
                    contenteditable
                    class="options__editable options--imgsrc--desktop component__remove"
                >
                    {{ componentData.elementData.imgSrcDesktop }}
                </div>
            </div>
            <div class="options__editable__container">
                <span class="options__description element__exclude">Mobile Image URL</span>
                <div
                    @blur="updateTarget"
                    contenteditable
                    class="options__editable options--imgsrc--mobile component__remove"
                >
                    {{ componentData.elementData.imgSrcMobile }}
                </div>
            </div>
            <div class="options__editable__container">
                <span class="options__description element__exclude">Image Alt Text</span>
                <div
                    @blur="updateTarget"
                    contenteditable
                    class="options__editable options--img--alt component__remove"
                >
                    {{ componentData.elementData.imgAlt }}
                </div>
            </div>
            <div class="options__editable__container">
                <span class="options__description element__exclude">IMG To Mobile - 768px Default</span>
                <div
                    @blur="updateTarget"
                    contenteditable
                    class="options__editable options--img--changetomobile component__remove"
                >
                    {{ componentData.elementData.imgChangeToMobile }}
                </div>
            </div>
        </div>

        <Optionsbuttons
            v-if="componentData.optionsShown"
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