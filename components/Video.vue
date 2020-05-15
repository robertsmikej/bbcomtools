<template>
    <div class="page__paras component__outer component__outer--max-width">
        <div class="component__options" v-if="!componentData.optionsHidden">
            <textarea v-model="componentData.componentData.videoURL" class="text__text__area" type="text"/>
            <OptionsButtons :componentData="componentData"/>
        </div>
        <div class="component__wrap video__wrapper" @click="checkOptions">
            {{ componentData.componentData.videoURL }}
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
    
</style>