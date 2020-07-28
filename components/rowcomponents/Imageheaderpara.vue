<template>
    <div class="page__component">
        <div
            :data-component-type="componentData.componentName"
            :data-component-sub-type="componentData.type"
            :class="['page__ihp--' + componentData.type, 'page__ihp--' + componentData.type + '--flipped--' + componentData.elementData.elementOptions.flipped.boolean]"
            class="page__ihp"
            :key="numberOfActions"
        >
            <div 
                class="page__ihp__image__container page__external__data__container"
            >
                <Images
                    :componentData="imageComponent"
                    :key="componentData.componentChanges + '-img'"
                    class="page__ihp__image"
                />
            </div>
            <div 
                class="page__ihp__text__header page__ihp__container component__container"
            >
                <Headers 
                    :componentData="headerComponent"
                    :key="componentData.uniqueName + componentData.componentChanges + '-header'"
                />
            </div>
            <div
                v-if="componentData.type !== 'list'"
                class="page__ihp__text__para page__ihp__container component__container"
            >
                <Paragraphs
                    :componentData="paraComponent"
                    :key="componentData.uniqueName + componentData.componentChanges + '-p'"
                />
            </div>
            <div
                v-if="componentData.type === 'list'"
                class="page__ihp__list page__ihp__container component__container"
            >
                <List
                    data-input-type="listItems"
                    :componentData="listComponent"
                    :key="componentData.uniqueName + componentData.componentChanges + '-ul'"
                    :items="componentData"
                    type="ul"
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
        parentData: Object,
        componentNumber: Number,
        parentData: Object,
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
                parentData: this.componentData,
                childComponentNumber: this.componentNumber,
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
                parentData: this.componentData,
                childComponentNumber: this.componentNumber,
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
                parentData: this.componentData,
                childComponentNumber: this.componentNumber,
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
                parentData: this.componentData,
                childComponentNumber: this.componentNumber,
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
        if (!this.componentData.uniqueName) {
            this.componentData.uniqueName = this.componentData.componentName + this.componentData.componentNumber;
        }
        this.componentData.grandparentData = this.deepClone(this.parentData, {});
        this.numberOfActions += 1;
    },
    created() {
        if (this.componentNumber) {
            this.componentData.componentNumber = this.componentNumber;
        } else {
            this.componentData.componentNumber = 0;
        }
    },
    methods: {
        deepClone(initalObj, finalObj) {
            var obj = finalObj || {};
            for (var i in initalObj) {
                var prop = initalObj[i];
                if(prop === obj) {
                    continue;
                }
                if (typeof prop === 'object') {
                    if(prop.constructor === Array) {
                        obj[i] = deepClone(prop, []);
                    } else {
                        obj[i] = Object.create(prop);
                    }
                } else {
                    obj[i] = prop;
                }
            }
            return obj;
        },
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