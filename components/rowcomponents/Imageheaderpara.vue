<template>
    <div class="page__component">
        <div
            data-input-types="['headerText', 'imgSrc', 'paraText', 'listItems']"
            :data-component-type="componentData.componentName"
            :data-component-sub-type="componentData.type"
            :class="'page__ihp--' + componentData.type"
            class="page__ihp" 
        >
            <div 
                class="page__ihp__image__container page__external__data__container"
            >
                <img
                    @click="toggleImgOptions"
                    :key="numberOfActions"
                    :src="componentData.elementData.imgSrc"
                    :alt="componentData.elementData.headerText"
                    data-input-type="imgSrc"
                    class="page__ihp__image site__element"
                />
                <!-- {{componentData.elementData}} -->
                <div
                    @blur="updateTarget"
                    v-show="componentData.optionsShown"
                    contenteditable
                    class="options__editable options__editable__bottom component__remove"
                >
                    {{ componentData.elementData.imgSrc}}
                </div>
            </div>
            <div 
                class="page__ihp__text__container"
            >
                <div 
                    class="page__ihp__text__header page__ihp__container component__container"
                >
                    <h4
                        @blur="updateTarget"
                        contenteditable
                        v-html="componentData.elementData.headerText"
                        data-input-type="headerText"
                        class="page__header--h4 page__ihp__header site__element"
                    ></h4>
                </div>
                
                <div
                    v-if="componentData.type !== 'list'"
                    class="page__ihp__text__para page__ihp__container component__container"
                >
                    <p
                        @blur="updateTarget"
                        contenteditable
                        v-html="componentData.elementData.paraText"
                        data-input-type="paraText"
                        class="page__para site__element"
                    ></p>
                </div>
                <div
                    v-if="componentData.type === 'list'"
                    class="page__ihp__list page__ihp__container component__container"
                >
                    <List
                        data-input-type="listItems"
                        :componentData="listComponent"
                        :key="this.componentData.uniqueName + pageActions"
                        :items="componentData"
                        type="ul"
                        :group=true
                        :parentData="this.componentData"
                    />
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
        pageActions: Number,
        group: Boolean,
        parentData: Object
    },
    data() {
        return {
            numberOfActions: 0,
            numberOfListActions: 0,
            headerText: "New Header",
            paraText: "New Pararara",
            imgSrc: "https://www.bodybuilding.com/images/merchandising/april-2020/birthday-week-hotdeal-550x420.jpg",
            listComponent: {
                componentName: "List",
                componentChanges: 0,
                uniqueName: this.componentData.uniqueName + "-List",
                type: "list",
                parentUniqueName: this.componentData.uniqueName,
                parentData: this.componentData,
                number: this.numberOfActions,
                elementData: {
                    "listItems": [
                        {"li": "New List Item 1"},
                        {"li": "New List Item 2"}
                    ]
                },
                optionsShown: true
            },
        };
    },
    mounted() {
        this.componentData.optionsShown = false;
        // console.log(this.componentData);
    },
    created() {
        // this.$nuxt.$on('updateParentTarget', data => {
        //     this.updateTarget(data);
        // }),
        this.$nuxt.$on('updateSubGroupList', data => {
            console.log(data);
            console.log(event);
            this.updateTarget(event, data.listItems);
        })
    },
    methods: {
        getText(obj) {
            if (obj) {
                return obj.text; 
            }
        },
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
        updateTarget(action) {
            let newComponentData = JSON.parse(JSON.stringify(this.componentData));
            if (newComponentData.uniqueName === this.componentData.uniqueName) {
                newComponentData.componentChanges += 1;
                let info = {
                    newComponentData: newComponentData,
                    event: event,
                    action: action
                };
                this.$nuxt.$emit("updateTarget", info);
            }
        },
        // updateTarget(event, newListItems) {
        //     console.log(newListItems);
        //     let newComponentData = JSON.parse(JSON.stringify(this.componentData));
        //     if (newComponentData.uniqueName === this.componentData.uniqueName) {
        //         if (newComponentData.componentName.toLowerCase() === "list") { //IF IS LIST
        //             console.log(3);
        //             if (newListItems) {
        //                 newComponentData.elementData.listItems = newListItems;
        //                 this.numberOfListActions += 1;
        //             } else {
        //                 Object.assign(newComponentData.elementData.listItems, this.getNewListItems(event));
        //             }
        //         } else {
        //             console.log(4)
        //             let textsToGrab = this.grabTexts(this.$el.querySelectorAll("[data-input-type]"));
        //             newComponentData.elementData = textsToGrab;
        //             if (newListItems) {
        //                 newComponentData.elementData.listItems = newListItems;
        //             }
        //         }
        //         let info = {
        //             newComponentData: newComponentData,
        //             oldComponentData: this.componentData
        //         };
        //         if (!this.group && !this.subgroup) {
        //             this.$nuxt.$emit("updateTarget", info);
        //         } else if (this.subgroup) {
        //             info.newListItems = newComponentData.elementData.listItems;
        //             info.uniqueName = this.componentData.uniuqeName;
        //             this.$nuxt.$emit("updateSubGroupList", info);
        //         } else {
        //             info.parentData = this.parentData;
        //             this.$nuxt.$emit("updateGroupTarget", info);
        //         }
        //         newComponentData.componentChanges += 1;
        //     }
        // },
        toggleImgOptions() {
            this.componentData.optionsShown = !this.componentData.optionsShown;
        }
    }
}
</script>

<style>

</style>