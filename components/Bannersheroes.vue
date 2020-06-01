<template>
    <a href="https://www.google.com" class="page__banner">
        <div class="page__banner__inner">
            <div class="page__banner__image__container">
                <div class="component__options" v-if="!componentData.optionsHidden">
                    <textarea v-model="componentData.elementData.imgSrc" class="text__input" type="text" placeholder="Background Image URL"/>
                    <Optionsbuttons :componentData="componentData"/>
                </div>
                <div class="component__wrap" @click="checkOptions">
                    <img :src="componentData.elementData.imgSrc" :alt="componentData.elementData.headerText" class="banner__image site__element"/>
                </div>
            </div>
            <div class="page__banner__text__container">
                <div class="page__banner__text">
                    <div class="component__options" v-if="!componentData.optionsHidden">
                        <input v-model="componentData.elementData.header_1" class="text__input" type="text" placeholder="Header Text - Line 1"/>
                        <input v-model="componentData.elementData.header_2" class="text__input" type="text" placeholder="Header Text - Line 2"/>
                        <input v-model="componentData.elementData.header_3" class="text__input" type="text" placeholder="Header Text - Line 3"/>
                        <input v-model="componentData.elementData.paraText" class="text__input" type="text" placeholder="Paragraph Text"/>
                        <Optionsbuttons :componentData="componentData"/>
                    </div>
                    <div class="component__wrap" @click="checkOptions">
                        <h2 class="page__banner__header site__element">
                            <span>{{ componentData.elementData.header_1 }}</span>
                            <span>{{ componentData.elementData.header_2 }}</span>
                            <span>{{ componentData.elementData.header_3 }}</span>
                        </h2>
                        <p class="page__banner__para site__element">{{ componentData.elementData.paraText }}</p>
                    </div>
                </div>
            </div>
        </div>
    </a>
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
        checkOptions(e) {
            let info = {
                componentData: this.componentData
            };
            this.$nuxt.$emit("toggleOptions", info);
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