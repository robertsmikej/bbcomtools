<template>
    <div :href="componentData.elementData.bannerLink" class="page__banner page__component component--to-link">
        <div class="page__banner__inner component__container">
            <div class="page__banner__image__container">
                <div class="component__options component__options--bottom" v-if="!componentData.optionsHidden && showBackgroundURLOption">
                    <textarea 
                        v-model="componentData.elementData.backgroundImg.desktop" 
                        class="text__input" 
                        type="text" 
                        placeholder="Background Image URL"
                    />
                    <Optionsbuttons :componentData="componentData"/>
                </div>
                <picture class="page__banner__image" :key="componentData.elementData.desktop">
                    <source :srcset="componentData.elementData.backgroundImg.desktop" media="(min-width: 768px)">
                    <img :src="componentData.elementData.backgroundImg.mobile" :alt="componentData.elementData.headerText" class="page__banner__image"/>
                </picture>
            </div>
            <div class="page__banner__text__container">
                <div class="component__options component__options--stacked" v-if="!componentData.optionsHidden">
                    <input
                        v-model="componentData.elementData.header_1"
                        class="text__input"
                        type="text"
                        placeholder="Header Text - Line 1"
                    />
                    <input
                        v-model="componentData.elementData.header_2"
                        class="text__input"
                        type="text"
                        placeholder="Header Text - Line 3"
                    />
                    <input
                        v-model="componentData.elementData.header_3"
                        class="text__input"
                        type="text"
                        placeholder="Header Text - Line 3"
                    />
                    <input
                        v-model="componentData.elementData.disclaimerText"
                        class="text__input"
                        type="text"
                        placeholder="Disclaimer Text"
                    />
                    <Optionsbuttons :componentData="componentData"/>
                </div>
                <Optionsadvanced 
                    :componentData="componentData"
                    :dropdowns="componentData.elementData.dropdowns"
                    v-if="!componentData.optionsHidden"
                    class="component__options--right component__options--stacked"
                />
                <h2 @click="checkOptions" :style="{'color': this.componentData.elementData.textColor.code}" class="page__banner__header" >
                    <span>{{ componentData.elementData.header_1 }}</span>
                    <span>{{ componentData.elementData.header_2 }}</span>
                    <span>{{ componentData.elementData.header_3 }}</span>
                </h2>
                <p @click="checkOptions" class="page__banner__disclaimer">{{ componentData.elementData.disclaimerText }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        type: String,
        componentData: Object,
        group: Boolean
    },
    data() {
        return {
            selectedBackground: "",
            showBackgroundURLOption: true
        };
    },
    computed: {

    },
    methods: {
        grabTexts(els) {
            let newObj = {};
            let listArr = [];
            Array.from(els).forEach(element => {
                let textType = element.getAttribute("data-input-type");
                if (element.nodeName === "IMG") {
                    newObj[textType] = element.closest(".page__external__data__container").querySelector(".options__editable").textContent.trim();
                } else if (element.nodeName === "LI") {
                    listArr.push({li: element.innerHTML.trim()});
                } else {
                    newObj[textType] = element.innerHTML.trim();
                }
            });
            if (listArr.length > 0) {
                newObj.listItems = listArr
            }
            return newObj;
        },
        updateTarget(event, newListItems) {
            let newComponentData = JSON.parse(JSON.stringify(this.componentData));
            if (newComponentData.componentName.toLowerCase() === "list" || 
            newComponentData.componentName.toLowerCase() === "imageheaderpara") {
                if (newListItems) {
                    this.numberOfListActions += 1;
                    newComponentData.elementData.listItems = newListItems;
                    this.numberOfListActions += 1;
                } else {
                    Object.assign(newComponentData.elementData.listItems, this.getNewListItems(event));
                }
            } else {
                let textsToGrab = this.grabTexts(this.$el.querySelectorAll("[data-input-type]"));
                Object.assign(newComponentData.elementData, textsToGrab);
            }
            let info = {
                newComponentData: newComponentData,
                oldComponentData: this.componentData
            };
            if (!this.group && !this.subgroup) {
                this.$nuxt.$emit("updateTarget", info);
            } else if (this.subgroup) {
                this.$nuxt.$emit("updateSubGroupList", newComponentData.elementData.listItems);
            } else {
                info.parentData = this.parentData;
                this.$nuxt.$emit("updateGroupTarget", info);
            }
            newComponentData.componentChanges += 1;
        },
        checkHeight(e) {
            this.$nuxt.$emit("changeHeight", this.componentData);
        },
        checkOptions(e) {
            let info = {
                componentData: this.componentData
            };
            this.$nuxt.$emit("toggleOptions", info);
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
</style>