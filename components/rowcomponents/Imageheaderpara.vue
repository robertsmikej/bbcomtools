<template>
    <div class="page__component">
        <div
            :class="'page__ihp--' + componentData.type"
            class="page__ihp" 
        >
            <div 
                class="page__ihp__image__container"
            >
                <img
                    @click="toggleImgOptions"
                    :key="numberOfActions"
                    :src="componentData.elementData.imgSrc"
                    :alt="componentData.elementData.headerText"
                    class="page__ihp__image site__element"
                />
                <div
                    @blur="updateTarget"
                    v-if="componentData.optionsShown"
                    data-input-type="imgSrc"
                    contenteditable
                    class="options__editable__bottom component__remove"
                >
                    {{ componentData.elementData.imgSrc}}
                </div>
            </div>
            <div 
                class="page__ihp__text__container"
            >
                <div 
                    class="page__ihp__text__header page__ihp__container component__container"
                >
                    <h3
                        @blur="updateTarget"
                        data-input-type="headerText"
                        contenteditable
                        class="page__header--h3 page__ihp__header site__element"
                        v-html="componentData.elementData.headerText"
                    ></h3>
                </div>
                
                <div
                    v-if="componentData.type !== 'list'"
                    class="page__ihp__text__para page__ihp__container component__container"
                >
                    <p
                        @blur="updateTarget"
                        data-input-type="paraText"
                        contenteditable
                        class="page__para site__element"
                        v-html="componentData.elementData.paraText"
                    ></p>
                </div>
                <div
                    v-if="componentData.type === 'list'"
                    class="page__ihp__list page__ihp__container component__container"
                >
                    <List
                        :componentData="listComponent"
                        type="ul"
                        :group="true"
                    />
                </div>
            </div>
            <Optionsbuttons
                :componentData="componentData"
                :group="group"
                :parentData="parentData ? parentData : null"
            />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        type: String,
        componentData: Object,
        group: Boolean,
        parentData: Object
    },
    data() {
        return {
            numberOfActions: 0,
            headerText: "New Header",
            paraText: "New Pararara",
            imgSrc: "https://www.bodybuilding.com/images/merchandising/april-2020/birthday-week-hotdeal-550x420.jpg",
            listComponent: {
                componentName: "List",
                uniqueName: "List" + this.numberOfActions,
                type: "list",
                parentUniqueName: this.componentData.uniqueName,
                parentData: this.componentData,
                number: this.numberOfActions,
                elementData: {
                    "listItems": [
                        { 
                            "li": "New List Item 1"
                        },
                        {
                            "li": "New List Item 2"
                        }
                    ]
                },
                optionsShown: true
            },
        };
    },
    mounted() {
        this.componentData.optionsShown = false;
        // console.log(this.componentData);
    },
    methods: {
        getText(obj) {
            if (obj) {
                return obj.text; 
            }
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
                newComponentData: newComponentData,
                event: event
            };
            if (!this.group) {
                this.$nuxt.$emit("updateTarget", info);
            } else {
                this.$nuxt.$emit("updateGroupTarget", info);
            }
            
        },
        toggleImgOptions() {
            this.componentData.optionsShown = !this.componentData.optionsShown;
        }
    }
}
</script>

<style>

</style>