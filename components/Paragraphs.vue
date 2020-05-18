<template>
    <div class="page__paras component__outer component__outer--max-width">
        <div class="component__options" v-if="!componentData.optionsHidden">
            <textarea v-model="componentData.elementData.paraText" class="text__text__area" type="text"/>
            <OptionsButtons :componentData="componentData"/>
        </div>
        <div class="component__wrap" @click="checkOptions">
            <p v-if="type === 'p'">{{ componentData.elementData.paraText }}</p>
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
    .page__paras {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 10px;
        position: relative;
    }
    .page__paras p {
        font-family: ProximaNova, "Proxima Nova", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 1.1em;
        line-height: 1.1em;
        text-align: left;
        margin: 10px 0 0;
    }
</style>