<template>
    <div
        class="page__component"
    >
        <ul
            v-if="type === 'ul'"
            data-input-types="['li']"
            :key="componentData.uniqueName + componentData.componentChanges"
            :data-component-type="componentData.componentName"
            class="page__ul__list site__element"
        >
            <div
                v-for="(item, index) in listItems"
                :data-list-item-number="index"
                :key="componentData.uniqueName + index"
                class="component__wrapper"
            >
                <li
                    @blur="updateTarget()"
                    @keydown.enter="enterPressed"
                    v-html="item.li"
                    data-input-type="li"
                    class="list__item"
                    contenteditable
                ></li>
                <div
                    v-if="componentData.optionsShown"
                    class="component__options__buttons component__remove"
                >
                    <div @click="updateTarget('addListItem')" class="component__options--button">+</div>
                    <div @click="updateTarget('deleteListItem')" class="component__options--button">X</div>
                </div>
            </div>
        </ul>
        <Optionsbuttons
            v-if="componentData.optionsShown && !group"
            :componentData="componentData"
        />
    </div>
</template>

<script>
export default {
    props: {
        type: String,
        componentData: Object,
        group: Boolean,
        subgroup: Boolean,
        parentData: Object,
        items: Object
    },
    data() {
        return {
            
        };
    },
    computed: {
        listItems: function () {
            if (this.items) {
                return this.items.elementData.listItems;
            } else {
                return this.componentData.elementData.listItems;
            }
        }
    },
    methods: {
        focused(e) {
            console.log(e);
        },
        enterPressed(e) {
            e.preventDefault();
            this.updateTarget("addListItem");
            this.componentData.componentChanges += 1;
        },
        // grabTexts(els) {
        //     let newObj = {};
        //     let listArr = [];
        //     Array.from(els).forEach(element => {
        //         let textType = element.getAttribute("data-input-type");
        //         if (element.nodeName === "IMG") {
        //             newObj[textType] = element.closest(".page__external__data__container").querySelector(".options__editable").textContent.trim();
        //         } else if (element.nodeName === "LI") {
        //             listArr.push({li: element.innerHTML.trim()});
        //         } else {
        //             newObj[textType] = element.innerHTML.trim();
        //         }
        //     });
        //     if (listArr.length > 0) {
        //         newObj.listItems = listArr
        //     }
        //     return newObj;
        // },
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
        // addListItem() {
        //     console.log('adding');
        //     console.log(event);
            
        //     let newComponentData = JSON.parse(JSON.stringify(this.componentData));
        //     if (newComponentData.uniqueName === this.componentData.uniqueName) {
        //         let newListItems = this.getNewListItems(event);
        //         let clickedItem = this.getClickedListItem(event, newListItems);
        //         newListItems.splice(clickedItem + 1, 0, {li: "New List Item"});
        //         this.updateTarget(event, newListItems);
        //         this.componentActions += 1;
        //     }
        // },
        // deleteListItem() {
        //     console.log('removing');
        //     let newComponentData = JSON.parse(JSON.stringify(this.componentData));
        //     if (newComponentData.uniqueName === this.componentData.uniqueName) {
        //         let newListItems = this.getNewListItems(event);
        //         let clickedItem = this.getClickedListItem(event, newListItems);
        //         newListItems.splice(clickedItem, 1);
        //         this.updateTarget(event, newListItems);
        //         this.componentActions += 1;
        //     }
        // },
        // getNewListItems(event) {
        //     let newListItems = event.target.closest(".site__element").getElementsByTagName("li");
        //     let newLiArr = Array.from(newListItems).map(function (li) {
        //         return {
        //             li: li.innerHTML
        //         }
        //     });
        //     return newLiArr;
        // },
        // getClickedListItem(event, newListItems) {
        //     let clickedItem = -1;
        //     Array.from(newListItems).forEach((listItem, index) => {
        //         let liText = listItem.li.trim().toLowerCase();
        //         let eventText = event.target.closest(".component__wrapper").getElementsByTagName("li")[0].textContent.trim().toLowerCase();
        //         if (liText === eventText) {
        //             clickedItem = index;
        //         }
        //     });
        //     return clickedItem;
        // }
        // updateTarget(event, newListItems) {
        //     let newComponentData = JSON.parse(JSON.stringify(this.componentData));
        //     if (newComponentData.uniqueName === this.componentData.uniqueName) {
        //         if (newComponentData.componentName.toLowerCase() === "list") {
        //             console.log(1)
        //             if (newListItems) {
        //                 newComponentData.elementData.listItems = newListItems;
        //                 this.numberOfListActions += 1;
        //             } else {
        //                 Object.assign(newComponentData.elementData.listItems, this.getNewListItems(event));
        //             }
        //         } else {
        //             console.log(2)
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
        //             this.$nuxt.$emit("updateSubGroupList", newComponentData.elementData.listItems);
        //         } else {
        //             info.parentData = this.parentData;
        //             this.$nuxt.$emit("updateGroupTarget", info);
        //         }
        //         newComponentData.componentChanges += 1;
        //     }
        // },
        
    }
}
</script>

<style>
.page__ul__list .component__wrapper {
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-between;
    align-items: center;
    position: relative;
}
</style>