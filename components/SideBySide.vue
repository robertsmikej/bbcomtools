<template>
    <div class="side__by__side component__outer component__outer--max-width">
        <div class="side__by__side__image__container">
            <div class="component__options" v-if="!componentData.optionsHidden">
                <input v-model="componentData.componentData.imgSrc" class="text__input" type="text" placeholder="Image URL"/>
                <OptionsButtons :componentData="componentData"/>
            </div>
            <img :src="componentData.componentData.imgSrc" :alt="componentData.componentData.headerText" class="side__by__side__image"  @click="checkOptions"/>
        </div>
        <div class="side__by__side__text__container">
            <div class="side__by__side__text__para">
                <div class="component__options" v-if="!componentData.optionsHidden">
                    <input v-model="componentData.componentData.headerText" class="text__input" type="text" placeholder="Header Text"/>
                    <OptionsButtons :componentData="componentData"/>
                </div>
                <div class="component__wrap" @click="checkOptions">
                    <h4 class="side__by__side__header">{{ componentData.componentData.headerText }}</h4>
                </div>
            </div>
            <div class="side__by__side__text__para">
                <div class="component__options" v-if="!componentData.optionsHidden">
                    <textarea v-model="componentData.componentData.paraText" class="text__input" type="text" placeholder="Paragraph Text"/>
                    <OptionsButtons :componentData="componentData"/>
                </div>
                <div class="component__wrap" @click="checkOptions">
                    <p>{{ componentData.componentData.paraText }}</p>
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
        width: 100%;
        padding: 5px;
    }
    .side__by__side__image__container {
        float: right;
        max-width: 46%;
        padding-left: 5px;
    }
    .side__by__side__image {
        width: 100%;
    }
    .side__by__side__header {
        width: 100%;
        text-align: left;
        font-size: 1.5em;
        line-height: 1.5em;
        margin: 0 0 10px;
    }
    .side__by__side__para {
        font-size: 1em;
        line-height: 1em;
        margin: 10px 0;
    }
</style>