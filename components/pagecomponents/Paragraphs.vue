<template>
    <div class="page__component">
        <p
            @input="onEdit($event); optionsTrue();"
            contenteditable
            class="page__para site__element"
        >
            {{ componentData.elementData.paraText }}
        </p>
        <Optionsbuttons
            v-if="componentData.optionsShown"
            :componentData="componentData"
        />
    </div>
</template>

<script>
export default {
    props: {
        type: String,
        componentData: Object,
        group: Boolean
    },
    mounted: function () {
        let els = this.$el.querySelectorAll(".site__element");
        els.forEach((element, index) => {
            element.setAttribute("data-component-number", index);
        });
    },
    methods: {
        onEdit(event){
            let info = {
                componentData: this.componentData,
                update: event.target.innerHTML.trim(),
                componentIndex: event.target.getAttribute("data-component-number")
            };
            this.$nuxt.$emit("updateTarget", info);
        },
        optionsTrue() {
            let info = {
                componentData: this.componentData,
                optionsBool: true
            };
            this.$nuxt.$emit("optionsChange", info);
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