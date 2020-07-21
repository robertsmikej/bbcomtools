<template>
    <nav>
        <h3>BB Tools</h3>
        <ul>
            <!-- <nuxt-link to="../vendors/newproduct">Vendor - New Prod</nuxt-link> -->
            <nuxt-link to="../pagebuilder">Page Builder</nuxt-link>
        </ul>
    </nav>
</template>

<script>
export default {
    props: {
        type: String,
        componentData: Object
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
    nav {
        width: 100vw;
        height: 40px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: center;
        align-items: center;
        justify-content: flex-start;
        background-color: var(--site-blue-dark);
        color: #FFF;
        padding: 10px 10px;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
    }
    nav h3 {
        text-align: left;
        margin: 0;
    }
    nav ul {
        margin: 6px 10px 6px auto;
        align-self: center;
        padding: 0 6px;
    }
    nav a {
        color: #FFF;
        margin: 3px 10px;
    }
</style>