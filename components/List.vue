<template>
    <div class="page__paras component__outer component__outer--max-width">
        <div class="component__options" v-if="!componentData.optionsHidden">
            <div class="list__items" :key="numberOfItems">
                <div class="list__item" v-for="(item, index) in componentData.elementData.listItems" :key="item + index" :list-number="index">
                    <input v-model="componentData.elementData.listItems[index]" class="list__input" value="item" type="text"/>
                    <div class="component__options__buttons">
                        <div class="component__options--button" @click="addListItem">+</div>
                        <div class="component__options--button" @click="deleteListItem">X</div>
                    </div>
                </div>
            </div>
             <OptionsButtons  :componentData="componentData"/>
        </div>
        <div class="component__wrap" @click="checkOptions">
            <ul v-if="type === 'list'" :key="numberOfItems" class="merch__list">
                <li v-for="(item, index) in componentData.elementData.listItems" :key="item + index">{{ item }}</li>
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
            numberOfItems: 0
        };
    },
    created() {
        let elements = this.componentData.elementData;
        if (Object.keys(elements).length === 0) {
            this.componentData.elementData.listItems = [
                "New List Item",
                "New List Item"
            ];
        }
        this.numberOfItems = this.componentData.elementData.listItems.length;
    },
    methods: {
        checkOptions() {
            let info = {
                componentData: this.componentData
            };
            this.$nuxt.$emit("toggleOptions", info);
        },
        deleteListItem(e) {
            var components = this.componentData.elementData.listItems;
            var listItem = e.target.closest(".list__item").getAttribute("list-number");
            components.splice(listItem, 1);
            this.numberOfItems -= 1;
        },
        addListItem(e) {
            var components = this.componentData.elementData.listItems;
            var listItem = parseInt(e.target.closest(".list__item").getAttribute("list-number")) + 1;
            components.splice(listItem, 0, "New List Itemnew");
            this.numberOfItems += 1;
        }
    }
}
</script>

<style>
    .merch__list {
        width: 100%;
        list-style-position: inside;
        margin: 10px auto;
    }
    .merch__list li {
        width: 100%;
        text-align: left;
    }
</style>