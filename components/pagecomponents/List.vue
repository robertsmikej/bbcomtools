<template>
    <div
        class="page__component"
    >
        <ul
            v-if="type === 'ul'"
            :key="componentData.uniqueName + componentActions"
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
                    data-input-type="li"
                    contenteditable
                    class="list__item"
                    v-html="item.li"
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
            e.preventDefault();
            // this.onEdit(e);
            // this.addListItem(e);
        },
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
            this.componentActions += 1;
            this.$nuxt.$emit("updateTarget", info);
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