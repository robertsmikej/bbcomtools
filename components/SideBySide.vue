<template>
    <div class="side__by__side component__outer component__outer--max-width">
        <div class="side__by__side__image__container">
            <div class="component__options" v-if="!componentData.optionsHidden">
                <input v-model="componentData.elementData.imgSrc" class="text__input" type="text" placeholder="Image URL"/>
                <OptionsButtons :componentData="componentData"/>
            </div>
            <div class="component__wrap" @click="checkOptions">
                <img :src="componentData.elementData.imgSrc" :alt="componentData.elementData.headerText" class="side__by__side__image"/>
            </div>
        </div>
        <div class="side__by__side__text__container">
            <div class="side__by__side__text__para">
                <div class="component__options" v-if="!componentData.optionsHidden">
                    <input v-model="componentData.elementData.headerText" class="text__input" type="text" placeholder="Header Text"/>
                    <OptionsButtons :componentData="componentData"/>
                </div>
                <div class="component__wrap" @click="checkOptions">
                    <h4 class="page__header--h4 side__by__side__header">{{ componentData.elementData.headerText }}</h4>
                </div>
            </div>
            <div class="side__by__side__text__para">
                <div class="component__options" v-if="!componentData.optionsHidden">
                    <textarea v-model="componentData.elementData.paraText" class="text__input" type="text" placeholder="Paragraph Text"/>
                    <OptionsButtons :componentData="componentData"/>
                </div>
                <div class="component__wrap" @click="checkOptions">
                    <p class="page__para" style="white-space: pre-line;">{{ componentData.elementData.paraText }}</p>
                </div>
            </div>
        </div>
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
.side__by__side {
    cursor: pointer;
}
</style>