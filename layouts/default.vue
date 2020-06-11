<template>
    <div class="page__container">
        <Nav/>
        <nuxt/>
    </div>
</template>


<style>
    :root {
        --h1-size: 36px;
        --h2-size: 30px;
        --h3-size: 26px;
        --h4-size: 22px;
        --h5-size: 18px;
        --h6-size: 14px;

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

    .page__component {
        position: relative;
        width: 100%;
        height: 100%;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        align-content: flex-start;
        justify-content: flex-start;
    }
    .small__component {
        position: relative;
        width: 100%;
        height: 100%;
    }
    [contenteditable] {
        outline: 0px solid transparent;
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
        cursor: pointer;
    }
    .page__component--max-width {
        width: 100%;
        max-width: 1200px;
        margin-left: auto;
        margin-right: auto;
    }

    .component__options {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        padding: 0;
        z-index: 3;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-content: flex-start;
        align-items: center;
        justify-content: center;
        opacity: .5;
    }
    .component__options--bottom {
        bottom: -42px;
        height: auto;
        align-items: flex-end;
    }
    .component__options--left {
        left: 10px;
        right: auto;
        width: auto;
        /* translate: transform(); */
    }
    .component__options--right {
        right: 10px;
        left: auto;
        width: auto;
        /* translate: transform(); */
    }
    .options__editable__bottom {
        width: 100%;
        position: absolute;
        bottom: 30px;
        left: 0;
        padding: 5px;
        z-index: 3;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-content: flex-start;
        align-items: center;
        justify-content: center;
        opacity: 1;
        background: #FFF;
        word-break: break-all;
        border: 1px solid #232323;
    }
    
    .component__options__advanced {

    }
    .component__options input, .component__options textarea {
        flex: 1;
        border: 1px solid var(--bb-grey-light);
        box-sizing: content-box;
        z-index: 2;
        padding: 0;
    }
    .component__options--border {
        border: 1px solid #232323;
    }
    .component__options__list {
        /* top: 20px; */
        margin-top: 24px;
        align-items: flex-start;
    }
    .component__options--stacked {
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: center;
    }
    .component__options--stacked input {
        min-width: 280px;
    }

    .component__options__buttons__outer {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-content: center;
        justify-content: flex-start;
        align-items: center;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 3;
    }
    .component__options__buttons {
        width: auto;
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: center;
        align-items: center;
        margin: 0;
        flex: 0;
        background: #FFF;
        z-index: 1;
        position: absolute;
        top: 3px;
        right: 3px;
    }
    .component__options--button {
        width: 16px;
        height: 16px;
        margin: 2px 5px;
        background: #FFF;
        border: 1px solid var(--bb-grey);
        border-radius: 50%;
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        text-transform: uppercase;
        color: var(--bb-grey);
        font-weight: 900;
        cursor: pointer;
        align-self: center;
    }
    .component__options--clicker {
        margin: 2px 5px;
        background: #FFF;
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        text-transform: uppercase;
        color: var(--bb-grey);
        font-weight: 900;
        cursor: pointer;
        align-self: center;
    }
    .component__options__buttons--group {
        display: flex;
        flex-direction: row;
        align-content: flex-start;
        justify-content: flex-start;
    }
    .page__component__outline {
        border: 1px solid var(--bb-grey-light);
    }
</style>
