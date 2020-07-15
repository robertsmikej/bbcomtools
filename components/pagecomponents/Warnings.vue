<template>
    
    <Paragraphs
        :type="'para'"
        class="page__warning"
        :componentData="componentData"
        :group="false"
    />
</template>

<script>
        // <p
        //     @blur="updateTarget"
        //     contenteditable
            
        // >
        //     {{ componentData.elementData.text }}
        // </p>
        // <Optionsbuttons
        //     v-if="componentData.optionsShown"
        //     :componentData="componentData"
        // />
export default {
    props: {
        type: String,
        componentData: Object,
        group: Boolean
    },
    methods: {
        updateTarget(event, newListItems) {
            let newComponentData = JSON.parse(JSON.stringify(this.componentData));
            newComponentData.componentChanges += 1;
            if (newComponentData.uniqueName === this.componentData.uniqueName) {
                let info = {
                    newComponentData: newComponentData
                };
                this.$nuxt.$emit("updateTarget", info);
            }
        },
        optionsTrue() {
            let info = {
                componentData: this.componentData,
                optionsBool: true
            };
            this.$nuxt.$emit("optionsChange", info);
        }
    }
}
</script>

<style>

</style>