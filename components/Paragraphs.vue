<template>
    <div class="page__paras page__component page__component--max-width">
        <div class="component__wrap component__container">
            <div 
                v-if="!componentData.optionsHidden"
                class="component__options component__options--individual"
            >
                <textarea
                    v-model="componentData.elementData.paraText"
                    :style="'min-height: ' + componentData.optionsMinHeight[0] + ';'" 
                    class="js__options__input page__para"
                    @keyup="checkHeight()" 
                    type="text"
                />
                <Optionsbuttons :componentData="componentData"/>
            </div>
            <p 
                @click="checkOptions"
                v-if="type === 'p'"
                style="white-space: pre-line;"
                class="page__para site__element"
            >
                {{ componentData.elementData.paraText }}
            </p>
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