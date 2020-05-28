<template>
    <div 
        :data-list-name="componentData.uniqueName"
        class="page__list component__outer component__outer--max-width"
    >
        <div 
            v-if="!componentData.optionsHidden"
            class="component__options component__options--individual"
        >
            <div class="options__list__items">
                <div class="options__list__item" 
                    v-for="(item, index) in listItems" 
                    :key="index + 1" 
                    :list-item-number="index"
                >
                    <input 
                        v-model="listItems[index].text" 
                        :style="'min-height: ' + componentData.optionsMinHeight[index] + ';'"
                        class="options__list__input bb__list"
                        value="item.text"
                        type="text"
                    />
                    <div class="component__options__buttons">
                        <div 
                            class="component__options--button"
                            @click="addListItem"
                        >
                        +
                        </div>
                        <div 
                            class="component__options--button"
                            @click="deleteListItem"
                        >
                        X
                        </div>
                    </div>
                </div>
            </div>
            <OptionsButtons
                :componentData="componentData"
            />
        </div>
        <div class="component__wrap">
            <ul 
                @click="checkOptions" 
                v-if=" type === 'list'"
                :key="numberOfItems"
                class="bb__list"
            >
                <li class="bb__list__li"
                    v-for="(item, index) in listItems"
                    :index-num="index"
                    :key="item.text + index">
                    {{ item.text }}
                </li>
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
        checkHeight(e) {
            this.$nuxt.$emit("changeHeight", this.componentData);
        },
        checkOptions() {
            let info = {
                componentData: this.componentData,
                listItems: this.componentData.elementData.listItems
            };
            this.$nuxt.$emit("toggleOptions", info);
        },
        deleteListItem(e) {
            let components = this.listItems;
            let listItem = e.target.closest(".options__list__item").getAttribute("list-item-number");
            components.splice(listItem, 1);
            this.componentData.elementData.listItems = components;
            this.numberOfItems -= 1;
        },
        addListItem(e) {
            let components = this.listItems;
            let listItem = parseInt(e.target.closest(".options__list__item").getAttribute("list-item-number")) + 1;
            components.splice(listItem, 0, {text: "New List Item"});
            this.componentData.elementData.listItems = components;
            this.numberOfItems += 1;
        }
    }
}
</script>

<style>
.bb__list {
    cursor: pointer;
}

.options__list__items {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    align-items: flex-start;
    justify-content: flex-start;
    background: #FFF;
    padding-left: 22px;
}
.options__list__item {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    justify-content: center;
}
.options__list__input {
    margin: 0;
    padding: 0;
}
</style>