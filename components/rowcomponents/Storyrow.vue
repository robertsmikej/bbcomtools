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
                        <div @click="addComponent(component.type)" :component-name="component.componentName" :component-type="component.type ? component.type : null" class="component__options--clicker">
                            <img class="create__element__img" v-if="component.img.length > 0" :src="'/imgs/' + component.img"/>
                            <p class="create__element__para" v-if="component.img.length === 0">{{ component.title }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div
                @click="optionsTrue"
                :key="rowElements.componentActions"
                :style="gridStyle"
                class="page__story__row"
            >
                <component v-for="element in rowElements.elements" :key="element.uniqueName" :is="element.componentName" :group="true" :componentData="element" :type="element.type ? element.type : null" :class="componentData.uniqueName + '--' + element.uniqueName"></component>
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
        addComponent(type) {
            let componentDetails = this.elementComponents.types.filter(obj => {
                return obj.type === type
            })[0];
            let newNumber = this.rowElements.numberOfComponents;
            let newComponent = {
                componentName: this.elementComponents.componentName,
                uniqueName: this.elementComponents.componentName + newNumber,
                parentUniqueName: this.componentData.uniqueName,
                parentData: this.componentData,
                number: newNumber,
                type: type,
                elementData: componentDetails.elementData,
                optionsShown: true,
                targetInputIndex: 0,
                alreadyCreated: false,
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