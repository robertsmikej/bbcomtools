<template>
    <div
        class="page__component"
    >
        <ul
            v-if="type === 'ul'"
            data-input-types="['li']"
            :key="componentData.uniqueName + componentActions"
            :data-component-type="componentData.componentName"
            class="page__ul__list site__element"
        >
            <div
                v-for="(item, index) in componentData.elementData.listItems"
                :data-list-item-number="index"
                :key="componentData.uniqueName + index"
                class="component__wrapper"
            >
                <li
                    @blur="updateTarget"
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
                    <div @click="addListItem" class="component__options--button">+</div>
                    <div @click="deleteListItem" class="component__options--button">X</div>
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
        group: Boolean
    },
    data() {
        return {
            componentActions: 0
        };
    },
    created() {

    },
    methods: {
        focused(e) {
                    //             @focus="focused"
                    // @keydown.enter="enterPressed"
            console.log(e);
        },
        enterPressed(e) {
            // console.log(e);
            e.preventDefault();
            this.updateTarget();
            this.addListItem();
            // this.onEdit(e);
            // this.addListItem(e);
            this.componentActions += 1;
        },
        updateTarget() {
            console.log(event);
            let newComponentData = JSON.parse(JSON.stringify(this.componentData));            
            if (newComponentData.componentName === "List") {
                newComponentData.elementData.listItems = this.getNewListItems(event);
            } else {
                let textsToGrab = this.$el.querySelectorAll("[data-input-type]");
                let components = Array.from(textsToGrab).forEach(element => {
                    let textType = element.getAttribute("data-input-type");
                    if (element.nodeName === "IMG") {
                        newComponentData.elementData[textType] = element.closest(".page__external__data__container").querySelector(".options__editable").textContent.trim();
                    } else {
                        newComponentData.elementData[textType] = element.innerHTML.trim();
                    }
                });           
            }
            let info = {
                newComponentData: newComponentData,
                oldComponentData: this.componentData,
                event: event
            };
            newComponentData.componentChanges += 1;
            if (!this.group) {
                this.$nuxt.$emit("updateTarget", info);
            } else {
                info.parentData = this.parentData;
                this.$nuxt.$emit("updateGroupTarget", info);
            }
        },
        getNewListItems(event) {
            let newListItems = event.target.closest(".site__element").getElementsByTagName("li");
            let newLiArr = Array.from(newListItems).map(function (li) {
                return {
                    li: li.innerHTML
                }
            });
            return newLiArr;
        },
        getClickedListItem(event, newListItems) {
            let clickedItem = -1;
            Array.from(newListItems).forEach((listItem, index) => {
                let liText = listItem.li.trim().toLowerCase();
                let eventText = event.target.closest(".component__wrapper").getElementsByTagName("li")[0].textContent.trim().toLowerCase();
                if (liText === eventText) {
                    clickedItem = index;
                }
            });
            return clickedItem;
        },
        addListItem() {
            let newComponentData = JSON.parse(JSON.stringify(this.componentData));
            let newListItems = this.getNewListItems(event);
            let clickedItem = this.getClickedListItem(event, newListItems);
            newListItems.splice(clickedItem + 1, 0, {li: "New List Item"});
            newComponentData.elementData.listItems = newListItems;
            newComponentData.componentChanges += 1;
            let info = {
                newComponentData: newComponentData
            };
            // console.log(info);
            // this.componentActions += 1;
            this.$nuxt.$emit("updateTarget", info);
            this.componentActions += 1;
        },
        deleteListItem(e) {
            let newComponentData = JSON.parse(JSON.stringify(this.componentData));
            let newListItems = this.getNewListItems(event);
            let clickedItem = this.getClickedListItem(event, newListItems);
            newListItems.splice(clickedItem, 1);
            newComponentData.elementData.listItems = newListItems;
            newComponentData.componentChanges += 1;
            let info = {
                newComponentData: newComponentData
            };
            this.componentActions += 1;
            this.$nuxt.$emit("updateTarget", info);
        }
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