<template>
    <div class="side__by__side page__component page__component--max-width">
        <div class="side__by__side__inner">
            <div class="side__by__side__image__container side__by__side__container component__container">
                <div class="component__options component__options--group component__options--bottom" v-if="!componentData.optionsHidden">
                    <textarea 
                        v-model="componentData.elementData.imgSrc"
                        :style="'min-height: ' + componentData.optionsMinHeight[0] + ';' + 'height: 60px'"
                        class="js__options__input"
                        type="text" 
                        placeholder="Image URL"
                    />
                    <Optionsbuttons :componentData="componentData"/>
                </div>
                <img :src="componentData.elementData.imgSrc" :alt="componentData.elementData.headerText" @click="checkOptions" class="side__by__side__image site__element"/>
            </div>
            <div class="side__by__side__text__container">
                <div class="side__by__side__text__header side__by__side__container component__container">
                    <div class="component__options component__options--group" v-if="!componentData.optionsHidden">
                        <input
                            v-model="componentData.elementData.headerText"
                            :style="'min-height: ' + componentData.optionsMinHeight[1] + ';'" 
                            @keyup="checkHeight" 
                            class="js__options__input page__header--h3 page__header--h3--builder" 
                            type="text"
                            placeholder="Header Text"
                        />
                        <Optionsbuttons :componentData="componentData"/>
                    </div>
                    <h3 class="page__header--h3 side__by__side__header site__element" @click="checkOptions">{{ componentData.elementData.headerText }}</h3>
                </div>
                <div class="side__by__side__text__para side__by__side__container component__container">
                    <div class="component__options component__options--group" v-if="!componentData.optionsHidden">
                        <textarea 
                            v-model="componentData.elementData.paraText"
                            :style="'min-height: ' + componentData.optionsMinHeight[2] + ';'" 
                            @keyup="checkHeight" 
                            class="js__options__input page__para"
                            type="text"
                            placeholder="Paragraph Text"
                        />
                        <Optionsbuttons :componentData="componentData"/>
                    </div>
                    <p class="page__para site__element" @click="checkOptions" style="white-space: pre-line;">{{ componentData.elementData.paraText }}</p>
                </div>
            </div>
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
            
        };
    },
    mounted() {

    },
    methods: {
        checkHeight(event) {
            let componentContainers = this.$el.querySelectorAll(".component__container");
            for (let c in componentContainers) {
                if (typeof componentContainers[c] === 'object') {
                    if (componentContainers[c] === event.target.closest(".component__container")) {
                        this.componentData.targetInputIndex = c;
                    }
                }
            }
            this.$nuxt.$emit("changeHeight", this.componentData);
        },
        checkOptions(event) {
            let info = {
                componentData: this.componentData
            };
            this.$nuxt.$emit("toggleOptions", info);
            this.checkHeight(event);
        }
    }
}
</script>

<style>
.side__by__side {
    cursor: pointer;
}
.side__by__side .side__by__side__image__container .component__options {
    padding-left: 14px;
    padding-bottom: 14px;
}
</style>