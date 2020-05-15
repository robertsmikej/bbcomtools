<template>
    <div class="page__headers component__outer component__outer--max-width">
        <div class="component__options" v-if="!componentData.optionsHidden">
            <input v-model="componentData.componentData.headerText" class="text__input" type="text"/>
            <OptionsButtons :componentData="componentData"/>
        </div>
        <div class="component__wrap" @click="checkOptions">
            <h1 v-if="type === '1'">{{ componentData.componentData.headerText }}</h1>
            <h2 v-if="type === '2'">{{ componentData.componentData.headerText }}</h2>
            <h3 v-if="type === '3'">{{ componentData.componentData.headerText }}</h3>
            <h4 v-if="type === '4'">{{ componentData.componentData.headerText }}</h4>
            <h5 v-if="type === '5'">{{ componentData.componentData.headerText }}</h5>
            <h6 v-if="type === '6'">{{ componentData.componentData.headerText }}</h6>
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
    .page__headers {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 10px;
        font-family: ProximaNova, "Proxima Nova", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        position: relative;
    }
    .page__headers h1,
    .page__headers h2,
    .page__headers h3,
    .page__headers h4,
    .page__headers h5,
    .page__headers h6 {
        width: 100%;
        cursor: pointer;
    }
    .page__headers h1 {
        text-align: left;
        font-size: 2.6em;
        line-height: 1em;
        margin: 16px 0 4px;
    }
    .page__headers h2 {
        text-align: left;
        font-size: 2em;
        margin: 16px 0 4px;
    }
    .page__headers h3 {
        text-align: left;
        font-size: 1.6em;
        margin: 16px 0 4px;
    }
</style>