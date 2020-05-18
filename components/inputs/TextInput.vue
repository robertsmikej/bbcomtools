<template>
    
</template>

<script>
export default {
    props: {
        componentData: Object,
        text: String
    },
    data() {
        return {

        };
    },
    methods: {
        checkOptions() {
            let info = {
                componentData: this.componentData
            };
            this.$nuxt.$emit("toggleOptions", info);
        }
    }
}
</script>

<style>

</style>