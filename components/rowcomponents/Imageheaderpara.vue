<template>
    <div class="page__component">
        <div
            :data-component-type="componentData.componentName"
            :data-component-sub-type="componentData.type"
            :class="['page__ihp--' + componentData.type, 'page__ihp--' + componentData.type + '--flipped--' + componentData.elementData.elementOptions.flipped.boolean]"
            class="page__ihp" 
        >
            <div 
                class="page__ihp__image__container page__external__data__container"
            >
                <Images
                    :componentData="imageComponent"
                    :key="numberOfActions"
                    class="page__ihp__image"
                />
            </div>
            <div 
                class="page__ihp__text__header page__ihp__container component__container"
            >
                <Headers 
                    :componentData="headerComponent"
                    :key="this.componentData.uniqueName + pageActions"
                />
            </div>
            <div
                v-if="componentData.type !== 'list'"
                class="page__ihp__text__para page__ihp__container component__container"
            >
                <Paragraphs
                    :componentData="paraComponent"
                    :key="this.componentData.uniqueName + pageActions"
                />
            </div>
            <div
                v-if="componentData.type === 'list'"
                class="page__ihp__list page__ihp__container component__container"
            >
                <List
                    data-input-type="listItems"
                    :componentData="listComponent"
                    :key="this.componentData.uniqueName + pageActions"
                    :items="componentData"
                    type="ul"
                    :group=true
                    :parentData="this.componentData"
                />
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
                    // :group=true
                    // :parentData="this.componentData"
export default {
    props: {
        type: String,
        componentData: Object,
        pageActions: Number,
        group: Boolean,
        parentData: Object
    },
    data() {
        return {
            numberOfActions: 0,
            numberOfListActions: 0,
            paraComponent: {
                componentName: "Paragraphs",
                componentChanges: 0,
                uniqueName: this.componentData.uniqueName + "-Para",
                type: "p",
                parentUniqueName: this.componentData.uniqueName,
                parentData: this.componentData,
                number: this.numberOfActions,
                elementData: {
                    paraText: this.componentData.elementData.paraText,
                },
                optionsShown: true
            },
            imageComponent: {
                componentName: "Images",
                componentChanges: 0,
                uniqueName: this.componentData.uniqueName + "-Image",
                type: "img",
                parentUniqueName: this.componentData.uniqueName,
                parentData: this.componentData,
                number: this.numberOfActions,
                elementData: {
                    imgSrcDesktop: this.componentData.elementData.imgSrcDesktop,
                    imgSrcMobile: this.componentData.elementData.imgSrcMobile,
                    imgAlt: this.componentData.elementData.imgAlt,
                    imgChangeToMobile: this.componentData.elementData.imgChangeToMobile
                },
                optionsShown: true
            },
            headerComponent: {
                componentName: "Headers",
                componentChanges: 0,
                uniqueName: this.componentData.uniqueName + "-Header",
                type: "H4",
                parentUniqueName: this.componentData.uniqueName,
                parentData: this.componentData,
                number: this.numberOfActions,
                elementData: {
                    headerText: this.componentData.elementData.headerText
                },
                optionsShown: true
            },
            listComponent: {
                componentName: "List",
                componentChanges: 0,
                uniqueName: this.componentData.uniqueName + "-List",
                type: "list",
                parentUniqueName: this.componentData.uniqueName,
                parentData: this.componentData,
                number: this.numberOfActions,
                elementData: {
                    "listItems": [
                        {"li": "New List Item 1"},
                        {"li": "New List Item 2"}
                    ]
                },
                optionsShown: true
            },
            optionsShown: false,
            flipped: this.componentData.elementData.elementOptions.flipped.boolean
        };
    },
    mounted() {
        this.componentData.optionsShown = false;
    },
    created() {
        this.$nuxt.$on('updateSubGroupList', data => {
            this.updateTarget(event, data.listItems);
        })
    },
    methods: {
        updateTarget(action) {
            let newComponentData = JSON.parse(JSON.stringify(this.componentData));
            if (newComponentData.uniqueName === this.componentData.uniqueName) {
                newComponentData.componentChanges += 1;
                let info = {
                    newComponentData: newComponentData,
                    event: event,
                    action: action
                };
                this.$nuxt.$emit("updateTarget", info);
            }
        },
        toggleOptions() {
            this.optionsShown = !this.optionsShown;
        }
    }
}
</script>

<style>
.page__ihp__image__container {
    position: relative;
}
</style>