<template>
    <div 
        class="page__component page__warning__container"
    >
        <p
            @blur="updateTarget"
            contenteditable
            class="page__disclaimer"
        >
            {{ componentData.elementData.warningText }}
        </p>
        <Optionsbuttons
            v-if="this.optionsShown"
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
    data() {
        return {
            optionsShown: this.componentData.optionsShown
        }
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
        }
    }
}
</script>

<style>

</style>