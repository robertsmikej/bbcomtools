<template>
    <div class="page__component">
        <component
            :is="componentData.type"
            @blur="updateTarget"
            @focus="focused"
            data-input-types="['headerText']"
            data-input-type="headerText"
            :data-component-type="componentData.componentName"
            contenteditable
            v-html="componentData.elementData.headerText"
            class="page__header site__element"
        >{{componentData}}</component>
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
    computed: {
        getComponentData: function () {
            return this.componentData
        }
    },
    mounted: function () {

    },
    methods: {
        grabTexts(els) {
            let newObj = {};
            Array.from(els).forEach(element => {
                let textType = element.getAttribute("data-input-type");
                if (element.nodeName === "IMG") {
                    newObj[textType] = element.closest(".page__external__data__container").querySelector(".options__editable").textContent.trim();
                } else {
                    newObj[textType] = element.innerHTML.trim();
                }
            });
            return newObj;
        },
        updateTarget(event, newListItems) {
            let newComponentData = JSON.parse(JSON.stringify(this.componentData));
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
        },
        focused(e) {
            console.log(this.componentData);
            // document.execCommand('selectAll', false, null);
        },
    }
}
</script>

<style>
.page__header--h1,
.page__header--h2,
.page__header--h3,
.page__header--h4,
.page__header--h5,
.page__header--h6 {
    cursor: pointer;
}
.page__header--h1,
.page__header--h2,
.page__header--h3,
.page__header--h4,
.page__header--h5,
.page__header--h6 {
    width: 100%;
    word-wrap: break-word;
    font-family: ProximaNova, "Proxima Nova", 'Helvetica Neue', arial, sans-serif;
    text-align: left;
    margin: 16px 0 4px;
    cursor: pointer;
}
.page__header--h1 {
    font-size: 36px;
    font-weight: 700;
}
.page__header--h2 {
    font-size: 1.8em;
    line-height: 1em;
    font-weight: 600;
    letter-spacing: -0.5px;
}
.page__header--h3 {
    font-size: 1.6em;
    line-height: 1em;
    font-weight: 600;
}
.page__header--h4 {
    font-size: 1.6em;
    line-height: 1em;
    font-weight: 300;
}
.page__header--h5 {
    font-size: 1.6em;
    line-height: 1em;
    font-weight: 300;
}
.page__header--h6 {
    font-size: 1.6em;
    line-height: 1em;
    font-weight: 300;
}
.page__header--h1--builder,
.page__header--h2--builder,
.page__header--h3--builder,
.page__header--h4--builder,
.page__header--h5--builder,
.page__header--h6--builder {
    /* margin-bottom: 0; */
    margin: 0;
}

</style>