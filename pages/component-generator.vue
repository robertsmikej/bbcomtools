<template>
    <section class="container">
        <div class="element__bar">
            <div class="bar__buttons page__type__buttons">
                <h4>Type Of Page</h4>
                <div class="bar__button" :class="pageType === 'product' ? 'page__type--selected' : 'page__type--not-selected'" @click="changePageType">Product</div>
                <div class="bar__button" :class="pageType === 'marketing' ? 'page__type--selected' : 'page__type--not-selected'" @click="changePageType">Marketing</div>
            </div>
            <div class="element__sections">
                <div class="element__section" v-for="(section, index) in components" :key="'section' + section.title + index">
                    <!-- <h4>{{ section.title }}</h4> -->
                    <div class="create__element__cell" @click="createComponent" :component-name="component.componentName" :component-type="component.type ? component.type : null" v-for="component in section.types" :key="component.type + clickedElements.numberOfSections">
                        <img class="create__element__img" v-if="component.img.length > 0" :src="'/' + component.img"/>
                        <p class="create__element__para" v-if="component.img.length === 0">{{ component.title }}</p>
                    </div>
                </div>
            </div>
            <div class="bar__buttons">
                <div class="bar__button" @click="buildImportCode">Code</div>
            </div>
        </div>
        <div class="built__elements__wrapper">
            <div class="built__elements__wrapper__inner bb__content__outer" :class="'page__type--' + pageType">
                <h2 class="page__type__header" v-if="pageType === 'product'">Product Overview</h2>
                <div class="bb__content" @:removeElement="removeElement($event)" :key="pageActions" :class="'page__type--' + pageType">
                    <component :is="element.name" :componentData="element" v-for="element in clickedElements.elements" :key="element.uniqueName" :type="element.type ? element.type : null"></component>
                </div>
            </div>
        </div>
        <div class="code__section" v-if="showCode">
            <textarea class="code__text__area" name="code" :value="code"></textarea>
            <div class="code__commands">
                <div @click="copyText" class="code__command">Copy</div>
                <div @click="clearCode" class="code__command">Clear</div>
                <div @click="toggleCode" class="code__command">Close</div>
                <div @click="importCode" class="code__command">Import</div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            page: {
                header_text: "Components"
            },
            components: {
                Headers: {
                    title: "text headers",
                    types: {
                        "H1": {
                            title: "H1",
                            componentName: "Headers",
                            type: "H1",
                            defaultData: {
                                headerText: "H1 New"
                            },
                            img: ""
                        },
                        "H2": {
                            title: "H2",
                            componentName: "Headers",
                            type: "H2",
                            defaultData: {
                                headerText: "H2 New"
                            },
                            img: ""
                        },
                        "H3": {
                            title: "H3",
                            componentName: "Headers",
                            type: "H3",
                            defaultData: {
                                headerText: "H3 New"
                            },
                            img: ""
                        },
                        "H4": {
                            title: "H4",
                            componentName: "Headers",
                            type: "H4",
                            defaultData: {
                                headerText: "H4 New"
                            },
                            img: ""
                        },
                        "H5": {
                            title: "H5",
                            componentName: "Headers",
                            type: "H5",
                            defaultData: {
                                headerText: "H5 New"
                            },
                            img: ""
                        },
                        "H6": {
                            title: "H6",
                            componentName: "Headers",
                            type: "H6",
                            defaultData: {
                                headerText: "H6 New"
                            },
                            img: ""
                        }
                    }
                },
                Paragraphs: {
                    title: "paragraphs",
                    types: {
                        "p": {
                            title: "P",
                            componentName: "Paragraphs",
                            type: "p",
                            defaultData: {
                                headerText: "Paragraph New"
                            },
                            img: "paragraph.png"
                        }
                    }
                },
                List: {
                    title: "list",
                    types: {
                        "list": {
                            title: "List",
                            componentName: "List",
                            type: "list",
                            defaultData: {
                                listItems: {
                                    1: "New List Item 1",
                                    2: "New List Item 2"
                                }
                            },
                            img: "list.png"
                        }
                    }
                },
                Spacer: {
                    title: "spacers",
                    types: {
                        "small": {
                            title: "S",
                            componentName: "Spacer",
                            type: "small",
                            defaultData: {
                                headerText: "S New"
                            },
                            img: ""
                        },
                        "medium": {
                            title: "M",
                            componentName: "Spacer",
                            type: "medium",
                            defaultData: {
                                headerText: "M New"
                            },
                            img: ""
                        },
                        "large": {
                            title: "L",
                            componentName: "Spacer",
                            type: "large",
                            defaultData: {
                                headerText: "L New"
                            },
                            img: ""
                        },
                        "extralarge": {
                            title: "XL",
                            componentName: "Spacer",
                            type: "extralarge",
                            defaultData: {
                                headerText: "XL New"
                            },
                            img: ""
                        }
                    }
                },
                SideBySide: {
                    title: "Side By Side",
                    types: {
                        "sidebyside": {
                            title: "SideBySide",
                            componentName: "SideBySide",
                            type: "sidebyside",
                            defaultData: {
                                listItems: {
                                    headerText: "SBS New",
                                    paraText: "Test Para",
                                    imgSrc: "",
                                    imgAlt: ""
                                }
                            },
                            img: ""
                        }
                    }
                },
                Videos: {
                    title: "Videos",
                    types: {
                        "VideoJW": {
                            title: "VideoJW",
                            componentName: "Videos",
                            type: "VideoJW",
                            defaultData: {
                                videoCode: ""
                            },
                            img: ""
                        }
                    }
                }
            },
            clickedElements: {
                numberOfSections: 0,
                numberOfComponents: 0,
                elements: []
            },
            pageActions : 0,
            currentComponentName: "",
            showCode: false,
            code: "",
            pageType: "product"
        }
    },
    created() {
        this.$nuxt.$on('toggleOptions', data => {
            let uniqueName = data.componentData.uniqueName;
            this.currentComponentName = uniqueName;
            let findIn = this.clickedElements.elements.findIndex(this.findInArray);
            this.clickedElements.elements[findIn].optionsHidden = !this.clickedElements.elements[findIn].optionsHidden;
            this.pageActions += 1;
        });
        this.$nuxt.$on('sendComponentInfo', data => {
            let uniqueName = data.componentData.uniqueName;
            this.currentComponentName = uniqueName;
            let findIn = this.clickedElements.elements.findIndex(this.findInArray);
            this.clickedElements.elements[findIn] = data.componentData;
            this.pageActions += 1;
        });
        this.$nuxt.$on('removeElement', data => {
            if (this.clickedElements.elements && data) {
                this.currentComponentName = data;
                let findIn = this.clickedElements.elements.findIndex(this.findInArray);
                this.clickedElements.elements.splice(findIn, 1);
                this.clickedElements.numberOfComponents -= 1;
                this.clickedElements.numberOfSections -= 1;
            }
        });
        this.$nuxt.$on('moveElementUp', data => {
            this.currentComponentName = data;
            let findIn = this.clickedElements.elements.findIndex(this.findInArray);
            this.arrayMove(this.clickedElements.elements, findIn, findIn - 1);
        });
        this.$nuxt.$on('moveElementDown', data => {
            this.currentComponentName = data;
            let findIn = this.clickedElements.elements.findIndex(this.findInArray);
            this.arrayMove(this.clickedElements.elements, findIn, findIn + 1);
        });
    },
    methods: {
        arrayMove: function (arr, fromIndex, toIndex) {
            var element = arr[fromIndex];
            arr.splice(fromIndex, 1);
            arr.splice(toIndex, 0, element);
        },
        findInArray: function (data) {
            return data.uniqueName === this.currentComponentName;
        },
        createComponent: function (e, name) {
            let newNumber = this.clickedElements.numberOfComponents;
            let compname = e.currentTarget.getAttribute("component-name");
            let comptype = e.currentTarget.getAttribute("component-type");
            // console.log(compname);
            // console.log(comptype);
            // console.log(this.components);
            // console.log(this.components[compname]);
            // console.log(this.components[compname].types[comptype]);
            let newComponent = {
                name: compname,
                uniqueName: compname + newNumber,
                number: newNumber,
                type: e.currentTarget.getAttribute("component-type"),
                elementData: {},
                defaultData: this.components[compname].types[comptype].defaultData,
                optionsHidden: false,
                alreadyCreated: false
            };
            this.clickedElements.numberOfComponents += 1;
            this.clickedElements.numberOfSections += 1;
            this.pageActions += 1;
            this.clickedElements.elements.push(newComponent);
        },
        buildImportCode: function () {
            let code = this.$el.querySelector(".bb__content");
            let codeCopy = code.cloneNode(true);
            codeCopy.querySelectorAll(".component__options").forEach(function (opt) {
                opt.parentNode.removeChild(opt);
            });
            codeCopy.querySelectorAll(".component__wrap").forEach(function (wrap) {
                wrap.outerHTML = wrap.innerHTML;
            });
            codeCopy.querySelectorAll(".component__remove").forEach(function (opt) {
                opt.parentNode.removeChild(opt);
            });
            codeCopy = codeCopy.outerHTML.replace(/\<!---->/g, "").replace(/\s+/g, ' ');
            this.code = codeCopy;
            this.showCode = true;
        },
        toggleCode: function () {
            this.showCode = !this.showCode;
            if (this.showCode === false) {
                this.code = "";
            }
        },
        clearCode: function () {
            this.code = "";
        },
        copyText: function () {
            let text = this.$el.querySelector(".code__text__area");
            text.focus();
            text.select();
            document.execCommand('copy');
        },
        importCode: function () {
            let code = this.$el.querySelector(".code__text__area").value;
            let codeDiv = document.createElement("div");
            codeDiv.innerHTML = code;
            let elements = codeDiv.querySelectorAll(".component__wrap");
            let clickedElements = this.clickedElements;
            let number = clickedElements.numberOfComponents;
            let components = this.components;
            let actions = 0;
            clickedElements.elements = [];
            clickedElements.numberOfComponents = 0;
            clickedElements.numberOfSections = 0;
            this.pageActions = 0;
            let newArr = [];
            if (elements.length > 0) {
                elements.forEach(function (e) {
                    let el = e.childNodes[0];
                    let name = e.getAttribute("data-component-name");
                    let type = e.getAttribute("data-component-type");
                    let data = e.getAttribute("data-component-data");
                    let dataName = e.getAttribute("data-component-data-name");
                    let newComponent = {
                        "name": name,
                        "uniqueName": name + number,
                        "number": number,
                        "type": type,
                        "componentData": {
                            "elementData": {
                                dataName: data
                            }
                        },
                        "defaultData": components[name].types[type].defaultData,
                        "optionsHidden": false,
                        "alreadyCreated": false
                    };
                    actions += 1;
                    newArr.push(newComponent);
                });
            }
            clickedElements.elements = newArr;
            clickedElements.numberOfComponents += actions;
            clickedElements.numberOfSections += actions;
            this.pageActions += actions;
        },
        changePageType: function (e) {
            this.pageType = e.target.innerHTML.toLowerCase();
        }
    }
}
</script>

<style>
    .element__bar {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;
        justify-content: center;
        position: sticky;
        top: 0px;
        left: 0;
        background: #FFF;
        padding: 4px 4px 4px 4px;
        border: 1px solid #232323;
    }
    .element__sections {
        flex: 1;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: flex-start;
        justify-content: center;
    }
    .element__section {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: center;
        justify-content: center;
        border-right: 1px solid #232323;
        padding: 0 0;
        flex: 0 1 auto;
    }
    .element__section h4 {
        text-transform: capitalize;
        align-self: center;
        margin: 0 5px;
        width: 100%;
    }
    .create__element__cell {
        width: auto;
        min-width: 30px;
        border-radius: 4px;
        text-align: center;
        padding: 2px;
        margin: 5px;
        cursor: pointer;
    }
    .create__element__img {
        max-width: 20px;
        max-height: 20px;
    }
    .create__element__para {
        font-size: .9em;
        line-height: .9em;
        text-align: center;
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
        border: 1px solid #232323;
        border-radius: 4px;
        text-transform: uppercase;
        font-size: 1em;
        line-height: 1em;
        cursor: pointer;
        text-align: center;
    }

    .page__type__buttons {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: center;
        align-items: center;
        justify-content: center;
        margin-right: auto;
        width: 260px;
    }
    .page__type__buttons h4 {
        width: 100%;
    }
    .bar__button {
        width: 120px;
        background: #232323;
        margin: 4px;
        padding: 8px;
        color: #FFF;
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
    }
    .page__type--selected {
        border: 1px solid #232323;
        background: #FFF;
        color: #232323;
    }

    .page__type__header {
        width: 100%;
        margin: 0 0 20px;
        color: #303030;
        font: 600 30px/1.1 ProximaNovaExCnSemiBold,Arial,sans-serif;
        text-transform: uppercase;
        border-bottom: 1px solid #c8c8c8;
        background-color: #FFF;
    }

    .build__code__button {
        position: relative;
        margin-left: auto;
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
        padding: 0 6px;
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
    .list__items {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-content: flex-start;
        align-items: flex-start;
        justify-content: flex-start;
    }
    .list__item {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;
        justify-content: center;
    }
</style>