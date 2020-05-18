<template>
    <div class="page__container">
        <nav>
            <h3>BBcom Tools</h3>
            <ul>
                <nuxt-link to="../vendors/newproduct">Vendor - New Prod</nuxt-link>
                <nuxt-link to="../component-generator">Component Generator</nuxt-link>
            </ul>
        </nav>
        <nuxt/>
    </div>
</template>


<style>
html {
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
        Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
}
*,
*:before,
*:after {
    box-sizing: border-box;
    margin: 0;
    transition: all .3s;
}
h1 {
    text-align: left;
}
h2 {
    text-align: left;
}
h3 {
    text-align: left;
}
.page__container {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: flex-start;
}
nav {
    width: 100vw;
    height: 40px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
    align-items: center;
    justify-content: flex-start;
    background-color: #313845;
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
}
.container {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 40px 0 0;
}

.built__elements__wrapper {
    width: 100%;
    padding-top: 30px;
    min-height: 90vh;
    background-color: #f9f9f9;
}
.built__elements__wrapper__inner {
    padding: 10px;
    width: auto;
}
.preview__content {
    width: 100%;
}

.component__edit__container {
    width: 100%;
    min-height: 50px;
}
.component__wrap {
    position: relative;
}
.component__options {
    min-height: 30px;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: flex-start;
    z-index: 1;
    padding: 0;
}
.component__outer--max-width {
    width: 100%;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
}
.component__options input {
    width: 100%;
    padding: 10px 10px;
    margin: 0 auto;
    font-size: 1em;
}
.component__options textarea {
    width: 100%;
    min-height: 100px;
    padding: 6px 10px;
    margin: 0 auto;
    font-size: 1.1em;
    line-height: 1.1em;
}
.component__options--border {
    border: 1px solid #232323;
}
.component__top__icon {
    position: absolute;
    top: 2px;
    right: 5px;
    cursor: pointer;
}

textarea {
    min-width: 300px;
    min-height: 60px;
}
</style>
