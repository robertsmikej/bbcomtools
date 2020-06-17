<template>
    <div class="page__component">
        <component
            :is="componentData.type"
            @blur="updateTarget"
            @focus="focused"
            data-type="headerText"
            contenteditable 
            v-html="componentData.newElementData.listItems.headerText.text"
            class="page__header site__element"
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
            let newComponentData = JSON.parse(JSON.stringify(this.componentData));
            if (event.target.getAttribute("data-type").toLowerCase() === "li") {
                let newLi = {li: event.target.innerHTML.trim()};
                let listItem = event.target.getAttribute("data-component-list-number");
                newComponentData.newElementData.listItems.listItems[listItem] = newLi;
            } else {
                let listType = event.target.getAttribute("data-type");
                newComponentData.newElementData.listItems[listType].text = event.target.innerHTML.trim();
                newComponentData.componentChanges += 1;
            }
            let info = {newComponentData: newComponentData};
            if (!this.componentData.hasOwnProperty("parentData")) {
                this.$nuxt.$emit("updateTarget", info);
            } else {
                if (this.componentData.parentUniqueName) {
                    this.$nuxt.$emit("updateTargetGroup", info);
                }
            }
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