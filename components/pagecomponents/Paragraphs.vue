<template>
    <div class="page__component">
        <p
            @blur="updateTarget"
            contenteditable
            class="page__para site__element"
        >
            {{ componentData.elementData.paraText }}
        </p>
        <Optionsbuttons
            v-if="componentData.optionsShown"
            :componentData="componentData"
        />
    </div>
</template>

<script>
            // data-input-types="['paraText']"
            // data-input-type="paraText"
            // :data-component-type="componentData.componentName"
export default {
    props: {
        type: String,
        componentData: Object,
        group: Boolean
    },
    mounted: function () {

        // let els = this.$el.querySelectorAll(".site__element");
        // els.forEach((element, index) => {
        //     element.setAttribute("data-component-number", index);
        // });
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
.page__para {
    cursor: pointer;
}
.page__para--builder {
    /* margin: 0; */
}
.component__options--para {
    margin-top: 16px;
    margin-bottom: -16px;
}
</style>