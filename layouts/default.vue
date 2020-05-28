<template>
    <div class="page__container">
        <Nav/>
        <nuxt/>
    </div>
</template>


<style>
    :root {
        --h1-size: 2.4em;
        --h2-size: 1.8em;
        --h3-size: 1.6em;
        --h4-size: 1.4em;
        --h5-size: 1.2em;
        --h6-size: 1em;

        --bb-white: #FFF;
        --bb-grey-very-light: #F9F9F9;
        --bb-grey-light: #919191;

        --bb-grey: #232323;
        --bb-blue: #00aeef;
        --bb-blue-dark: #1A3D7A;
        --bb-green: #62bd19;
        --font: ProximaNova, "Proxima Nova", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        --font-bold: ProximaNovaExCnSemiBold, ProximaNova, "Proxima Nova", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        --text-color: #2B373C;


    }
    html {
        font-family: var(--font);
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
    .page__container {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: flex-start;
        justify-content: flex-start;
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

    .container .page__type--selected {
        border: 1px solid #232323;
        background: #FFF;
        color: #232323;
    }

    .container .page__type__header {
        width: 100%;
        margin: 0 0 20px;
        color: #303030;
        font-weight: 600;
        font-size: 30px;
        line-height: 1em;
        font-family: var(--font-bold);
        text-transform: uppercase;
        border-bottom: 1px solid #c8c8c8;
        background-color: #FFF;
    }

    .build__code__button {
        position: relative;
        margin-left: auto;
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
    .component__outer--max-width {
        width: 100%;
        max-width: 1200px;
        margin-left: auto;
        margin-right: auto;
    }

    .component__options {
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: flex-start;
        z-index: 1;
        padding: 0;
        position: absolute;
        top: 0;
        right: 0;
    }
    
    .component__options {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-content: flex-start;
        align-items: center;
        justify-content: center;
    }
    .component__options--individual {
        
    }
    .component__options--group {

    }
    .component__options input, .component__options textarea {
        flex: 1;
        border: none;
        margin: 0;
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
</style>
