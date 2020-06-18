<template>
    <div class="component__options__buttons component__remove">
        <div class="component__options--button options__arrows options__up" v-if="!componentData.vendorRestricted && !group" @click="moveElementUp()">▲
             <span class="options__up--text">Move Up</span>
        </div>
        <div class="component__options--button options__arrows" v-if="!componentData.vendorRestricted && group" @click="moveElementUpGroup()">▲</div>
        <div class="component__options--button options__arrows options__down" v-if="!componentData.vendorRestricted && !group" @click="moveElementDown()">▼
             <span class='options__down--text'>Move Down</span>
        </div>
        <div class="component__options--button options__arrows" v-if="!componentData.vendorRestricted && group" @click="moveElementDownGroup()">▼</div>
        <div v-if="!group" class="component__options--button options__remove" @click="removeElement()">X
            <span class="options__remove--text">Remove</span>
        </div>
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
    .options__up, .options__down, .options__remove {
         position: relative;

    }
    .options__up--text, .options__down--text, .options__remove--text {
        display: none;
        width: 120px;
        background-color: black;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 5px 0;
        position: absolute;
        z-index: 1;
        bottom: 150%;
        left: 50%;
        margin-left: -60px;
    }
    .options__up--text::after, .options__down--text::after, .options__remove--text::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: black transparent transparent transparent;
    }
    .options__up:hover .options__up--text, .options__down:hover .options__down--text, .options__remove:hover .options__remove--text  {
        display: inline;

    }
</style>