<template>
    <div
        class="page__component"
    >
        <ul 
            v-if="type === 'list'" 
            :key="numberOfItems" 
            class="page__ul__list site__element"
        >  
            <div
                v-for="(item, index) in componentData.newElementData.listItems.listItems"
                :data-list-item-number="index"
                :key="item.li + index"
                class="component__wrapper"
            >
                <li
                    
                    @focus="focused"
                    @keydown.enter="enterPressed"
                    @blur="updateTarget"
                    :data-component-list-number="index"
                    data-type="li"
                    contenteditable
                    class="list__item"
                >
                    {{ item.li }}
                </li>
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
            numberOfItems: 0
        };
    },
    created() {

    },
    methods: {
        focused(e) {
            console.log(e);
        },
        enterPressed(e) {
            e.preventDefault();
            this.onEdit(e);
            this.addListItem(e);
        },
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
        },
        deleteListItem(e) {
            let listItem = parseInt(e.target.closest(".component__wrapper").getAttribute("data-list-item-number"));
            let newListItems = [];
            this.$el.querySelectorAll(".list__item").forEach(function (el) {
                newListItems.push({li: el.innerHTML.trim()});
            });
            newListItems.splice(listItem, 1);
            let newComponentData = this.componentData;
            newComponentData.newElementData.listItems.listItems = newListItems;
            newComponentData.componentChanges += 1;
            let info = {
                newComponentData: newComponentData
            };
            this.$nuxt.$emit("updateTarget", info);
        },
        addListItem(e) {
            let listItem = parseInt(e.target.closest(".component__wrapper").getAttribute("data-list-item-number")) + 1;
            let newListItems = [];
            this.$el.querySelectorAll(".list__item").forEach(function (el) {
                newListItems.push({li: el.innerHTML.trim()});
            });
            newListItems.splice(listItem, 0, {li: "New List Item"});
            let newComponentData = this.componentData;
            newComponentData.newElementData.listItems.listItems = newListItems;
            newComponentData.componentChanges += 1;
            let info = {
                newComponentData: newComponentData
            };
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