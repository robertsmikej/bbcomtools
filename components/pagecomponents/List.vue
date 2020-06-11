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
                v-for="(item, index) in listItems"
                :data-list-item-number="index"
                :key="item.headerText + index"
                class="component__wrapper"
            >
                <li

                    :data-component-list-number="index"
                    @keydown.enter="enterPressed"
                    contenteditable
                    class="list__item"
                >
                    {{ item.headerText }}
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
        console.log(this.group);
    },
    methods: {
        enterPressed(e) {
            e.preventDefault();
            this.onEdit(e);
            this.addListItem(e);
            console.log(event);
        },
        onEdit(event) {
            //@input="onEdit($event)"
            let update = {
                headerText: event.target.innerHTML.trim()
            };
            let componentIndex = event.target.getAttribute("data-component-list-number");
            this.listItems[componentIndex] = update;
            this.numberOfItems = this.listItems.length;
        },
        optionsTrue() {
            let info = {
                componentData: this.componentData,
                optionsBool: true
            };
            this.$nuxt.$emit("optionsChange", info);
        },
        deleteListItem(e) {
            let components = this.listItems;
            let listItem = e.target.closest(".component__wrapper").getAttribute("data-list-item-number");
            components.splice(listItem, 1);
            this.numberOfItems = this.listItems.length;
        },
        addListItem(e) {
            let components = this.listItems;
            let listItem = parseInt(e.target.closest(".component__wrapper").getAttribute("data-list-item-number")) + 1;
            components.splice(listItem, 0, { headerText: "New List Item" });
            this.numberOfItems = this.listItems.length;
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