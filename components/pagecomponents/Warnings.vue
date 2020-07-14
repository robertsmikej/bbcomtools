<template>
    <div class="page__component">
        <p
            @blur="updateTarget"
            contenteditable
            class="page__warning site__element"
        >
            {{ componentData.elementData.text }}
        </p>
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