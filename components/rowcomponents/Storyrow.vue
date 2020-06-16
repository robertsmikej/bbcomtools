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
                :key="componentData.newElementData.elements.componentActions"
                :style="gridStyle"
                class="page__story__row"
            >
                <component
                    v-for="(element, index) in componentData.newElementData.childArr"
                    :key="componentData.uniqueName + element.uniqueName + element.componentChanges"
                    :is="element.componentName"
                    :group="true"
                    :componentData="element"
                    :parentData="componentData"
                    :type="element.type ? element.type : null"
                    :data-component-number="index"
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
            numberOfComponents: 0,
            componentActions: 0,
            elementComponents: {},
            currentComponentName: "",
            restrictions: []        };
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
                gridTemplateColumns: `repeat( ${ this.numberOfComponents }, minmax(80px, 1fr))`
            }
        }
    },
    created() {
        // console.log(this.componentData);
        // console.log(this.componentData.newElementData);
        // console.log(this.componentData.newElementData.childArr);
        // this.componentData.newElementData.childArr.forEach(function (e) {
        //     console.log(e);
        // });

        this.$nuxt.$on('removeElementFromGroup', data => {
            if (data.componentData.uniqueName.indexOf(this.componentData.uniqueName) >= 0) {
                this.currentComponentName = data.uniqueName;
                let newParent = data.parentData;
                let findIn = data.parentData.newElementData.childArr.findIndex(this.findInArray);
                if (findIn !== -1) {
                    newParent.newElementData.childArr.splice(findIn, 1);
                    let info = {
                        newComponentData: newParent
                    };
                    this.numberOfComponents = newParent.newElementData.childArr.length;
                    this.$nuxt.$emit('updateTarget', info);
                    this.componentActions += 1;
                }
            }
        });
        this.$nuxt.$on('moveElementUpGroup', data => {
            if (data.componentData.uniqueName.indexOf(this.componentData.uniqueName) >= 0) {
                this.currentComponentName = data.uniqueName;
                let newParent = data.parentData;
                let findIn = data.parentData.newElementData.childArr.findIndex(this.findInArray);
                if (findIn !== -1) {
                    this.arrayMove(data.parentData.newElementData.childArr, findIn, findIn - 1);
                    let info = {
                        newComponentData: newParent
                    }
                    this.$nuxt.$emit('updateTarget', info);
                    this.componentActions + 1;
                }
            }
        });
        this.$nuxt.$on('moveElementDownGroup', data => {
            if (data.componentData.uniqueName.indexOf(this.componentData.uniqueName) >= 0) {
                this.currentComponentName = data.uniqueName;
                let newParent = data.parentData;
                let findIn = data.parentData.newElementData.childArr.findIndex(this.findInArray);
                if (findIn !== -1) {
                this.arrayMove(data.parentData.newElementData.childArr, findIn, findIn + 1);
                    let info = {
                        newComponentData: newParent
                    }
                    this.$nuxt.$emit('updateTarget', info);
                    this.componentActions += 1;
                }
            }
        });
    },
    mounted() {
        this.numberOfComponents = this.componentData.newElementData.childArr.length
    },
    methods: {
        addComponent(type) {
            // console.log(type);
            let newComponentData = this.componentData;
            let el = this.componentData.elementData.rowElements;
            let newNumber = this.numberOfComponents;
            let compname = this.componentData.componentName;
            // console.log(this.componentData);
            let component = this.components.filter(obj => {
                return obj.componentName === compname
            })[0];
            // console.log(component);
            let componentDetails = this.elementComponents.types.filter(obj => {
                return obj.type === type
            })[0];
            // console.log(componentDetails);
            
            // componentDetails.newElementData = {};
            // for (let d in componentDetails.elementData) {
            //     let dataPoint = componentDetails.elementData[d];
            //     let newData;
            //     // console.log(dataPoint)
            //     if (d === "listItems") {
            //         newData = {
            //             type: d,
            //             listItems: componentDetails.elementData[d]
            //         }
            //         componentDetails.elementData[d].forEach(function (l) {
            //             if (!l.hasOwnProperty("li")) {
            //                 for (let li in l) {
            //                     let newListData = {
            //                         type: li,
            //                         text: l[li]
            //                     }
            //                     newData[li] = newListData;
            //                 }
            //             }
            //         });
            //     } else {
            //         newData = {
            //             type: d,
            //             text: dataPoint
            //         }
            //     }
            //     componentDetails.newElementData[d] = newData;
            // }
            // console.log(componentDetails);
            // componentDetails.newElementData = {};
            
            
            // console.log(componentDetails);
            // console.log(componentDetails.elementData);
            let childArray = this.componentData.childArray;
            console.log(childArray);
            let newComponent = {
                componentName: this.componentData.componentName,
                uniqueName: this.componentData.uniqueName,
                number: this.componentData.number,
                type: this.componentData.type,
                elementData: this.componentData.elementData,
                childArray: childArray,
                newElementData: this.componentData.newElementData,
                optionsShown: true,
                componentChanges: 0,
                vendorRestricted: this.checkRestricted("vendors")
            };
            
            // console.log(newComponent);
            let info = {
                componentData: this.componentData,
                newComponentData: newComponent
            };

            // el.elements.push(newComponent);
            
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
            console.log(data.uniqueName);
            console.log(this.currentComponentName);
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