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
                <img
                    @click="toggleOptions"
                    :key="numberOfActions"
                    :src="componentData.elementData.imgSrc"
                    :alt="componentData.elementData.imgAlt"
                    class="page__ihp__image site__element"
                />
                <!-- {{componentData.elementData}} -->
                <div
                    v-show="this.optionsShown"
                    class="options__editable__bottom"
                >
                    <div
                        @blur="updateTarget"
                        contenteditable
                        class="options__editable component__remove"
                    >
                        {{ componentData.elementData.imgAlt }}
                    </div>
                    <div
                        @blur="updateTarget"
                        contenteditable
                        class="options__editable options--imgsrc component__remove"
                    >
                        {{ componentData.elementData.imgSrc }}
                    </div>
                </div>
            </div>
            <div 
                class="page__ihp__text__header page__ihp__container component__container"
            >
                <Headers 
                    :componentData="headerComponent"
                    :group=true
                    :parentData="this.componentData"
                    :key="this.componentData.uniqueName + pageActions"
                />
                <!-- <h4
                    @blur="updateTarget"
                    contenteditable
                    data-input-type="headerText"
                    class="page__header--h4 page__ihp__header site__element"
                >
                    {{ componentData.elementData.headerText }}
                </h4> -->
            </div>
            
            <div
                v-if="componentData.type !== 'list'"
                class="page__ihp__text__para page__ihp__container component__container"
            >
                <p
                    @blur="updateTarget"
                    contenteditable
                    class="page__para site__element"
                >
                    {{ componentData.elementData.paraText }}
                </p>
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
            headerComponent: {
                componentName: "Headers",
                componentChanges: 0,
                uniqueName: this.componentData.uniqueName + "-Header",
                type: "H4",
                parentUniqueName: this.componentData.uniqueName,
                parentData: this.componentData,
                number: this.numberOfActions,
                elementData: {
                    headerText: this.componentData.elementData.headerText,
                    
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