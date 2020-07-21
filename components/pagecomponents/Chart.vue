<template>
    <div class="page__component">
        <div
            data-input-types="['chart']"
            :data-component-type="componentData.componentName"
            :class="'page__chart--' + inchesOrCM"
            class="page__chart page__chart--inches component__wrapper"
        >
            <div 
                v-for="(chartRow, parentIndex) in chartRows"
                :key="componentData.uniqueName + parentIndex"
                class="chart__row"
                :data-row-type="chartRow.type"
                :style="gridStyle"
            >
                <div
                    v-for="(row, rowIndex) in chartRow.row" 
                    :key="rowIndex"
                    class="chart__item"
                >
                    <div
                        contenteditable
                        @blur="updateTarget()"
                        class='chart__item__cell'
                        :data-cell-number="parentIndex + '-' + rowIndex"
                    >
                        {{row.text}}
                    </div>
                    <div
                        v-if="componentData.optionsShown"
                        v-show="rowIndex > 0"
                        class="component__options__buttons component__remove"
                    >
                        <div @click="updateTarget('addChartColumn')" class="component__options--button--chart">+</div>
                        <div @click="updateTarget('deleteChartColumn')" class="component__options--button--chart">X</div>
                    </div>
                </div>
                
                <div
                    v-if="componentData.optionsShown"
                    v-show="parentIndex > 0"
                    class="component__options__buttons--chartrow component__remove"
                >
                    <div @click="updateTarget('addChartRow')" class="component__options--button--chart">+</div>
                    <div @click="updateTarget('deleteChartRow')" class="component__options--button--chart">X</div>
                </div>
            </div>
        </div>
        <Optionsbuttons
            v-if="componentData.optionsShown"
            :componentData="componentData"
        />
        <div 
            class="page__chart__conversion__container"
        >
            <span
                @click="toggleInCm('inches')"
            >
                Inches
                </span>
             /  
            <span
                @click="toggleInCm('centimeters')"
            >
                Centimeters
            </span>
        </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            gridStyle: {
                gridTemplateColumns: `repeat(${this.componentData.elementData.chartRows[0].row.length}, 1fr)`,
            },
            inchesOrCM: "inches"
        }
    },
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
        updateTarget(action) {
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
        },
        toggleInCm(measurementType) {
            this.inchesOrCM = measurementType;
        }
    }
}
</script>

<style>
.chart__row {
    display: grid;
    max-width: 750px;
    position: relative;
    margin: 0 auto;
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
    margin:0 2px;
    position: relative;
}
.page__chart {
    width: 100%;
}
.page__chart.page__chart--inches .chart__row:nth-of-type(1n + 2) .chart__item__cell::after {
    content: '"';
    position: relative;
    right: 0;
    top: 0;
}
.page__chart.page__chart--centimeters .chart__row:nth-of-type(1n + 2) .chart__item__cell::after {
    content: 'cm';
    position: relative;
    right: 0;
    bottom: 0;
}
.page__chart.page__chart--inches .chart__row .chart__item:nth-of-type(1) .chart__item__cell::after,
.page__chart.page__chart--centimeters .chart__row .chart__item:nth-of-type(1) .chart__item__cell::after  {
    content: "";
}
.page__chart__conversion__container {
    position: absolute;
    bottom: -20px;
    right: 14px;
    text-align: right;
}
.page__chart__conversion__container span {
    font-size: 14px;
    line-height: 14px;
    cursor: pointer;
}
.page__chart__conversion__container span:hover {
    color: #00AEEF;
}
</style>