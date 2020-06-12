<template>
    <div class="page__component">
        <div class="page__story__row__outer" :class="[this.componentData.optionsShown ? 'page__component__outline' : 'page__component__no__outline' ]">
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
                    <div v-for="component in componentOptionsShow" :key="component.type" class="">
                        <div 
                            @click="addComponent(component.type)"
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
                :key="rowElements.componentActions"
                :style="gridStyle"
                class="page__story__row"
            >
                <component
                    v-for="element in rowElements.elements"
                    :key="element.uniqueName + element.componentChanges"
                    :is="element.componentName" 
                    :group="true" 
                    :componentData="element" 
                    :type="element.type ? element.type : null"
                    :class="componentData.uniqueName + '--' + element.uniqueName"
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
            elementComponents: {},
            currentComponentName: "",
            rowElements: {
                numberOfComponents: 0,
                componentActions: 0,
                elements: []
            },
            restrictions: []
        };
    },
    computed: {
        components: function () {
            return this.$store.state.components
        },
        componentOptionsShow: function () {
            let arr = [];
            let types = this.componentData.elementData.componentTypes;
            let that = this;
            types.forEach(function (type) {
                let component = that.components.filter(obj => {
                    return obj.componentName === type.componentName
                })[0];
                that.elementComponents = component;
                let componentDetails = component.types.filter(obj => {
                    return obj.type === type.type
                })[0];
                arr.push(componentDetails);
            });
            return arr;
        },
        gridStyle() {
            return {
                gridTemplateColumns: `repeat(${this.rowElements.numberOfComponents}, minmax(80px, 1fr))`
            }
        }
    },
    created() {
        this.$nuxt.$on('updateTargetGroup', data => {
            let uniqueName = data.newComponentData.uniqueName;
            this.currentComponentName = uniqueName;
            let findIn = this.rowElements.elements.findIndex(this.findInArray);
            this.rowElements.elements[findIn] = data.newComponentData;
            this.componentActions += 1;

            this.updateTarget(data);
        }),
        this.$nuxt.$on('removeElementFromGroup', data => {
            if (this.componentData.uniqueName === data.componentData.parentUniqueName) {
                this.currentComponentName = data.uniqueName;
                let findIn = this.rowElements.elements.findIndex(this.findInArray);
                this.rowElements.elements.splice(findIn, 1);
                this.rowElements.numberOfComponents -= 1;
                this.rowElements.componentActions -= 1;
            }
        });
        this.$nuxt.$on('moveElementUpGroup', data => {
            if (this.componentData.uniqueName === data.componentData.parentUniqueName) {
                this.currentComponentName = data.uniqueName;
                let findIn = this.rowElements.elements.findIndex(this.findInArray);
                this.arrayMove(this.rowElements.elements, findIn, findIn - 1);
            }
        });
        this.$nuxt.$on('moveElementDownGroup', data => {
            if (this.componentData.uniqueName === data.componentData.parentUniqueName) {
                this.currentComponentName = data.uniqueName;
                let findIn = this.rowElements.elements.findIndex(this.findInArray);
                this.arrayMove(this.rowElements.elements, findIn, findIn + 1);
            }
        });
    },
    methods: {
        updateTarget(passed) {
            let newComponentData = this.componentData;
            if (!passed) {
                if (event.target.getAttribute("data-type").toLowerCase() === "li") {
                    let newLi = {li: event.target.innerHTML.trim()};
                    newComponentData.newElementData.listItems.listItems[event.target.getAttribute("data-component-list-number")] = newLi;
                } else {
                    newComponentData.newElementData.listItems[event.target.getAttribute("data-type")].text = event.target.innerHTML.trim();
                    newComponentData.componentChanges += 1;
                }
            } else {
                for (let c in this.rowElements.elements) {
                    
                    if (this.rowElements.elements[c].uniqueName === passed.newComponentData.uniqueName) {
                        console.log(newComponentData);
                        newComponentData.rowElements.elements[c] = passed.newComponentData;
                        
                    }
                }

                
                console.log(this.rowElements.elements);
                console.log(passed.newComponentData);

            }
            let info = {
                newComponentData: newComponentData,
                event: event
            };
            if (!this.componentData.hasOwnProperty("parentData")) {
                console.log(info);
                this.$nuxt.$emit("updateTarget", info);
            } else {
                if (this.componentData.parentUniqueName) {
                    console.log(info);
                    this.$nuxt.$emit("updateTargetGroup", info);
                }
            }
            
        },
        addComponent(type) {
            let newNumber = this.rowElements.numberOfComponents;
            let componentDetails = this.elementComponents.types.filter(obj => {
                return obj.type === type
            })[0];
            componentDetails.newElementData = {};
            for (let d in componentDetails.elementData) {
                let dataPoint = componentDetails.elementData[d];
                let newData;
                // console.log(dataPoint)
                if (d === "listItems") {
                    newData = {
                        type: d,
                        listItems: componentDetails.elementData[d]
                    }
                    componentDetails.elementData[d].forEach(function (l) {
                        if (!l.hasOwnProperty("li")) {
                            for (let li in l) {
                                let newListData = {
                                    type: li,
                                    text: l[li]
                                }
                                newData[li] = newListData;
                            }
                        }
                    });
                } else {
                    newData = {
                        type: d,
                        text: dataPoint
                    }
                }
                componentDetails.newElementData[d] = newData;
            }
            
            // componentDetails.newElementData = {};
            let newComponent = {
                componentName: this.elementComponents.componentName,
                uniqueName: this.elementComponents.componentName + newNumber,
                parentUniqueName: this.componentData.uniqueName,
                parentData: this.componentData,
                number: newNumber,
                type: type,
                elementData: componentDetails.elementData,
                newElementData: componentDetails.newElementData,
                optionsShown: true,
                componentChanges: 0,
                vendorRestricted: this.checkRestricted("vendors")
            };
            this.rowElements.numberOfComponents += 1;
            this.rowElements.componentActions += 1;
            this.rowElements.elements.push(newComponent);
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
            return data.uniqueName === this.currentComponentName;
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