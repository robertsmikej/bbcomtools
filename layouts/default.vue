<template>
    <div class="page__container">
        <Nav/>
        <nuxt/>
    </div>
</template>


<style>
    :root {
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
        max-width: 1200px;
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
        padding: 3px 6px;
    }
    .site__selection--marketing {
        padding: 0;
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

    /* .component__generator .built__elements__wrapper {
        padding-left: 100px;
    } */
    .element__bar {
        width: 100px;
        min-width: 100px;
        height: 100%;
        max-height: calc(100vh - 40px);
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
        box-sizing: border-box;
        z-index: 3;
    }
    .element__bar__main__buttons {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-content: flex-start;
        justify-content: center;
    }
    .element__bar__section {
        width: 100%;
        height: 100%;
        z-index: 3;
        position: relative;
        display: flex;
        flex-direction: column;
        align-content: flex-start;
        justify-content: center;
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
        padding: 8px 2px;
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
        justify-content: flex-start;
        position: absolute;
        top: 0;
        left: 100px;
        background: #F3F3F3;
        width: 320px;
        height: calc(100vh - 40px);
        padding: 30px 6px;
        z-index: 0;
        border-right: 1px solid #202128;
    }
    /* .element__bar__section--header__container:hover + .element__bar__section--content__container {
        left: 100px;
    } */
    .element__bar__spacer {
        width: 100%;
        z-index: 3;
        position: relative;
        background-color: #202128;
    }


    
    .element__section {
        /* min-width: 46%;
        max-width: 100%; */
        flex: 1 1 auto;
        height: 56px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: center;
        justify-content: center;
        border: 1px solid #BFC1C5;
        margin: 0 4px 14px;
        position: relative;
    }
    .element__section__inner {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: center;
        justify-content: center;
    }
    .element__section__header {
        margin: 0 0 20px;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: flex-start;
        align-items: center;
    }
    .element__section__header h3 {
        width: auto;
        color: #202128;
        background-color: #F3F3F3;
        z-index: 1;
        margin: 0 8px 0 4px;
        white-space: nowrap;
    }
    .element__section__header hr {
        height: 1px;
        background-color: #202128;
        border: none;
        width: 100%;
        margin: 0 6px 0 0;
    }
    .bar__headers__container {
        width: auto;
        text-align: left;
        position: relative;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-content: center;
        justify-content: center;
        padding: 0 4px;
        position: absolute;
        top: -8px;
        left: 5px;
        background-color: #F3F3F3;
    }
    .bar__headers__container h5 {
        width: auto;
        color: #202128;
        text-transform: capitalize;
        text-align: left;
        white-space: nowrap;
    }
    .create__element__cell__outer {
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: flex-end;
        justify-content: center;
    }
    .site__button {
        min-width: 36px;
        height: 36px;
        border-radius: 4px;
        text-align: center;
        padding: 2px 5px;
        margin: 2px 3px;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-content: center;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        border: 1px solid #BFC1C5;
        background: #FFF;
        font-size: 13px;
        line-height: 13px;
        transition: all .3s;
    }
    .site__button--larger {
        width: 100px;
    }
    .site__button:hover {
        background-color: #FFF;
        box-shadow: 1px 1px 5px #BFC1C5 inset;
    }
    .site__selection--selected {
        box-shadow: 1px 1px 5px #555 inset;
    }
    .site__selection--not-selected {
        background-color: #FFF;
    }
    .build__code__buttons {
        width: 100%;
        margin: auto 0 10px;
    }
    .element__section .page__type--product,
    .element__section .page__type--marketing {
        background-color: #FFF;
        box-shadow: 1px 1px 5px #BFC1C5 inset;
    }
    .create__element__img {
        max-height: 24px;
    }
    .create__element__para {
        font-size: 13px;
        line-height: 13px;
        text-align: center;
    }



    [component-type="H1"] p {
        font-size: 32px;
        line-height: 1em;
    }
    [component-type="H2"] p {
        font-size: 28px;
        line-height: 1em;
    }
    [component-type="H3"] p {
        font-size: 25px;
        line-height: 1em;
    }
    [component-type="H4"] p {
        font-size: 22px;
        line-height: 1em;
    }
    [component-type="H5"] p {
        font-size: 18px;
        line-height: 1em;
    }
    [component-type="h6"] p {
        font-size: 14px;
        line-height: 1em;
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




    .built__elements__wrapper {
        width: 100%;
        padding-top: 30px;
        min-height: calc(100vh - 40px);
        background-color: #DDDFE3;
        padding-left: 100px;
    }
    .built__elements__wrapper__inner {
        width: auto;
        min-height: 90vh;
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
        line-height: 12px;
        margin: 0;
        padding: 1px 4px 1px 5px;
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
        background: #F3F3F3;
        border: 1px solid #232323;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 3;
    }
    .code__text__area {
        width: 100%;
        height: 80vh;
        max-height: 600px;
    }
    .code__commands {
        display: flex;
        flex-direction: column;
        align-content: center;
        align-items: center;
        justify-content: center;
    }
    .code__commands__container {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: center;
        align-items: center;
    }
    .code__command {
        width: 120px;
        padding: 3px 4px 4px;
    }
    .code__command:hover {
        background-color: #c8c8c8;
    }
</style>
