<template>
    <div>
        <div
            :data-component-type="componentData.componentName"
            :class="'page__spacer--' + type"
            class="page__spacer"
        ></div>
        <Optionsbuttons
            v-if="componentData.optionsShown"
            :componentData="componentData"
        />
    </div>
</template>

<script>
export default {
    props: {
        type: String,
        componentData: Object,
        group: Boolean
    },
    methods: {
        optionsToggle() {
            let info = {
                componentData: this.componentData
            };
            this.$nuxt.$emit("toggleOptions", info);
        }
    }
}
</script>

<style>
.page__spacer {
    background-color: #F9F9F9 !important;
}
</style>