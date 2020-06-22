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
                    <div v-for="(component, index) in componentOptionsShow" :key="component.type + index">
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
            let types = this.componentData.elementData.childArray;
            let that = this;
            types.forEach(function (type) {
                let component = that.components.filter(obj => {
                    return obj.componentName === type.componentName
                })[0];
                that.elementComponents = component;
                let componentDetails = component.types.filter(obj => {
                    return obj.type === type.type
                })[0];
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
        this.$nuxt.$on('updateGroupTarget', data => {
            let newComponentData = JSON.parse(JSON.stringify(this.componentData));

            
            console.log(data);
            let clickedItem = this.getClickedItem(data.event, newListItems);
            console.log(clickedItem);

            
        });
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
        this.numberOfComponents = this.componentData.elementData.childArr.length
    },
    methods: {
        getNewListItems(event) {
            let newListItems = event.target.closest(".site__element").getElementsByTagName("li");
            let newLiArr = Array.from(newListItems).map(function (li) {
                return {
                    li: li.innerHTML
                }
            });
            return newLiArr;
        },
        getClickedItem(event, newListItems) {
            let clickedItem = -1;
            Array.from(newListItems).forEach((listItem, index) => {
                let liText = listItem.li.trim().toLowerCase();
                let eventText = event.target.closest(".component__wrapper").getElementsByTagName("li")[0].textContent.trim().toLowerCase();
                if (liText === eventText) {
                    clickedItem = index;
                }
            });
            return clickedItem;
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
                uniqueName: componentDetails.uniqueName + this.numberOfComponents,
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