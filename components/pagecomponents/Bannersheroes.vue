<template>
    <div :href="componentData.elementData.bannerLink" class="page__banner page__component component--to-link">
        <div class="page__banner__inner component__container">
            <div class="page__banner__image__container">
                <div class="component__options component__options--bottom" v-if="!componentData.optionsHidden && showBackgroundURLOption">
                    <textarea 
                        v-model="componentData.elementData.backgroundImg.desktop" 
                        class="text__input" 
                        type="text" 
                        placeholder="Background Image URL"
                    />
                    <Optionsbuttons :componentData="componentData"/>
                </div>
                <picture class="page__banner__image" :key="componentData.elementData.desktop">
                    <source :srcset="componentData.elementData.backgroundImg.desktop" media="(min-width: 768px)">
                    <img :src="componentData.elementData.backgroundImg.mobile" :alt="componentData.elementData.headerText" class="page__banner__image"/>
                </picture>
            </div>
            <div class="page__banner__text__container">
                <Optionsadvanced 
                    :componentData="componentData"
                    :dropdowns="componentData.elementData.dropdowns"
                    v-if="!componentData.optionsHidden"
                    class="component__options--right component__options--stacked"
                />
                <Headers 
                    :componentData="headerComponent1"
                    :key="componentData.uniqueName + componentData.componentChanges + '-header1'"
                />
                <Headers 
                    :componentData="headerComponent2"
                    :key="componentData.uniqueName + componentData.componentChanges + '-header2'"
                />
                <Headers 
                    :componentData="headerComponent3"
                    :key="componentData.uniqueName + componentData.componentChanges + '-header3'"
                />
                <Paragraphs
                    :componentData="paraComponent1"
                    :key="componentData.uniqueName + componentData.componentChanges + '-p1'"
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
                    action: action,
                };
                this.$nuxt.$emit("updateTarget", info);
            }
        },
        checkOptions(e) {
            this.$nuxt.$emit("toggleOptions", this.componentData.uniqueName);
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