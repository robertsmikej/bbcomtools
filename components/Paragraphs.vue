<template>
    <div class="page__paras component__outer component__outer--max-width">
        <div class="component__options" v-if="!componentData.optionsHidden">
            <OptionsButtons :componentData="componentData"/>
        </div>
        <div class="component__wrap">
            <div v-if="!componentData.optionsHidden" class="component__options--individual">
                <textarea v-model="componentData.elementData.paraText" type="text"/>
            </div>
            <p @click="checkOptions" class="page__para" v-if="type === 'p'" style="white-space: pre-line;">{{ componentData.elementData.paraText }}</p>
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
.page__para {
    cursor: pointer;
}
</style>