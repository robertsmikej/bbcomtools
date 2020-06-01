<template>
    <div class="page__spacer component__outer component__outer--max-width">
        <div class="component__options" v-if="!componentData.optionsHidden">
            <Optionsbuttons :componentData="componentData"/>
        </div>
        <div class="component__wrap component__container" @click="checkOptions">
            <div class="component__spacer site__element" :class="'component__spacer--' + type"></div>
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
.page__spacer {
    background-color: var(--bb-grey-very-light);
}
</style>