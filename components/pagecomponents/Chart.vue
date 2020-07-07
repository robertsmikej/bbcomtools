<template>
  <div class="page__component">
    <div
      data-input-types="['chart']"
      data-input-type="chart"
      :data-component-type="componentData.componentName"
      class="page__chart site__element component__wrapper"
    >
        <div 
        v-for="(chartRow, index) in chartRows"
        :data-list-item-number="index"
        :key="componentData.uniqueName + index"
        class="chart__row"
        >
          <div
          v-for="(row,index) in chartRow.row" 
          :key="index"
          data-input-type="row"
          class="chart__item"
                  >
             <span
             v-for="(span, index) in row"
             :key="index"
             contenteditable
            @blur="updateTarget()"
            @keydown.enter="enterPressed"
            class="chart__item__span"
             >
             {{span}}
             </span>
                  </div>
      
                  <div
                v-if="componentData.optionsShown"
                class="component__options__buttons component__remove"
            >
                <div @click="updateTarget('addChartRow')" class="component__options--button">+</div>
                <div @click="updateTarget('deleteChartRow')" class="component__options--button">X</div>
                </div>
                </div>
    </div>
                <!-- <Optionsbuttons
            v-if="componentData.optionsShown"
            :componentData="componentData"
        /> -->
  </div>
</template>

<script>
export default {
    props: {
        type: String,
        componentData: Object,
        group: Boolean,
        items: Object
    },
    computed: {
      chartRows() {
          return this.componentData.elementData.chartRows;
      }
    },
    methods: {
        updateTarget(action, pasted) {
            let newComponentData = JSON.parse(JSON.stringify(this.componentData));
            if (newComponentData.uniqueName === this.componentData.uniqueName) {
                newComponentData.componentChanges += 1;
                let info = {
                    newComponentData: newComponentData,
                    event: event,
                    action: action,
                };
                this.$nuxt.$emit("updateTarget", info);
            }
        }

    }
}
</script>

<style>
.chart__row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  max-width: 750px;
}
.chart__row:nth-of-type(1) .chart__item:nth-of-type(1) {
  background-color: transparent;
  color: black;
}
.chart__row .chart__item:nth-of-type(1) {
  background-color: #00aeef;
  color: white
}
.chart__row:nth-of-type(1n + 2) .chart__item:nth-of-type(1n + 2) {
    background-color: rgb(230, 230, 230);
}
.chart__item {
  text-align: center;
  padding: 10px 0;
  margin:0 2px ;
}
.page__chart {
  width: 95%
}
</style>