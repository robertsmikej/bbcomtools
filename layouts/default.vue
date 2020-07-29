<template>
    <div class="page__container">
        <Nav/>
        <nuxt/>
    </div>
</template>


<style>
    :root {
        --site-h1-size: 36px;
        --site-h2-size: 30px;
        --site-h3-size: 26px;
        --site-h4-size: 22px;
        --site-h5-size: 18px;
        --site-h6-size: 14px;

        --site-white: #FFF;
        --site-grey: #919191;
        --site-grey-dark: #232323;
        --site-grey-very-light: #F9F9F9;
        --site-blue: #00aeef;
        --site-blue-dark: #1A3D7A;
        --site-green: #62bd19;
        --site-font: ProximaNova, "Proxima Nova", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        --font-bold: ProximaNovaExCnSemiBold, ProximaNova, "Proxima Nova", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
    .page__type--product {
        max-width: 760px;
    }
    .page__type--marketing {
        /* max-width: 1200px; */
    }
    .container {
        width: 100%;
        display: flex;
        flex-direction: row;
        /* flex-wrap: wrap; */
        justify-content: flex-start;
        align-items: flex-start;
        padding: 40px 0 0;
    }

    .component__generator .built__elements__wrapper {
        padding-left: 100px;
    }
    .element__bar {
        width: 100px;
        height: calc(100vh - 40px);
        display: flex;
        flex-direction: column;
        align-content: center;
        align-items: center;
        justify-content: flex-start;
        position: fixed;
        /* top: 40px; */
        left: 0;
        background: #202128;
        padding: 0;
        border: 1px solid var(--site-blue-dark);
        border-left: none;
        border-bottom: none;
        box-sizing: border-box;
        z-index: 3;
        position: relative;
    }
    .element__bar__section {
        width: 100%;
        height: 100%;
        z-index: 3;
        position: relative;
    }
    .element__bar__section--header__container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: flex-start;
        z-index: 2;
        cursor: pointer;
        color: #FFF;
        padding: 6px 2px;
        border-bottom: 1px solid #FFF;
        z-index: 3;
        position: relative;
        background-color: #202128;
    }
    .element__bar__section--header--img {
        max-width: 40px;
        margin: 0 auto 6px;
        display: block;
    }
    .element__bar__section--content__container {
        transition: all .3s;
        flex-direction: row;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 100px;
        background: #F3F3F3;
        width: 200px;
        height: 100vh;
        padding:  0 10px;
        z-index: 0;
        border-right: 1px solid #202128;
    }
    /* .element__bar__section:hover + .element__bar__section--content__container {
        left: 100px;
    } */
    .element__bar__spacer {
        width: 100%;
        height: 100%;
        z-index: 3;
        position: relative;
        background-color: #202128;
    }
    .page__type--marketing {
        padding: 0;
    }
    .page__type__buttons {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: center;
        align-items: center;
        justify-content: center;
        margin-right: auto;
        width: 100%;
        margin: 10px auto;
    }
    .bar__headers__container {
        width: 100%;
        text-align: left;
        position: relative;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-content: center;
        justify-content: center;
    }
    .bar__headers__container h5 {
        width: auto;
        text-align: left;
        color: #202128;
    }
    .bar__button {
        width: 100%;
        border: 1px solid var(--site-blue-dark);
        background: var(--site-blue-dark);
        margin: 0 0 4px;
        padding: 4px;
        color: #232323;
        background-color: #FFF;
        text-align: center;
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;
        justify-content: center;
        font-size: 1em;
        line-height: 1em;
        text-transform: uppercase;
        cursor: pointer;
        border-radius: 3px;
        align-self: center;
        transition: all .3s;
    }
    .bar__button:hover,
    .container .page__type--selected {
        background-color: var(--site-blue-dark);
        color: #FFF;
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

    .component__container {
        position: relative;
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
    }
    .component__options--right {
        right: 10px;
        left: auto;
        width: auto;
    }
    .options__editable__bottom {
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 2px 5px;
        z-index: 3;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: flex-start;
        align-items: center;
        justify-content: center;
        opacity: 1;
    }
    .options__editable__container {
        width: 100%;
        border: 1px solid #232323;
        
        background: #FFF;
        position: relative;
    }
    .options__editable {
        width: 100%;
        padding: 3px;
        word-break: break-all;
        font-size: 12px;
    }

    .component__options__advanced {

    }
    span.options__description {
        font-size: 12px;
        margin: 0;
        padding: 1px 4px 0 5px;
        background: #FFF;
        text-align: right;
        display: block;
        position: absolute;
        bottom: 0;
        right: 0;
        border: 1px solid #232323;
        border-bottom: none;
        border-right: none;
    }
    .component__options input, .component__options textarea {
        flex: 1;
        border: 1px solid var(--site-grey-very-light);
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


    /* .component__options__buttons__outer {
        width: 100%;
        display: none;
        flex-direction: row;
        flex-wrap: nowrap;
        align-content: center;
        justify-content: flex-start;
        align-items: center;
        position: absolute;
        top: 16px;
        right: 0;
        z-index: 3;
    } */
    
    .component__options__buttons, .component__options__buttons--chartcolumn   {
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
        padding: 1px 0;
        opacity: 0;
        transition: all .4s;
    }
    .page__component:hover .component__options__buttons, .page__component:hover .component__options__buttons--chartcolumn, .page__component:hover .component__options__buttons--chartrow {
        opacity: 1;
    }
    .component__options__buttons--chartrow {
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
        top: 50%;
        right: 0;
        transform: translate(-6px, -50%);
        padding: 1px 0;
        border: 1px solid lightgray;
        opacity: 0; 
    }
        .component__options__buttons--hide{
        display: none !important;
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
        padding: 1px 0;
        opacity: 0; 
    }
    /* .component__options__buttons:hover, .component__options__buttons--chartrow:hover {
       opacity: 1;
    } */
    .chart__row:nth-child(n + 2) .component__options__buttons--chartrow {
        /* display: none; */
    }
    .component__options--button {
        width: 16px;
        height: 16px;
        margin: 2px 5px;
        background: #FFF;
        border-radius: 50%;
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: center;
        align-items: center;
        font-size: 15px;
        text-transform: uppercase;
        color: var(--site-grey);
        font-weight: 900;
        cursor: pointer;
        align-self: center;
        position: relative;
    }
    .component__options--button--chart {
        width: 16px;
        height: 16px;
        background: #FFF;
        border-radius: 50%;
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: center;
        align-items: center;
        font-size: 15px;
        text-transform: uppercase;
        color: var(--site-grey);
        font-weight: 900;
        cursor: pointer;
        align-self: center;
        position: relative;
    }
    .component__options--clicker {
        margin: 2px 5px;
        background: #FFF;
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        text-transform: uppercase;
        color: var(--site-grey);
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
    .component__options__buttons img {
        max-width: 18px;
    }
    .component__options__buttons .options__up img {
        transform: rotate(-90deg);
    }
    .component__options__buttons .options__down img {
        transform: rotate(90deg);
    }
    .page__story__row .component__options__buttons .options__left img {
        transform: rotate(180deg);
    }


    .code__section {
        width: 90%;
        max-width: 1000px;
        height: auto;
        max-height: 1200px;
        margin: auto auto 10px;
        padding: 15px 15px 4px 15px;
        border: 1px solid #232323;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 3;
        background: #FFF;
    }
    .code__text__area {
        width: 100%;
        height: 80vh;
        max-height: 600px;
    }
    .code__commands {
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;
        justify-content: center;
    }
    .code__command {
        width: 100px;
        margin: 5px;
        padding: 6px 8px;
        border: 1px solid var(--site-blue-dark);
        border-radius: 4px;
        text-transform: uppercase;
        font-size: 1em;
        line-height: 1em;
        cursor: pointer;
        text-align: center;
        transition: all .3s;
    }
    .code__command:hover {
        background-color: var(--site-blue-dark);
        color: var(--site-white);
    }
</style>
