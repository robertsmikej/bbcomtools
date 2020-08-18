<template>
    <div :href="componentData.elementData.bannerLink" class="page__banner page__component component--to-link">
        <div class="page__banner__inner component__container">
            <div
                @click="toggleOptions"
                class="page__banner__image__container"
            >
                <div
                    v-if="!componentData.optionsHidden && showBackgroundURLOption"
                    class="component__options component__options--bottom" 
                >
                <div
                    v-show="optionsShown"
                    class="options__editable__bottom"
                >
                    <div class="options__editable__container">
                        <span class="options__description element__exclude">Desktop Image URL</span>
                        <div
                            @blur="updateTarget"
                            contenteditable
                            class="options__editable options--imgsrc--desktop component__remove"
                        >
                            {{ componentData.elementData.elementOptions.backgroundImg.imgSrcDesktop }}
                        </div>
                    </div>
                    <div class="options__editable__container">
                        <span class="options__description element__exclude">Mobile Image URL</span>
                        <div
                            @blur="updateTarget"
                            contenteditable
                            class="options__editable options--imgsrc--mobile component__remove"
                        >
                            {{ componentData.elementData.elementOptions.backgroundImg.imgSrcMobile }}
                        </div>
                    </div>
                    <div class="options__editable__container">
                        <span class="options__description element__exclude">IMG To Mobile - 768px Default</span>
                        <div
                            @blur="updateTarget"
                            contenteditable
                            class="options__editable options--img--changetomobile component__remove"
                        >
                            {{ componentData.elementData.elementOptions.backgroundImg.imgChangeToMobile }}
                        </div>
                    </div>
                </div>
                <Optionsbuttons
                    :componentData="componentData"
                />
                </div>
                <picture
                    :key="componentData.elementData.elementOptions.backgroundImg.imgSrcDesktop"
                    class="page__banner__image" 
                >
                    <source 
                        :srcset="componentData.elementData.elementOptions.backgroundImg.imgSrcDesktop" 
                        :media="'(min-width:' + componentData.elementData.elementOptions.backgroundImg.imgChangeToMobile + ')'"
                    >
                    <img 
                        :src="componentData.elementData.elementOptions.backgroundImg.imgSrcMobile" 
                        :alt="componentData.elementData.headerText" 
                        class="page__banner__image"
                    />
                </picture>
            </div>
            <div class="page__banner__text__container">
                <Optionsadvanced 
                    :componentData="componentData"
                    :dropdowns="componentData.elementData.dropdowns"
                    v-show="optionsShown"
                    class="component__options--left component__options--stacked"
                />
                <Headers
                    :componentData="headerComponent1"
                    :key="componentData.uniqueName + componentData.componentChanges + '-header1'"
                    :style="{ color: componentData.elementData.elementOptions.textColor.code }"
                />
                <Headers 
                    :componentData="headerComponent2"
                    :key="componentData.uniqueName + componentData.componentChanges + '-header2'"
                    :style="{ color: componentData.elementData.elementOptions.textColor.code }"
                />
                <Headers 
                    :componentData="headerComponent3"
                    :key="componentData.uniqueName + componentData.componentChanges + '-header3'"
                    :style="{ color: componentData.elementData.elementOptions.textColor.code }"
                />
                <Paragraphs
                    :componentData="paraComponent1"
                    :key="componentData.uniqueName + componentData.componentChanges + '-p1'"
                    :style="{ color: componentData.elementData.elementOptions.textColor.code }"
                    class="page__banner__disclaimer"
                />
            </div>
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
            selectedBackground: "",
            showBackgroundURLOption: true,
            headerComponent1: {
                componentName: "Headers",
                componentChanges: 0,
                uniqueName: this.componentData.uniqueName + "-Header1",
                type: "H3",
                parentData: this.componentData,
                childComponentNumber: this.componentNumber,
                number: this.numberOfActions,
                elementData: {
                    headerText: this.componentData.elementData.header_1
                },
                optionsShown: false
            },
            headerComponent2: {
                componentName: "Headers",
                componentChanges: 0,
                uniqueName: this.componentData.uniqueName + "-Header2",
                type: "H2",
                parentData: this.componentData,
                childComponentNumber: this.componentNumber,
                number: this.numberOfActions,
                elementData: {
                    headerText: this.componentData.elementData.header_2
                },
                optionsShown: false
            },
            headerComponent3: {
                componentName: "Headers",
                componentChanges: 0,
                uniqueName: this.componentData.uniqueName + "-Header3",
                type: "H4",
                parentData: this.componentData,
                childComponentNumber: this.componentNumber,
                number: this.numberOfActions,
                elementData: {
                    headerText: this.componentData.elementData.header_3
                },
                optionsShown: false
            },
            paraComponent1: {
                componentName: "Paragraphs",
                componentChanges: 0,
                uniqueName: this.componentData.uniqueName + "-Para1",
                type: "p",
                parentData: this.componentData,
                childComponentNumber: this.componentNumber,
                number: this.numberOfActions,
                elementData: {
                    paraText: this.componentData.elementData.disclaimerText,
                },
                optionsShown: false
            },
            optionsShown: true

        };
    },
    computed: {

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
.page__para {
    cursor: pointer;
}
.page__para--builder {
    /* margin: 0; */
}
</style>