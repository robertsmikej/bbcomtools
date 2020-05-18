<template>
    <div class="component__options__buttons">
        <div class="component__options--button" @click="sendInfo">✔</div>
        <div class="component__options--button" @click="removeElement">X</div>
        <div class="component__options--button options__arrows" v-if="!componentData.vendorRestricted" @click="moveElementUp">↑</div>
        <div class="component__options--button options__arrows" v-if="!componentData.vendorRestricted" @click="moveElementDown">↓</div>
    </div>
</template>

<script>
export default {
    props: {
        componentData: Object
    },
    methods: {
        sendInfo(event) {
            let info = {
                componentData: this.componentData
            };
            console.log(this.componentData.elementData);
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
        }
    }
}
</script>

<style>
    .component__options__buttons {
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
    }
    .component__options--button {
        width: 40px;
        height: 40px;
        padding: 6px;
        margin: 5px;
        background: #232323;
        border-radius: 4px;
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: center;
        align-items: center;
        font-size: 1.1em;
        line-height: 1.1em;
        text-transform: uppercase;
        color: #FFF;
        font-weight: 900;
        cursor: pointer;
    }
</style>