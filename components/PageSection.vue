<template>
    <div class="page__section" :key="elements.numberOfComponents">
        <component :is="element.name" :datas="element" v-for="element in elements.elements" :key="element.number" :type="element.type ? element.type : null">{{ element }}</component>
    </div>
</template>

<script>
export default {
    props: {
        elements: Object
    },
    data() {
        return {
            
        };
    },
    methods: {
        
    }
}
</script>

<style>
    .page__section {
        
    }
</style>
