<template>
  <div class="page__component">
    <component
            :is="componentData.type"
            @blur="updateTarget"
            @focus="focused"
            data-input-types="['chartRows']"
            data-input-type="chartRows"
            :data-component-type="componentData.componentName"
            contenteditable
            v-html="componentData.elementData.chartRows"
            class="page__chart site__element"
    >
            <Optionsbuttons
            v-if="componentData.optionsShown"
            :componentData="componentData"
        />
    </component>
  </div>
</template>

<script>
export default {
    props: {
        type: String,
        componentData: Object,
        group: Boolean,
        subgroup: Boolean,
        parentData: Object,
        items: Object
    },
    computed: {
      chartRows() {
                    if (this.items) {
                return this.items.elementData.chartRows;
            } else {
                return this.componentData.elementData.chartRows;
            }
      }
    }
}
</script>

<style>

</style>