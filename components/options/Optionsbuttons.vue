<template>
    <div class="component__options__buttons component__remove">
        <div
            @click="moveElementUp"
            @mouseover="toggleTooltip('uparrow')"
            @mouseleave="toggleTooltip('uparrow')"
            v-if="!componentData.vendorRestricted && !group"
            class="component__options--button options__arrows options__up"
        >
            <img src="~/static/imgs/left-arrow.png" class="options__arrow__img"/>
            <Tooltip
                :key="toolTipShows"
                v-show="showTooltips.uparrow"
                :tip="tooltips.uparrow"
            />
        </div>
        <div
            @click="moveElementUpGroup()"
            @mouseover="toggleTooltip('uparrow')"
            @mouseleave="toggleTooltip('uparrow')"
            v-if="!componentData.vendorRestricted && group"
            class="component__options--button options__arrows options__left"
        >
            <img src="~/static/imgs/left-arrow.png" class="options__arrow__img"/>
            <Tooltip
                v-show="showTooltips.uparrow"
                :tip="tooltips.uparrow"
            />
        </div>
        <div
            @click="moveElementDown()"
            @mouseover="toggleTooltip('downarrow')"
            @mouseleave="toggleTooltip('downarrow')"
            v-if="!componentData.vendorRestricted && !group"
            class="component__options--button options__arrows options__down"
        >
            <img src="~/static/imgs/left-arrow.png" class="options__arrow__img"/>
            <Tooltip
                v-show="showTooltips.downarrow"
                :tip="tooltips.downarrow"
            />
        </div>
        <div
            @click="moveElementDownGroup()"
            @mouseover="toggleTooltip('downarrow')"
            @mouseleave="toggleTooltip('downarrow')"
            v-if="!componentData.vendorRestricted && group"
            class="component__options--button options__arrows options__right"
        >
            <img src="~/static/imgs/left-arrow.png" class="options__arrow__img"/>
            <Tooltip
                v-show="showTooltips.downarrow"
                :tip="tooltips.downarrow"
            />
        </div>
        <div
            @click="removeElement()"
            @mouseover="toggleTooltip('remove')"
            @mouseleave="toggleTooltip('remove')"
            v-if="!group" 
            class="component__options--button options__remove"
        >
            X
            <Tooltip
                v-show="showTooltips.remove"
                :tip="tooltips.remove"
            />
        </div>
        <div 
            @click="removeElementFromGroup()"
            @mouseover="toggleTooltip('remove')"
            @mouseleave="toggleTooltip('remove')"
            v-if="group" 
            class="component__options--button options__remove"
        >
            X
            <Tooltip
                v-show="showTooltips.remove"
                :tip="tooltips.remove"
            />
        </div>
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
    data() {
        return {
            showTooltips: {},
            toolTipShows: 0
        }
    },
    computed: {
        tooltips: function () {
            return this.$store.state.tooltips
        }
    },
    created() {
        for (let t in this.tooltips) {
            this.showTooltips[this.tooltips[t].slug] = false;
        }
    },
    methods: {
        toggleTooltip(name) {
            setTimeout(() => { 
                this.showTooltips[name] = !this.showTooltips[name];
                this.toolTipShows += 1;
            }, 500);
        },
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
            this.$nuxt.$emit('removeElement', this.componentData.uniqueName);
        },
        removeElementFromGroup() {
            let info = {
                event: event,
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
                event: event,
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
                event: event,
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