<template>
  <div class="page__component">
    <div
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
      <div 
      v-for="(chartRow, index) in chartRows"
      :data-list-item-number="index"
      :key="componentData.uniqueName + index"
      class="component__wrapper"
      >
      
       
                      <span 
                    v-for="(span,index) in chartRow" 
                    :key="index"
                    @blur="updateTarget()"
                    @keydown.enter="enterPressed"
                    v-html="chartRows.span"
                    data-input-type="chartRows"
                    class="chart__item"
                    contenteditable
                ></span>
     
      </div>

    </div>
                <Optionsbuttons
            v-if="componentData.optionsShown"
            :componentData="componentData"
        />
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
    },
    methods: {
      updateTarget(event) {
        let newComponentData = JSON.parse(JSON.stringify(this.componentData));
        newComponentData.componentChanges += 1;
            if (newComponentData.uniqueName === this.componentData.uniqueName) {
        let info = {
            newComponentData: newComponentData
        };
        this.$nuxt.$emit("updateTarget", info);
            }
      },
      focused(e) {
        console.log(this.componentData);
      },
    }
}
</script>

<style>

</style>