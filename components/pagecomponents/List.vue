<template>
    <div
        class="page__component"
    >
        <ul
            :key="componentData.uniqueName + componentData.componentChanges"
            class="page__ul__list"
        >
            <div
                v-for="(item, index) in listItems"
                :key="componentData.uniqueName + index"
                class="component__wrapper"
            >
                <li
                    @blur="updateTarget()"
                    @keydown.enter="enterPressed"
                    @paste="onListPaste"
                    class="list__item"
                    contenteditable
                >
                    {{ item.li }}
                </li>
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
        onListPaste (e) {
            console.log(e.clipboardData.getData('text'));
            //NEED TO FIX SO PEOPLE CAN COPY AND PASTE INDIVIDUAL LIST ITEMS
            
            // let pastedData = e.clipboardData.getData('text/html');
            // if (pastedData && pastedData.length > 1000) {
            //     let pastedDoc = new DOMParser().parseFromString(e.clipboardData.getData('text/html'), "text/html").getElementsByTagName("body")[0].getElementsByTagName("b")[0];
            //     let dataObj = {
            //         type: "listItems",
            //         newListItems: []
            //     };
            //     pastedDoc.querySelectorAll("p").forEach(item => {
            //         dataObj.newListItems.push({li: item.textContent.trim()});
            //     });
            //     this.updateTarget("pasted", dataObj);
            // }
        },
        focused(e) {
            console.log(e);
        },
        enterPressed(e) {
            e.preventDefault();
            this.updateTarget("addListItem");
            this.componentData.componentChanges += 1;
        },
        updateTarget(action, pasted) {
            let newComponentData = JSON.parse(JSON.stringify(this.componentData));
            if (newComponentData.uniqueName === this.componentData.uniqueName) {
                newComponentData.componentChanges += 1;
                let info = {
                    newComponentData: newComponentData,
                    event: event,
                    action: action,
                    pasted: pasted
                };
                this.$nuxt.$emit("updateTarget", info);
            }
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