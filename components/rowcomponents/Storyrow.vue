<template>
    <div class="page__component">
        <div
            :data-component-type="componentData.componentName"
            class="page__story__row__outer" 
            :class="[this.componentData.optionsShown ? 'page__component__outline' : 'page__component__no__outline' ]"
        >
            <div 
                v-if="componentData.optionsShown"
                class="component__options__buttons__outer component__remove"
            >
                <Optionsbuttons
                    :componentData="componentData"
                    :groupParent="true"
                />
                <div
                    class="component__options__buttons--group"
                >
                    <div v-for="(component, index) in this.groupButtons" :key="component.type + index">
                        <div 
                            @click="addComponent(component)"
                            :component-name="component.componentName"
                            :component-type="component.type ? component.type : null"
                            class="component__options--clicker"
                        >
                            <img
                                v-if="component.img.length > 0"
                                :src="'/imgs/' + component.img"
                                class="create__element__img"/>
                            <p 
                                v-if="component.img.length === 0"
                                class="create__element__para"
                            >
                                {{ component.title }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div
                :key="componentActions"
                :style="gridStyle"
                class="page__story__row"
            >
                <component
                    v-for="(element, index) in componentData.elementData.childArray"
                    :key="componentData.uniqueName + element.uniqueName + index"
                    :is="element.componentName"
                    :group="true"
                    :componentData="element"
                    :parentData="componentData"
                    :type="element.type ? element.type : null"
                    :data-component-number="index"
                    :data-idnum="componentData.uniqueName + element.uniqueName + index"
                    :class="componentData.uniqueName + '--' + element.uniqueName"
                    class="page__group__component"
                ></component>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        type: String,
        componentData: Object
    },
    data() {
        return {
            numberOfComponents: 0,
            componentActions: 0,
            elementComponents: {},
            currentComponentName: "",
            restrictions: [],
            groupButtons: []
        };
    },
    computed: {
        components: function () {
            return this.$store.state.components
        },
        componentOptionsShow: function () {
            // let arr = [];
            // let types = JSON.parse(JSON.stringify(this.componentData.elementData.childArray));
            // let that = this;
            // types.forEach(type => {
            //     let component = this.components.filter(obj => {
            //         return obj.componentName === type.componentName
            //     })[0];
            //     this.elementComponents = component;
            //     let componentDetails = component.types.filter(obj => {
            //         return obj.type === type.type
            //     })[0];
            //     componentDetails.componentName = component.componentName;
            //     this.groupButtons.push(componentDetails);
            //     // arr.push(componentDetails);
            // });
            // console.log(this.groupButtons);
            // return arr;
        },
        gridStyle() {
            return {
                gridTemplateColumns: `repeat( ${ this.numberOfComponents }, minmax(80px, 1fr))`
            }
        }
    },
    created() {
        this.$nuxt.$on('updateGroupTarget', data => {
            console.log(data);
            if (data.parentData.uniqueName.indexOf(this.componentData.uniqueName) >= 0) {
                let newComponentData = JSON.parse(JSON.stringify(this.componentData));
                let clickedItem = this.getClickedItem(data.event, data.oldComponentData, newComponentData.elementData.childArray);
                if (clickedItem >= 0) {
                    let textsToGrab = this.$el.querySelectorAll(".page__group__component")[clickedItem].querySelectorAll("[data-input-type]");
                    let components = Array.from(textsToGrab).forEach(element => {
                        let textType = element.getAttribute("data-input-type");
                        newComponentData.elementData.childArray[clickedItem].elementData[textType] = element.innerHTML.trim();
                    });
                    newComponentData.componentChanges += 1;
                    let info = {
                        newComponentData: newComponentData
                    };
                    this.$nuxt.$emit("updateTarget", info);
                }
            }
        });
        this.$nuxt.$on('removeElementFromGroup', data => {
            if (data.parentData.uniqueName.indexOf(this.componentData.uniqueName) >= 0) {
                let newComponentData = JSON.parse(JSON.stringify(this.componentData));
                this.currentComponentName = data.uniqueName;
                if (data.componentIndex >= 0) {
                    newComponentData.elementData.childArray.splice(data.componentIndex, 1);
                    let info = {
                        newComponentData: newComponentData
                    };
                    this.numberOfComponents = newComponentData.elementData.childArray.length;
                    this.$nuxt.$emit('updateTarget', info);
                    this.componentActions += 1;
                }
            }
        });
        this.$nuxt.$on('moveElementUpGroup', data => {
            if (data.parentData.uniqueName.indexOf(this.componentData.uniqueName) >= 0) {
                let newComponentData = JSON.parse(JSON.stringify(this.componentData));
                this.currentComponentName = data.uniqueName;
                if (data.componentIndex >= 0) {
                    this.arrayMove(newComponentData.elementData.childArray, data.componentIndex, data.componentIndex - 1);
                    let info = {
                        newComponentData: newComponentData
                    }
                    this.numberOfComponents = newComponentData.elementData.childArray.length;
                    this.$nuxt.$emit('updateTarget', info);
                    this.componentActions += 1;
                }
            }
        });
        this.$nuxt.$on('moveElementDownGroup', data => {
            if (data.parentData.uniqueName.indexOf(this.componentData.uniqueName) >= 0) {
                let newComponentData = JSON.parse(JSON.stringify(this.componentData));
                this.currentComponentName = data.uniqueName;
                if (data.componentIndex >= 0) {
                    this.arrayMove(newComponentData.elementData.childArray, data.componentIndex, data.componentIndex + 1);
                    let info = {
                        newComponentData: newComponentData
                    }
                    this.numberOfComponents = newComponentData.elementData.childArray.length;
                    this.$nuxt.$emit('updateTarget', info);
                    this.componentActions += 1;
                }
            }
        });
    },
    mounted() {
        this.componentData.elementData.childArr.forEach(type => {
            let component = this.components.filter(obj => {
                return obj.componentName === type.componentName
            })[0];
            this.elementComponents = component;
            let componentDetails = component.types.filter(obj => {
                return obj.type === type.type
            })[0];
            componentDetails.componentName = component.componentName;
            this.groupButtons.push(componentDetails);
        });
        this.numberOfComponents = this.componentData.elementData.childArr.length;
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
        getClickedItem(event, oldData, newData) {
            let clickedItem = -1;
            this.componentData.elementData.childArray.forEach((arrChild, index) => {
                if (arrChild === oldData) {
                    clickedItem = index;
                }
            });
            return clickedItem;
        },
        getNewListItems(event) {
            let newListItems = event.target.closest(".site__element").getElementsByTagName("li");
            let newLiArr = Array.from(newListItems).map(function (li) {
                return {
                    li: li.innerHTML
                }
            });
            return newLiArr;
        },
        addComponent(comp) {
            let newComponentData = JSON.parse(JSON.stringify(this.componentData));
            let compname = this.componentData.componentName;
            let comptype = this.componentData.type;
            let component = this.components.filter(obj => {
                return obj.componentName === compname
            })[0];
            let componentDetails = this.elementComponents.types.filter(obj => {
                return obj.type === comp.type
            })[0];
            let newChildComponent = {
                componentName: componentDetails.componentName,
                uniqueName: this.componentData.uniqueName + "-" + componentDetails.uniqueName + this.numberOfComponents,
                number: this.numberOfComponents + 1,
                type: componentDetails.type,
                elementData: componentDetails.elementData,
                optionsShown: true,
                componentChanges: 0
            };
            newComponentData.elementData.childArray.push(newChildComponent);
            let info = {
                newComponentData: newComponentData
            };
            this.$nuxt.$emit("updateTarget", info);
            this.numberOfComponents += 1;
            this.componentActions += 1;
        },
        arrayMove: function (arr, fromIndex, toIndex) {
            var element = arr[fromIndex];
            arr.splice(fromIndex, 1);
            arr.splice(toIndex, 0, element);
        },
        checkRestricted: function (name) {
            return this.restrictions.includes(name);
        },
        findInArray: function (data) {
            if (data.uniqueName === this.currentComponentName) {
                return data.uniqueName === this.currentComponentName;
            }
        },
        optionsToggle() {
            let info = {
                componentData: this.componentData
            };
            this.$nuxt.$emit("toggleOptions", info);
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

</style>