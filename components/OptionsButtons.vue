<template>
    <div class="component__options__buttons">
        <div class="component__options--button" @click="checkNotBlank()">✔</div>
        <div class="component__options--button" @click="removeElement">X</div>
        <div class="component__options--button options__arrows" v-if="!componentData.vendorRestricted" @click="moveElementUp">▲</div>
        <div class="component__options--button options__arrows" v-if="!componentData.vendorRestricted" @click="moveElementDown">▼</div>
    </div>
</template>

<script>
export default {
    props: {
        componentData: Object
    },
    methods: {
        sendInfo() {
            let info = {
                componentData: this.componentData
            };
            this.$nuxt.$emit('sendComponentInfo', info);
            this.$nuxt.$emit("toggleOptions", info);
        },
        removeElement() {
            this.$nuxt.$emit('removeElement', this.componentData.uniqueName);
        },
        moveElementUp() {
            this.$nuxt.$emit('moveElementUp', this.componentData.uniqueName);
        },
        moveElementDown() {
            this.$nuxt.$emit('moveElementDown', this.componentData.uniqueName);
        },
        checkNotBlank: function (t) {
            let elData = this.componentData.elementData;
            console.log(elData);
            for (let e in elData) {
                let el = elData[e];
                if (el.length <= 0) {
                    console.log("Element Has Empty Field, Are You Sure You Want To Continue?");
                } else {
                    this.sendInfo();
                }
            }
        }
    }
}
</script>

<style>
    .component__options__buttons {
        width: auto;
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
    }
    .component__options--button {
        width: 24px;
        height: 24px;
        margin: 5px;
        background: #FFF;
        border: 1px solid var(--bb-grey);
        border-radius: 50%;
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        text-transform: uppercase;
        color: var(--bb-grey);
        font-weight: 900;
        cursor: pointer;
        align-self: center;;
    }
</style>