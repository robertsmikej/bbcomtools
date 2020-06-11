<template>
    <div class="page__component component__wrap page__component--max-width">
        <!-- <div 
            v-if="!componentData.optionsHidden"
            class="component__options component__options--individual component__options--para"
        >
            <textarea
                v-model="componentData.elementData.paraText"
                :style="'min-height: ' + componentData.optionsMinHeight[0] + ';'" 
                class="js__options__input page__para"
                @keyup="checkHeight()"
                type="text"
            />
            <Optionsbuttons :componentData="componentData"/>
        </div> -->
        <p
            class="page__para site__element"
            contenteditable
            @blur="onEdit"
            @keydown.enter="endEdit"
        >
            {{ componentData.elementData.paraText }}
        </p>
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
.component__options--para {
    margin-top: 16px;
    margin-bottom: -16px;
}
</style>