<template>
    <div class="side__by__side component__outer component__outer--max-width">
        <div class="side__by__side__inner">
            <div class="side__by__side__image__container side__by__side__container" >
                <div class="component__options component__options--group" v-if="!componentData.optionsHidden">
                    <textarea v-model="componentData.elementData.imgSrc" class="js__options__input" type="text" placeholder="Image URL"/>
                    <Optionsbuttons :componentData="componentData"/>
                </div>
                <img :src="componentData.elementData.imgSrc" :alt="componentData.elementData.headerText" @click="checkOptions" class="side__by__side__image"/>
            </div>
            <div class="side__by__side__text__container">
                <div class="side__by__side__text__header side__by__side__container">
                    <div class="component__options component__options--group" v-if="!componentData.optionsHidden">
                        <input v-model="componentData.elementData.headerText" class="js__options__input page__header--h4 page__header--h4--builder" type="text" placeholder="Header Text"/>
                        <Optionsbuttons :componentData="componentData"/>
                    </div>
                    <h4 class="page__header--h4 side__by__side__header" @click="checkOptions">{{ componentData.elementData.headerText }}</h4>
                </div>
                <div class="side__by__side__text__para side__by__side__container">
                    <div class="component__options component__options--group" v-if="!componentData.optionsHidden">
                        <textarea v-model="componentData.elementData.paraText" class="js__options__input page__para page__para--builder" type="text" placeholder="Paragraph Text"/>
                        <Optionsbuttons :componentData="componentData"/>
                    </div>
                    <p class="page__para" @click="checkOptions" style="white-space: pre-line;">{{ componentData.elementData.paraText }}</p>
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
    methods: {
        checkHeight(e) {
            this.$nuxt.$emit("changeHeight", this.componentData);
        },
        checkOptions() {
            let info = {
                componentData: this.componentData
            };
            this.$nuxt.$emit("toggleOptions", info);
        }
    }
}
</script>

<style>
.side__by__side {
    cursor: pointer;
}

/* .side__by__side__text__header,
.side__by__side__text__para {
    float: left;
} */
</style>