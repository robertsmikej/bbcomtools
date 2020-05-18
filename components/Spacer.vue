<template>
    <div class="component__outer component__outer--max-width">
        <div class="component__options" v-if="!componentData.optionsHidden">
            <OptionsButtons :componentData="componentData"/>
        </div>
        <div class="component__wrap" @click="checkOptions">
            <div class="component__spacer" :class="'component__spacer--' + type"></div>
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
.component__spacer {
    cursor: pointer;
}
</style>