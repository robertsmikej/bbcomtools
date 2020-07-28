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
                <!-- <div
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
                </div> -->
            </div>
            <div
                :key="componentData.uniqueName + componentData.componentChanges"
                :style="gridStyle"
                class="page__story__row"
            >
                <component
                    v-for="(element, index) in componentData.elementData.children"
                    :key="componentData.uniqueName + element.componentName + index"
                    :is="element.componentName"
                    :componentData="element"
                    :parentData="componentData"
                    :type="element.type ? element.type : null"
                    :data-component-number="index"
                    :componentNumber="index"
                    :class="componentData.uniqueName + '--' + element.componentName + index"
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
    computed: {
        components: function () {
            return this.$store.state.components
        },
        gridStyle() {
            return {
                gridTemplateColumns: `repeat( ${ this.componentData.elementData.children.length }, minmax(80px, 1fr))`
            }
        }
    },
    mounted() {
        this.componentData.uniqueName = this.componentData.componentName + this.componentData.componentChanges;
        // console.log(this.componentData);
    },
    methods: {
        // getComponent(element) {
        //     let type = element.type;
        //     let name = element.componentName;
        //     let component = this.components.filter(obj => {
        //         return obj.componentName === element.componentName
        //     })[0];
        //     let componentDetails = component.types.filter(obj => {
        //         return obj.type === element.type
        //     })[0];
        //     componentDetails.uniqueName = this.componentData.uniqueName;
        //     componentDetails.hasInnerComponents = this.componentData.hasInnerComponents;
        //     componentDetails.optionsShown = this.componentData.optionsShown;
        //     componentDetails.componentChanges = this.componentData.componentChanges;
        //     return componentDetails;
        // }
    }
}
</script>

<style>

</style>