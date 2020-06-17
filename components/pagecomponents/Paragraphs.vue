<template>
    <div class="page__component">
        <p
            @blur="updateTarget"
            data-type="paraText"
            contenteditable
            v-html="componentData.newElementData.listItems.paraText.text"
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
            let newComponentData = this.componentData;
            if (event.target.getAttribute("data-type").toLowerCase() === "li") {
                let newLi = {li: event.target.innerHTML.trim()};
                newComponentData.newElementData.listItems.listItems[event.target.getAttribute("data-component-list-number")] = newLi;
            } else {
                newComponentData.newElementData.listItems[event.target.getAttribute("data-type")].text = event.target.innerHTML.trim();
                newComponentData.componentChanges += 1;
            }
            let info = {
                newComponentData: newComponentData,
            };
            if (!this.componentData.hasOwnProperty("parentData")) {
                
                this.$nuxt.$emit("updateTarget", info);
            } else {
                if (this.componentData.parentUniqueName) {
                    this.$nuxt.$emit("updateTargetGroup", info);
                }
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