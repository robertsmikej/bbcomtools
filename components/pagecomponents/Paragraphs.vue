<template>
    <div class="page__component">
        <p
            @blur="updateTarget"
            data-input-type="paraText"
            contenteditable
            v-html="componentData.elementData.paraText"
            class="page__para site__element"
        ></p>
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
    mounted: function () {

        // let els = this.$el.querySelectorAll(".site__element");
        // els.forEach((element, index) => {
        //     element.setAttribute("data-component-number", index);
        // });
    },
    methods: {
        updateTarget() {
            let newComponentData = JSON.parse(JSON.stringify(this.componentData));
            if (newComponentData.componentName === "List") {
                newComponentData.elementData.listItems = this.getNewListItems(event);
            } else {
                let textsToGrab = this.$el.querySelectorAll("[data-input-type]");
                let components = Array.from(textsToGrab).forEach(element => {
                    let textType = element.getAttribute("data-input-type");
                    newComponentData.elementData[textType] = element.innerHTML.trim();
                });
            }
            newComponentData.componentChanges += 1;
            let info = {
                newComponentData: newComponentData
            };
            this.$nuxt.$emit("updateTarget", info);
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