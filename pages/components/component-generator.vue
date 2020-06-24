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
                        <div 
                            v-for="component in section.types" 
                            :key="component.type" 
                            class="create__element__cell__outer"
                        >
                            <div 
                                @click="createComponent('normal')"
                                :component-name="section.componentName"
                                :component-type="component.type" 
                                class="create__element__cell"
                            >
                                <img 
                                    v-if="component.img.length > 0"
                                    :src="'/imgs/' + component.img"
                                    class="create__element__img"
                                />
                                <p 
                                    v-if="component.img.length === 0"
                                    class="create__element__para"
                                >
                                    {{ component.title }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bar__buttons">
                <div class="bar__button" @click="buildCode">Code</div>
            </div>
        </div>
        <div class="built__elements__wrapper">
            <div
                :class="'page__type--' + pageType"
                class="built__elements__wrapper__inner page__content__outer"
            >
                <h2
                    v-if="pageType === 'product'"
                    class="page__type__header"
                >
                    Product Overview
                </h2>
                <div
                    @:removeElement="removeElement($event)"
                    :key="pageActions"
                    :class="'page__type--' + pageType"
                    class="page__content"
                >
                    <component 
                        v-for="(element, index) in clickedElements.elements"
                        :key="element.uniqueName + index"
                        :is="element.componentName"
                        :group="false"
                        :componentData="element"
                        :type="element.type"
                        :class="element.uniqueName"
                    ></component>
                </div>
            </div>
        </div>
        <div
            v-if="showCode"
            class="code__section"
        >
            <textarea
                name="code"
                :value="code"
                class="code__text__area"
            ></textarea>
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
        this.$nuxt.$on('updateTarget', data => {
            console.log(data);
            let uniqueName = data.newComponentData.uniqueName;
            this.currentComponentName = uniqueName;
            let findIn = this.clickedElements.elements.findIndex(this.findInArray);
            this.clickedElements.elements[findIn] = data.newComponentData;
            this.pageActions += 1;
        }),
        this.$nuxt.$on('optionsChange', data => {
            let uniqueName = data.componentData.uniqueName;
            this.currentComponentName = uniqueName;
            let findIn = this.clickedElements.elements.findIndex(this.findInArray);
            this.clickedElements.elements[findIn].optionsShown = data.optionsBool;
        });
        this.$nuxt.$on('toggleOptions', data => {
            let uniqueName = data.componentData.uniqueName;
            this.currentComponentName = uniqueName;
            let findIn = this.clickedElements.elements.findIndex(this.findInArray);
            this.clickedElements.elements[findIn].optionsShown = !this.clickedElements.elements[findIn].optionsShown;
        });
        this.$nuxt.$on('removeElement', data => {
            this.currentComponentName = data;
            let findIn = this.clickedElements.elements.findIndex(this.findInArray);
            this.clickedElements.elements.splice(findIn, 1);
            this.clickedElements.numberOfComponents -= 1;
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
        this.$nuxt.$on('toggleDropdown', d => {
            this.currentComponentName = d.componentData.uniqueName;
            let elements = this.clickedElements.elements;
            for (let e in elements) {
                let element = elements[e];
                if (element === d.componentData) {;
                    let dataNeeded = element.elementData.dropdowns[d.index].data.find(x => x.name === d.selected);
                    element.elementData[d.dropdown.updateName] = dataNeeded;
                }
            }
        });
    },
    methods: {
        findInArray: function (data) {
            // console.log(data);
            return data.uniqueName === this.currentComponentName;
        },
        checkPageType: function (data) {
            return data.pageTypes.includes(this.pageType);
        },
        arrayMove: function (arr, fromIndex, toIndex) {
            var element = arr[fromIndex];
            arr.splice(fromIndex, 1);
            arr.splice(toIndex, 0, element);
        },
        createListItems: function (index, typeOfCreate, componentDetails) {
            let newListItems = {};
            if (typeOfCreate === "normal") {
                newListItems.type = "listItems";
                newListItems.listItems = componentDetails.elementData.listItems;
                componentDetails.elementData.listItems.forEach(function (listData) {
                    for (let li in listData) {
                        let newListData = {
                            type: li,
                            text: listData[li]
                        };
                        newData[li] = newListData;
                    }
                    // }
                });
            } else if (typeOfCreate === "import") {
                // newData = {
                //     type: d,
                //     listItems: componentDetails.elementData[d]
                // };

                Object.assign(newData, importData);
                // console.log(newData);
            }
            return newListItems;
        },
        createComponent: function (typeOfCreate, importData) {
            console.group("buildcomp");
            let newNumber = this.clickedElements.numberOfComponents;
            let compname;
            let comptype;
            if (typeOfCreate === "normal") {
                compname = event.currentTarget.getAttribute("component-name");
                comptype = event.currentTarget.getAttribute("component-type");
            } else if (typeOfCreate === "import") {
                compname = importData.componentName;
                comptype = importData.elementType;
            }
            // console.log(importData);
            let component = this.components.filter(obj => {
                return obj.componentName === compname
            })[0];
            // console.log(component);
            let componentDetails = JSON.parse(JSON.stringify(component.types.filter(obj => {
                // console.log(obj.type);
                // console.log(comptype);
                return obj.type === comptype
            })[0]));
            // console.log(componentDetails);
            if (typeOfCreate === "import") {
                Object.assign(componentDetails.elementData, importData.newElementData);
            }
            if (componentDetails.elementData.hasOwnProperty("childArr")) {
                let childArr = componentDetails.elementData.childArr;
                componentDetails.elementData.childArray = [];
                childArr.forEach((child, index) => {
                    // console.log(child);
                    let innerComponent = this.components.filter(obj => {
                        return obj.componentName === child.componentName
                    })[0];
                    // console.log(innerComponent);
                    let innerComponentDetails = innerComponent.types.filter(obj => {
                        return obj.type === child.type
                    })[0];
                    // console.log(innerComponentDetails);
                    let newChildComponent = {
                        componentName: innerComponent.componentName,
                        uniqueName: innerComponent.componentName + parseInt(this.clickedElements.numberOfComponents),
                        type: innerComponentDetails.type,
                        elementData: innerComponentDetails.elementData,
                        optionsShown: true,
                        componentChanges: 0,
                        vendorRestricted: this.checkRestricted("vendors")
                    };
                    // console.log(newChildComponent)
                    componentDetails.elementData.childArray.push(newChildComponent);
                });
            }
            // console.log(importData);
            // console.log(componentDetails);

            let newComponent = {
                componentName: component.componentName,
                uniqueName: component.componentName + parseInt(this.clickedElements.numberOfComponents),
                type: componentDetails.type,
                elementData: componentDetails.elementData,
                optionsShown: true,
                componentChanges: 0,
                vendorRestricted: this.checkRestricted("vendors")
            };
            // console.log(newComponent);
            this.clickedElements.numberOfComponents += 1;
            this.clickedElements.elements.push(newComponent);
            console.groupEnd("buildcomp");
        },
        buildCode: function () {
            let code = this.$el.querySelector(".page__content");
            let codeCopy = code.cloneNode(true);
            codeCopy.querySelectorAll(".component__options, .component__remove").forEach(function (el) {
                el.parentNode.removeChild(el);
            });
            codeCopy.querySelectorAll(".page__component").forEach(function (wrap) {
                wrap.outerHTML = wrap.innerHTML;
            });
            codeCopy.querySelectorAll(".component__remove").forEach(function (el) {
                el.parentNode.removeChild(el);
            });
            codeCopy.querySelectorAll(".site__element").forEach(function (el) {
                el.removeAttribute("contenteditable")
            })
            codeCopy = codeCopy.outerHTML.replace(/\<!---->/g, "").replace(/\s+/g, ' ');
            this.code = codeCopy;
            this.showCode = true;
        },
        
        importCode: function () {
            this.clickedElements.elements = [];
            let importZone = document.querySelector(".code__text__area");
            let importCode = new DOMParser().parseFromString(importZone.value, "text/html");
            // console.log(importCode);
            let initialElements = importCode.querySelector(".page__content").children;
            let componentSubDetails;
            Array.from(initialElements).forEach(element => {
                console.group("1 - Import Data - Element Level");
                if (element.nodeName !== "parsererror") {
                    let componentType = element.getAttribute("data-component-type");
                    let componentInfo;
                    if (element.hasAttribute("data-component-sub-type")) {
                        let subType = element.getAttribute("data-component-sub-type");
                        componentInfo = this.components.filter(component => {
                            let types = component.types.filter(type => {
                                if (type.type === subType) {
                                    componentSubDetails = type;
                                    return type
                                }
                            });
                            return types.length > 0;
                        })[0];
                    } else {
                        componentInfo = this.components.filter(component => {
                            let elNodeName = element.nodeName.toLowerCase();
                            let types = component.types.filter(type => {
                                if (type.type.toLowerCase() === elNodeName) {
                                    componentSubDetails = type;
                                    return type
                                }
                            });
                            return types.length > 0;
                        })[0];
                    }
                    
                    // console.log(componentInfo);
                    // console.log(element);
                    // console.log(componentInfo);
                    // console.log(componentSubDetails);
                    // console.log(element.getAttribute("data-input-types"));
                    // console.log(element.getAttribute("data-input-types").replace(/'/g,'"'));

                    let componentInputTypes = JSON.parse(element.getAttribute("data-input-types").replace(/'/g,'"'));
                    console.log(componentInputTypes);
                    let elDatas = {};
                    componentInputTypes.forEach(type => {
                        if (element.hasAttribute("data-input-type")) {
                            elDatas[type] = element.innerHTML;
                        } else {

                            // console.log(element);
                            let innerDatas = element.querySelectorAll("[data-input-type]");
                            // console.log(innerDatas);
                            Array.from(innerDatas).forEach(innerEl => {
                                // console.log(innerEl);
                                // console.log(innerEl.getAttribute("data-input-type"));
                                // console.log(innerEl.getAttribute("src"));
                                if (innerEl.nodeName === "IMG" && innerEl.src.length > 0) {
                                    elDatas[innerEl.getAttribute("data-input-type")] = innerEl.getAttribute("src");
                                } else {
                                    elDatas[innerEl.getAttribute("data-input-type")] = innerEl.innerHTML;
                                }
                                console.log(elDatas);
                            });
                        }
                    });
                    // console.log(elDatas);
                    let el = {
                        componentName: componentInfo.componentName,
                        elementType: componentSubDetails.type,
                        newElementData: elDatas
                    };
                    // console.log(componentInfo);
                    // console.log(componentSubDetails);
                    console.log(el);
                    console.groupEnd("Import Data");
                    this.createComponent("import", el);
                }
            });
            this.toggleCode();
        },
        changePageType: function (e) {
            this.pageType = e.target.innerHTML.toLowerCase();
        },
        checkRestricted: function (name) {
            return this.restrictions.includes(name);
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
    },
    head() {
        return {
            title: "Component Generator | Bodybuilding.com",
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
    .page__content, .page__content__outer {
        min-height: 80vh;
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
    }
    .create__element__cell:hover {
        background-color: rgb(224, 221, 221);
    }
    .create__element__img {
        max-height: 20px;
    }
    .create__element__para {
        font-size: 1em;
        line-height: 1em;
        text-align: center;
    }
    [component-type="H1"] p {
        font-size: var(--site-h1-size);
        line-height: 1em;
    }
    [component-type="H2"] p {
        font-size: var(--site-h2-size);
        line-height: 1em;
    }
    [component-type="H3"] p {
        font-size: var(--site-h3-size);
        line-height: 1em;
    }
    [component-type="H4"] p {
        font-size: var(--site-h4-size);
        line-height: 1em;
    }
    [component-type="H5"] p {
        font-size: var(--site-h5-size);
        line-height: 1em;
    }
    [component-type="h6"] p {
        font-size: var(--site-h6-size);
        line-height: 1em;
    }
    
    

    .page__para--builder {
        margin: 0;
    }
</style>