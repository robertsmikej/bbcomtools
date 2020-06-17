<template>
    <div class="page__component">
        <component
            :is="componentData.type"
            @blur="updateTarget"
            @focus="focused"
            data-type="headerText"
            contenteditable 
            class="page__header site__element"
            v-html="componentData.newElementData.listItems.headerText.text"
        ></component>
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
    computed: {
        getComponentData: function () {
            return this.componentData
        }
    },
    mounted: function () {

    },
    methods: {
        updateTarget() {
            let newComponentData = this.componentData;
            if (event.target.getAttribute("data-type").toLowerCase() === "li") {
                let newLi = {li: event.target.innerHTML.trim()};
                newComponentData.newElementData.listItems.listItems[event.target.getAttribute("data-component-list-number")] = newLi;
            } else {
                newComponentData.newElementData.listItems[event.target.getAttribute("data-type")].text = event.target.innerHTML.trim();
                newComponentData.componentChanges += 1;
            }
            let info = {
                newComponentData: newComponentData,
            };
            this.$nuxt.$emit("updateTarget", info);
        },
        focused(e) {
            console.log(this.componentData);
            // document.execCommand('selectAll', false, null);
        },
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