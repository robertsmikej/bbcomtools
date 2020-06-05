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
        componentData: Object,
        type: String
    },
    methods: {
        sendInfo() {
            let info = {
                componentData: this.componentData
            };
            this.$nuxt.$emit("sendComponentInfo", info);
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
        checkNotBlank: function () {
            let elData = this.componentData.elementData;
            for (let e in elData) {
                let el = elData[e];
                if (el.length > 0) {
                    this.sendInfo();
                    return;
                }
            }
        }
    }
}
</script>

<style>
    
</style>