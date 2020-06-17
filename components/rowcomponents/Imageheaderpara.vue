<template>
    <div class="page__component">
        <div class="page__ihp" :class="'page__ihp--' + componentData.type">
            <div 
                class="page__ihp__image__container"
            >
                <img
                    @click="toggleImgOptions"
                    :key="numberOfActions"
                    :src="componentData.newElementData.listItems.imgSrc ? componentData.newElementData.listItems.imgSrc.text : imgSrc"
                    :alt="componentData.newElementData.listItems.headerText ? componentData.newElementData.listItems.headerText.text : headerText"
                    class="page__ihp__image site__element"
                />
                <div
                    @blur="updateTarget"
                    v-if="componentData.optionsShown"
                    data-type="imgSrc"
                    contenteditable
                    class="options__editable__bottom component__remove"
                >
                    {{ componentData.newElementData.listItems.imgSrc ? componentData.newElementData.listItems.imgSrc.text : imgSrc }}
                </div>
            </div>
            <div 
                class="page__ihp__text__container"
            >
                <div 
                    class="page__ihp__text__header page__ihp__container component__container"
                >
                    <h3
                        @blur="updateTarget"
                        data-type="headerText"
                        contenteditable
                        class="page__header--h3 page__ihp__header site__element"
                        v-html="componentData.newElementData.listItems.headerText ? componentData.newElementData.listItems.headerText.text : headerText"
                    ></h3>
                </div>
                
                <div
                    v-if="componentData.type !== 'list'"
                    class="page__ihp__text__para page__ihp__container component__container"
                >
                    <p
                        @blur="updateTarget"
                        data-type="paraText"
                        contenteditable
                        class="page__para site__element"
                        v-html="componentData.newElementData.listItems.paraText ? componentData.newElementData.listItems.paraText.text : paraText"
                    ></p>
                </div>
                <div
                    v-if="componentData.type === 'list'"
                    class="page__ihp__list page__ihp__container component__container"
                >
                    <List :componentData="listComponent" type="list" :group="true" />
                </div>
            </div>
            <Optionsbuttons
                :componentData="componentData"
                :group="group"
                :parentData="parentData ? parentData : null"
            />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        type: String,
        componentData: Object,
        group: Boolean,
        parentData: Object
    },
    data() {
        return {
            numberOfActions: 0,
            headerText: "New Header",
            paraText: "New Pararara",
            imgSrc: "https://www.bodybuilding.com/images/merchandising/april-2020/birthday-week-hotdeal-550x420.jpg",
            listComponent: {
                componentName: "List",
                uniqueName: "List" + this.numberOfActions,
                parentUniqueName: this.componentData.uniqueName,
                parentData: this.componentData,
                number: this.numberOfActions,
                type: "list",
                newElementData: {
                    listItems: {
                        listItems: [
                            {
                                li: "New List Item 1"
                            },
                            {
                                li: "New List Item 2"
                            }
                        ]
                    }    
                },
                optionsShown: true
            },
        };
    },
    mounted() {
        this.componentData.optionsShown = false;
    },
    methods: {
        getText(obj) {
            if (obj) {
                return obj.text; 
            }
            
        },
        updateTarget() {
            let newComponentData = JSON.parse(JSON.stringify(this.componentData));
            if (event.target.getAttribute("data-type").toLowerCase() === "li") {
                let newLi = {li: event.target.innerHTML.trim()};
                let listItem = event.target.getAttribute("data-component-list-number");
                newComponentData.newElementData.listItems.listItems[listItem] = newLi;
            } else {
                let listType = event.target.getAttribute("data-type");
                newComponentData.newElementData.listItems[listType].text = event.target.innerHTML.trim();
                newComponentData.componentChanges += 1;
            }
            let info = {newComponentData: newComponentData};
            if (!this.componentData.hasOwnProperty("parentData")) {
                this.$nuxt.$emit("updateTarget", info);
            } else {
                if (this.componentData.parentUniqueName) {
                    this.$nuxt.$emit("updateTargetGroup", info);
                }
            }
        },
        toggleImgOptions() {
            this.componentData.optionsShown = !this.componentData.optionsShown;
        }
    }
}
</script>

<style>

</style>