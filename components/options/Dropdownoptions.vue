<template>
    <select v-model="selected" @change="checkDropdownOption" :name="dropdown.name" :id="dropdown.name">
        <option v-for="o in dropdown.data" :key="o.name" :value="o.name">{{ o.name }}</option>
    </select>
</template>

<script>
export default {
    props: {
        componentData: Object,
        dropdown: Object,
        index: Number
    },
    data() {
        return {
            selected: this.dropdown.data[0].name
        };
    },
    methods: {
        checkDropdownOption(e) {
            let info = {
                dropdown: this.dropdown,
                selected: this.selected,
                index: this.index,
                componentData: this.componentData
            };
            this.$nuxt.$emit("toggleDropdown", info);
        }
    }
}
</script>

<style>

</style>