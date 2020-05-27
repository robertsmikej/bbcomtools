<template>
    <div class="page__headers component__outer component__outer--max-width">
        <div v-if="!componentData.optionsHidden" class="component__options">
            <OptionsButtons :componentData="componentData"/>
        </div>
        <div class="component__wrap" :data-component-name="componentData.name" :data-component-type="componentData.type" data-component-data-name="headerText" :data-component-data="componentData.elementData.headerText">
            <div v-if="!componentData.optionsHidden" class="component__options--individual">
                <input v-model="componentData.elementData.headerText" class="text__input" type="text"/>
            </div>
            <component @click="checkOptions" :is="componentData.type" :data-component-name="componentData.name" :data-component-type="componentData.type" :class="'page__header--' + componentData.type.toLowerCase()">{{ componentData.elementData.headerText }}</component>
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
.page__header--h1,
.page__header--h2,
.page__header--h3,
.page__header--h4,
.page__header--h5,
.page__header--h6 {
    cursor: pointer;
    white-space: pre-line;
}
</style>