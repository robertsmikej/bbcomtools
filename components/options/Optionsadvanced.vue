<template>
    <div class="component__options component__options__advanced">
        <div v-for="(dropdown, index) in dropdowns" :key="dropdown.name" class="component__options__advanced--cards component__options--drop-down">
            <p>{{ dropdown.name }}</p>
            <Dropdownoptions :componentData="componentData" :dropdown="dropdown" :index="index"/>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        componentData: Object,
        dropdowns: Array
    },
    methods: {
        
    }
}
</script>

<style>
.component__options__advanced {
    background: #FFF;
    height: auto;
    padding: 10px;
    align-self: center;
    top: 10px;
}
.component__options__advanced--cards {
    background: #FFF;
    width: 100%;
}
</style>