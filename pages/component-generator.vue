<template>
    <section class="container component__generator">
        <div class="element__bar">
            <div class="bar__buttons page__type__buttons">
                <h4>Type Of Page</h4>
                <div class="bar__button" :class="pageType === 'product' ? 'page__type--selected' : 'page__type--not-selected'" @click="changePageType">Product</div>
                <div class="bar__button" :class="pageType === 'marketing' ? 'page__type--selected' : 'page__type--not-selected'" @click="changePageType">Marketing</div>
            </div>
            <div class="element__sections">
                <div class="element__section" v-for="(section, index) in components" :key="'section' + section.title + index">
                    <div class="element__section__inner" v-if="checkPageType(section)" :data-section-name="section.title">
                        <h4>{{ section.title }}</h4>
                        <div v-for="component in section.types" :key="component.type + clickedElements.numberOfSections" class="create__element__cell__outer">
                            <div @click="createComponent" :component-name="component.componentName" :component-type="component.type ? component.type : null" class="create__element__cell">
                                <img class="create__element__img" v-if="component.img.length > 0" :src="'/imgs/' + component.img"/>
                                <p class="create__element__para" v-if="component.img.length === 0">{{ component.title }}</p>
                            </div>
                        </div>
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
                    <component v-for="element in clickedElements.elements" :key="element.uniqueName" :is="element.name" :componentData="element" :type="element.type ? element.type : null"></component>
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
            clickedElements: {
                numberOfSections: 0,
                numberOfComponents: 0,
                elements: []
            },
            pageActions : 0,
            currentComponentName: "",
            showCode: false,
            code: "",
            pageType: "product",
            restrictions: []
        }
    },
    computed: {
        components: function () {
            return this.$store.state.components
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
        checkPageType: function (data) {
            return data.pageTypes.includes(this.pageType);
        },
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
            let newComponent = {
                name: compname,
                uniqueName: compname + newNumber,
                number: newNumber,
                type: e.currentTarget.getAttribute("component-type"),
                elementData: {},
                defaultData: this.components[compname].types[comptype].defaultData,
                optionsHidden: false,
                alreadyCreated: false,
                vendorRestricted: this.checkRestricted("vendors")
            };
            if (this.components[compname].types[comptype].defaultData) {
                for (let d in this.components[compname].types[comptype].defaultData) {
                    newComponent.elementData[d] = this.components[compname].types[comptype].defaultData[d];
                }
            }
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
            // let code = this.$el.querySelector(".code__text__area").value;
            // let codeDiv = document.createElement("div");
            // codeDiv.innerHTML = code;
            // let elements = codeDiv.querySelectorAll(".component__wrap");
            // let clickedElements = this.clickedElements;
            // let number = clickedElements.numberOfComponents;
            // let components = this.components;
            // let actions = 0;
            // clickedElements.elements = [];
            // clickedElements.numberOfComponents = 0;
            // clickedElements.numberOfSections = 0;
            // this.pageActions = 0;
            // let newArr = [];
            // if (elements.length > 0) {
            //     elements.forEach(function (e) {
            //         let el = e.childNodes[0];
            //         let name = e.getAttribute("data-component-name");
            //         let type = e.getAttribute("data-component-type");
            //         let data = e.getAttribute("data-component-data");
            //         let dataName = e.getAttribute("data-component-data-name");
            //         let newComponent = {
            //             "name": name,
            //             "uniqueName": name + number,
            //             "number": number,
            //             "type": type,
            //             "componentData": {
            //                 "elementData": {
            //                     dataName: data
            //                 }
            //             },
            //             "defaultData": components[name].types[type].defaultData,
            //             "optionsHidden": false,
            //             "alreadyCreated": false
            //         };
            //         actions += 1;
            //         newArr.push(newComponent);
            //     });
            // }
            // clickedElements.elements = newArr;
            // clickedElements.numberOfComponents += actions;
            // clickedElements.numberOfSections += actions;
            // this.pageActions += actions;
        },
        changePageType: function (e) {
            this.pageType = e.target.innerHTML.toLowerCase();
        },
        checkRestricted: function (name) {
            return this.restrictions.includes(name);
        }
    },
    head() {
        return {
            title: "Component Generator || Bodybuilding.com",
            meta: [
                { 
                    hid: 'description',
                    name: 'description',
                    content: "Component Generator for Bodybuilding.com Employees"
                },
                { hid: 'robots', name: 'robots', content: 'noindex, nofollow' }
            ]
        };
    }
}
</script>

<style>
    .component__generator .built__elements__wrapper {
        padding-left: 240px;
    }
    .element__bar {
        width: 240px;
        height: calc(100vh - 40px);
        display: flex;
        flex-direction: column;
        align-content: center;
        align-items: center;
        justify-content: flex-start;
        position: fixed;
        top: 40px;
        left: 0;
        background: #FFF;
        padding: 4px;
        border: 1px solid #232323;
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
    .page__type__buttons h4 {
        width: 100%;
        text-align: center;
    }
    .bar__button {
        width: 100px;
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
        padding: 10px 0;
        flex: 1 1 auto;
        border-top: 1px solid #232323;
    }
    .element__section__inner {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: center;
        justify-content: center;
    }
    .element__section h4 {
        text-transform: capitalize;
        align-self: center;
        margin: 0 5px;
        width: 100%;
        text-align: center;
    }
    .create__element__cell__outer {
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: flex-end;
        justify-content: center;
    }
    .create__element__cell {
        min-width: 20px;
        border-radius: 4px;
        text-align: center;
        padding: 2px;
        margin: 2px;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: flex-end;
        justify-content: center;
        /* border: 1px solid #232323; */
    }
    .create__element__img {
        max-width: 20px;
        max-height: 20px;
    }
    .create__element__para {
        font-size: 1em;
        line-height: 1em;
        text-align: center;
    }
    [component-type="H1"] p {
        font-size: var(--h1-size);
        line-height: 1em;
    }
    [component-type="H2"] p {
        font-size: var(--h2-size);
        line-height: 1em;
    }
    [component-type="H3"] p {
        font-size: var(--h3-size);
        line-height: 1em;
    }
    [component-type="H4"] p {
        font-size: var(--h4-size);
        line-height: 1em;
    }
    [component-type="H5"] p {
        font-size: var(--h5-size);
        line-height: 1em;
    }
    [component-type="h6"] p {
        font-size: var(--h6-size);
        line-height: 1em;
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