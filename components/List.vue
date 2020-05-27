<template>
    <div :data-list-name="componentData.uniqueName" class="page__list component__outer component__outer--max-width">
        <div class="component__options" v-if="!componentData.optionsHidden">
            <OptionsButtons  :componentData="componentData"/>
        </div>
        <div v-if="!componentData.optionsHidden" class="component__options--individual">
            <div class="list__items" >
                <div class="list__item" v-for="(item, index) in listItems" :key="index + 1" :list-item-number="index">
                    <input v-model="listItems[index]" class="list__input" value="item" type="text"/>
                    <div class="component__options__buttons">
                        <div class="component__options--button" @click="addListItem">+</div>
                        <div class="component__options--button" @click="deleteListItem">X</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="component__wrap">
            <ul @click="checkOptions" v-if=" type === 'list'" :key="numberOfItems" class="merch__list">
                <li v-for="(item, index) in listItems" :index-num="index" :key="item + index">{{ item }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        type: String,
        componentData: Object
    },
    data() {
        return {
            numberOfItems: 0,
            listItems: []
        };
    },
    created() {
        let elements = this.componentData.elementData.listItems;
        let that = this;
        elements.forEach(function (el) {
            that.listItems.push(el);
        });
        this.numberOfItems = this.listItems.length;
    },
    methods: {
        checkOptions() {
            let info = {
                componentData: this.componentData,
                listItems: this.componentData.elementData.listItems
            };
            this.$nuxt.$emit("toggleOptions", info);
        },
        deleteListItem(e) {
            let components = this.listItems;
            let listItem = e.target.closest(".list__item").getAttribute("list-item-number");
            components.splice(listItem, 1);
            this.componentData.elementData.listItems = components;
            this.numberOfItems -= 1;
        },
        addListItem(e) {
            let components = this.listItems;
            let listItem = parseInt(e.target.closest(".list__item").getAttribute("list-item-number")) + 1;
            components.splice(listItem, 0, "New List Item");
            this.componentData.elementData.listItems = components;
            this.numberOfItems += 1;
        }
    }
}
</script>

<style>
.merch__list {
    cursor: pointer;
}
</style>