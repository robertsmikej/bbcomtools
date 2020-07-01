<template>
  <div class="page__component">
    <div v-for="(chartRow, index) in chartRows" 
    :key="componentData.uniqueName + index"
    >
    </div>
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