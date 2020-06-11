<template>
    <div class="page__component">
        <component 
            :is="componentData.type" 
            @input="onEdit($event)"
            contenteditable 
            class="site__element"
        >
            {{ componentData.elementData.headerText }}
        </component>
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
.page__header--h1,
.page__header--h2,
.page__header--h3,
.page__header--h4,
.page__header--h5,
.page__header--h6 {
    cursor: pointer;
}
.page__header--h1,
.page__header--h2,
.page__header--h3,
.page__header--h4,
.page__header--h5,
.page__header--h6 {
    width: 100%;
    word-wrap: break-word;
    font-family: ProximaNova, "Proxima Nova", 'Helvetica Neue', arial, sans-serif;
    text-align: left;
    margin: 16px 0 4px;
    cursor: pointer;
}
.page__header--h1 {
    font-size: 36px;
    font-weight: 700;
}
.page__header--h2 {
    font-size: 1.8em;
    line-height: 1em;
    font-weight: 600;
    letter-spacing: -0.5px;
}
.page__header--h3 {
    font-size: 1.6em;
    line-height: 1em;
    font-weight: 600;
}
.page__header--h4 {
    font-size: 1.6em;
    line-height: 1em;
    font-weight: 300;
}
.page__header--h5 {
    font-size: 1.6em;
    line-height: 1em;
    font-weight: 300;
}
.page__header--h6 {
    font-size: 1.6em;
    line-height: 1em;
    font-weight: 300;
}
.page__header--h1--builder,
.page__header--h2--builder,
.page__header--h3--builder,
.page__header--h4--builder,
.page__header--h5--builder,
.page__header--h6--builder {
    /* margin-bottom: 0; */
    margin: 0;
}

</style>