<template>
    <div class="page__component">
        <p
            @blur="updateTarget"
            data-input-types="['paraText']"
            data-input-type="paraText"
            :data-component-type="componentData.componentName"
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
        grabTexts(els) {
            let newObj = {};
            let listArr = [];
            Array.from(els).forEach(element => {
                let textType = element.getAttribute("data-input-type");
                if (element.nodeName === "IMG") {
                    newObj[textType] = element.closest(".page__external__data__container").querySelector(".options__editable").textContent.trim();
                } else if (element.nodeName === "LI") {
                    listArr.push({li: element.innerHTML.trim()});
                } else {
                    newObj[textType] = element.innerHTML.trim();
                }
            });
            if (listArr.length > 0) {
                newObj.listItems = listArr
            }
            return newObj;
        },
        updateTarget(event, newListItems) {
            let newComponentData = JSON.parse(JSON.stringify(this.componentData));
            if (newComponentData.uniqueName === this.componentData.uniqueName) {
                if (newComponentData.componentName.toLowerCase() === "list" || 
                newComponentData.componentName.toLowerCase() === "imageheaderpara") {
                    if (newListItems) {
                        this.numberOfListActions += 1;
                        newComponentData.elementData.listItems = newListItems;
                        this.numberOfListActions += 1;
                    } else {
                        Object.assign(newComponentData.elementData.listItems, this.getNewListItems(event));
                    }
                } else {
                    let textsToGrab = this.grabTexts(this.$el.querySelectorAll("[data-input-type]"));
                    Object.assign(newComponentData.elementData, textsToGrab);
                }
                let info = {
                    newComponentData: newComponentData,
                    oldComponentData: this.componentData
                };
                if (!this.group && !this.subgroup) {
                    this.$nuxt.$emit("updateTarget", info);
                } else if (this.subgroup) {
                    this.$nuxt.$emit("updateSubGroupList", newComponentData.elementData.listItems);
                } else {
                    info.parentData = this.parentData;
                    this.$nuxt.$emit("updateGroupTarget", info);
                }
                newComponentData.componentChanges += 1;
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