<template>
    <div class="component__options__buttons component__remove">
        <div class="component__options--button options__arrows" v-if="!componentData.vendorRestricted && !group" @click="moveElementUp()">▲</div>
        <div class="component__options--button options__arrows" v-if="!componentData.vendorRestricted && group" @click="moveElementUpGroup()">▲</div>
        <div class="component__options--button options__arrows" v-if="!componentData.vendorRestricted && !group" @click="moveElementDown()">▼</div>
        <div class="component__options--button options__arrows" v-if="!componentData.vendorRestricted && group" @click="moveElementDownGroup()">▼</div>
        <div v-if="!group" class="component__options--button" @click="removeElement()">X</div>
        <div v-if="group" class="component__options--button" @click="removeElementFromGroup()">X</div>
        <!-- <div class="component__options--button" v-if="!componentData.vendorRestricted && groupParent" @click="optionsToggle">✓</div> -->
    </div>
</template>

<script>
export default {
    props: {
        componentData: Object,
        type: String,
        group: Boolean,
        groupParent: Boolean,
        parentData: Object
    },
    methods: {
        optionsToggle() {
            let info = {
                componentData: this.componentData
            };
            this.$nuxt.$emit("toggleOptions", info);
        },
        removeElement() {
            let info = {
                componentData: this.componentData,
                uniqueName: this.componentData.uniqueName,
                componentIndex: event.target.getAttribute("data-component-number")
            };
            // this.$nuxt.$emit('updateTarget', info);
            this.$nuxt.$emit('removeElement', this.componentData.uniqueName);
        },
        removeElementFromGroup() {
            let info = {
                componentData: this.componentData,
                uniqueName: this.componentData.uniqueName,
                componentIndex: parseInt(event.target.closest(".page__component").getAttribute("data-component-number")),
                parentData: this.parentData
            };
            this.$nuxt.$emit('removeElementFromGroup', info);
        },
        moveElementUp() {
            this.$nuxt.$emit('moveElementUp', this.componentData.uniqueName);
        },
        moveElementUpGroup() {
            let info = {
                componentData: this.componentData,
                uniqueName: this.componentData.uniqueName,
                componentIndex: parseInt(event.target.closest(".page__component").getAttribute("data-component-number")),
                parentData: this.parentData
            };
            this.$nuxt.$emit('moveElementUpGroup', info);
        },
        moveElementDown() {
            this.$nuxt.$emit('moveElementDown', this.componentData.uniqueName);
        },
        moveElementDownGroup() {
            let info = {
                componentData: this.componentData,
                uniqueName: this.componentData.uniqueName,
                componentIndex: parseInt(event.target.closest(".page__component").getAttribute("data-component-number")),
                parentData: this.parentData
            };
            this.$nuxt.$emit('moveElementDownGroup', info);
        }
    }
}
</script>

<style>
    
</style>