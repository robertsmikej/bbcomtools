<template>
    <div class="page__component">
        <div
            :class="'page__spacer--' + type"
            class="page__spacer site__element"
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
    background-color: var(--bb-grey-very-light);
}
</style>