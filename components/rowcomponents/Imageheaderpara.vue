<template>
    <div class="page__component">
        <div class="page__ihp" :class="'page__ihp--' + componentData.type">
            <div 
                class="page__ihp__image__container"
            >
                <img
                    @click="toggleImgOptions"
                    :key="numberOfActions"
                    :src="elData.imgSrc"
                    :alt="elData.headerText"
                    class="page__ihp__image site__element"
                />
                <div
                    @input="onEdit($event)"
                    v-if="componentData.optionsShown"
                    data-name="imgSrc"
                    contenteditable
                    class="options__editable__bottom component__remove"
                >
                    {{ elData.imgSrc }}
                </div>
            </div>
            <div 
                class="page__ihp__text__container"
            >
                <div 
                    class="page__ihp__text__header page__ihp__container component__container"
                >
                    <h3
                        data-name="headerText"
                        contenteditable
                        class="page__header--h3 page__ihp__header site__element"
                    >
                        {{ elData.headerText }}
                    </h3>
                </div>
                <div
                    v-if="componentData.type !== 'list'"
                    class="page__ihp__text__para page__ihp__container component__container"
                >
                    <p
                        data-name="paraText"
                        contenteditable
                        class="page__para site__element"
                    >
                        {{ elData.paraText }}
                    </p>
                </div>
                <div
                    v-if="componentData.type === 'list'"
                    class="page__ihp__list page__ihp__container component__container"
                >
                    <List :componentData="listComponent" type="list" :group="true" />
                </div>
            </div>
            <Optionsbuttons
                :componentData="componentData"
                :group="group"
            />
        </div>
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
            numberOfActions: 0,
            listComponent: {
                componentName: "List",
                uniqueName: "List" + this.numberOfActions,
                parentUniqueName: this.componentData.uniqueName,
                parentData: this.componentData,
                number: this.numberOfActions,
                type: "list",
                elementData: {
                    listItems: [
                        { 
                            headerText: "New List Item 1"
                        },
                        {
                            headerText: "New List Item 2"
                        }
                    ]
                },
                optionsShown: true
            },
            elData: [
                {
                    headerText: "",
                    paraText: "",
                    imgSrc: ""
                }
            ]
        };
    },
    created() {
        let elements = this.componentData.elementData.listItems[0];
        let that = this;
        for (let e in elements) {
            this.elData[e] = elements[e]
        }
    },
    mounted() {
        let els = this.$el.querySelectorAll(".site__element");
        els.forEach((element, index) => {
            element.setAttribute("data-list-number", index);
        });

        this.componentData.optionsShown = false;
    },
    methods: {
        onEdit(event){
            let componentName = event.target.getAttribute("data-name")
            this.elData[componentName] = event.target.innerHTML.trim();
            this.numberOfActions += 1;
        },
        toggleImgOptions() {
            this.componentData.optionsShown = !this.componentData.optionsShown;
        }
    }
}
</script>

<style>

</style>