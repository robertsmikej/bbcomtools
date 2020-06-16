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
                    v-for="(element, index) in componentData.newElementData.childArr"
                    :key="componentData.uniqueName + element.uniqueName + index"
                    :is="element.componentName"
                    :group="true"
                    :componentData="element"
                    :parentData="componentData"
                    :type="element.type ? element.type : null"
                    :data-component-number="index"
                    :data-idnum="componentData.uniqueName + element.uniqueName + index"
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
                // console.log(component);
                that.elementComponents = component;
                let componentDetails = component.types.filter(obj => {
                    return obj.type === type.type
                })[0];
                // console.log(componentDetails);
                componentDetails.componentName = component.componentName;
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
        // console.log(this.componentData.newElementData);
        this.numberOfComponents = this.componentData.newElementData.childArr.length
    },
    methods: {
        addComponent(comp) {
            // console.log(this.componentData);
            // console.log(comp);
            let newComponentData = this.componentData;
            // console.log(newComponentData);
            let compname = this.componentData.componentName;
            // console.log(this.componentData);
            let component = this.components.filter(obj => {
                return obj.componentName === compname
            })[0];
            let componentDetails = this.elementComponents.types.filter(obj => {
                return obj.type === comp.type
            })[0];
            let newArr = [];
            newComponentData.newElementData.childArr.forEach(function (obj) {
                newArr.push(obj);
            });
            // console.log(component);
            // console.log(componentDetails);
            let newInnerCompObj = {};
            for (let c in componentDetails.elementData.listItems) {
                let innerDetail = componentDetails.elementData.listItems[c];
                let type = Object.keys(innerDetail)[0];
                newInnerCompObj[type] = {
                    type: type,
                    text: innerDetail[type]
                };
            }
            let newInnerComponent = {
                componentName: componentDetails.componentName,
                uniqueName: this.componentData.uniqueName,
                number: this.numberOfComponents + 1,
                type: componentDetails.type,
                elementData: this.componentData.elementData,
                newElementData: {
                    listItems: newInnerCompObj
                },
                optionsShown: true,
                componentChanges: 0
            };
            // console.log(newComponentData);
            // console.log(newComponentData.newElementData);
            // console.log(newComponentData.newElementData.listItems);
            newArr.push(newInnerComponent);
            newComponentData.newElementData.childArr = newArr;
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