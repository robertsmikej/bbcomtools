<template>
    <section class="container component__generator Wr__body">
        <div
            @mouseleave="hoverCheck('none')"
            class="element__bar"
        >
            <div class="element__bar__main__buttons">
                <div 
                    @mouseover="hoverCheck('Type Of Page')"
                    class="element__bar__section--header__container"
                >
                    <img src="/imgs/webpage.png" class="element__bar__section--header--img"/>
                    <h5>Type Of Page</h5>
                </div>
                <div 
                    @mouseover="hoverCheck('Components')"
                    class="element__bar__section--header__container"
                >
                    <img src="/imgs/hexagon.png" class="element__bar__section--header--img"/>
                    <h5>Components</h5>
                </div>
                <div class="build__code__buttons">
                    <div class="site__button" @click="buildCode">Code</div>
                </div>
            </div>
            <div
                v-show="typeToShow !== 'none'" 
                class="element__bar__section--content__container"
            >
                <div class="element__section__header">
                    <h3>{{ typeToShow }}</h3>
                    <hr>
                </div>
                <div
                    v-show="typeToShow === 'Type Of Page'"
                    class="element__section"
                >
                    <div class="bar__headers__container">
                        <h5>Type of Page</h5>
                    </div>
                    <div
                        @click="changePageType('product')"
                        :class="[pageType === 'product' ? 'page__type--product' : 'site__selection--not-selected']"
                        class="site__button site__button--larger "
                        >
                        Product
                    </div>
                    <div
                        @click="changePageType('marketing')"
                        :class="[pageType === 'marketing' ? 'page__type--marketing' : 'site__selection--not-selected', ]"
                        class="site__button site__button--larger " 
                        >
                        Marketing
                    </div>
                </div>
                <div 
                    v-show="typeToShow === 'Components' && checkPageType(section)"
                    v-for="(section, index) in components" 
                    :key="'section' + section.title + index"
                    class="element__section"
                >   
                    <div 
                        @mouseover="hoverCheck('Components')"
                        :data-section-name="section.title"
                        class="element__section__inner" 
                    >
                        <div class="bar__headers__container">
                            <h5>{{ section.title }}</h5>
                        </div>
                        <div
                            v-for="component in section.types"
                            :key="component.type"
                            class="create__element__cell__outer"
                        >
                            <div
                                @click="createComponent('normal')"
                                :component-name="section.componentName"
                                :component-type="component.type"
                                class="site__button create__element__cell"
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
        </div>
        <div 
            class="built__elements__wrapper"
        >
            <div
                :class="'page__type--' + pageType + '--outer'"
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
                        :key="element.uniqueName + index + pageActions"
                        :pageActions="pageActions"
                        :is="element.componentName"
                        :componentData="element"
                        :type="element.type"
                        :class="element.uniqueName"
                        class="page__component"
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
                <div class="code__commands__container code__commands--code">
                    <div @click="copyText" class="site__button code__command">Copy</div>
                    <div @click="clearCode" class="site__button code__command">Clear</div>
                    <div @click="toggleCode" class="site__button code__command">Close</div>
                </div>
                <div class="code__commands__container code__commands--import">
                    <div @click="importCode" class="site__button code__command">Import HTML Code</div>
                    <div @click="togglePaste" class="site__button code__command">Paste From Google Doc</div>
                </div>
            </div>
        </div>
        <div
            v-if="showPasteBox"
            class="code__section"
        >
            <textarea
                name="pasteBox"
                class="code__text__area"
                @paste="pasteInput"
            ></textarea>
            <div class="code__commands">
                <div @click="togglePaste" class="code__command">Close</div>
            </div>
        </div>
    </section>
</template>

<script>
                    //droppable="true"
                    // @drop="checkDrag($event)"
                    // @dragstart="startDrag($event)"
                    // @dragover.prevent
                    // @dragenter.prevent

                    //draggable="true"
export default {
    data() {
        return {
            pageInfo: {
                title: "Page Builder | BBcom",
                description: "Page and Component builder for Bodybuilding.com employees",
                pageTypes: ["product", "marketing"],
                initialElements: []
            },
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
            showPasteBox: false,
            code: "",
            pageType: "product",
            restrictions: [],
            draggedItem: undefined,
            typeToShow: "none"
        }
    },
    computed: {
        components: function () {
            return this.$store.state.components;
        },
        componentNodes: function () {
            let listOfNodes = [];
            this.$store.state.components.forEach(component => {
                return component.types.filter(type => {
                    if (type.htmlElement) {
                        listOfNodes.push(type.htmlElement.toLowerCase())
                    }
                });
            });
            return listOfNodes;
        },
        pagetypes: function () {
            return this.$store.state.pagetypes;
        },
        linkDataElements: function () {
            let linkedData = {};
            this.$store.state.components.forEach(component => {
                return component.types.filter(type => {
                    if (!linkedData[component.componentName]) {
                        linkedData[component.componentName] = {};
                    }
                    if (type.elementData) {
                        linkedData[component.componentName][type.type] = Object.keys(type.elementData)
                    }
                });
            });
            return linkedData;
        }
    },
    created() {
        this.$nuxt.$on('elementAction', data => {
            let uniqueName = data.componentData.uniqueName;
            this.currentComponentName = uniqueName;
            let findIn = this.clickedElements.elements.findIndex(this.findInArray);
            if (data.action === "flipElement") {
                data.componentData.elementData.elementOptions.flipped = !data.componentData.elementData.elementOptions.flipped;
            }
            let newComponent = {
                newComponentData: data.componentData
            }
            this.updateTarget(newComponent);
        });
        this.$nuxt.$on('optionsChange', data => {
            let uniqueName = data.componentData.uniqueName;
            this.currentComponentName = uniqueName;
            let findIn = this.clickedElements.elements.findIndex(this.findInArray);
            this.clickedElements.elements[findIn].optionsShown = data.optionsBool;
        });
        this.$nuxt.$on('toggleOptions', uniqueName => {
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
            console.log(d)
            let elements = this.clickedElements.elements;
            for (let e in elements) {
                let element = elements[e];
                if (element === d.componentData) {;
                    let dataNeeded = element.elementData.dropdowns[d.index].data.find(x => x.name === d.selected);
                    element.elementData[d.dropdown.updateName] = dataNeeded;
                }
            }
        });
        this.$nuxt.$on('updateTarget', data => {
            this.updateTarget(data);
        })

        let pageInfo = this.pagetypes.filter(obj => {
            return obj.slug === this.$route.query.type
        })[0];
        if (pageInfo) {
            this.pageInfo = pageInfo;
            this.pageType = pageInfo.pageTypes[0];
            pageInfo.initialElements.forEach((el, index) => {
                this.createComponent("import", el);
                this.pageActions += 1;
            });
        }
    },
    methods: {
        hoverCheck: function (type) {
            this.typeToShow = type;
            // this.typeToShow = "Components";
        },
        // startDrag: (event) => {
        //     console.log(event);
        //     console.log(event.target);

        //     let types = this.findTypes(this.$el.querySelector("." + parentUniqueName));
        //     // event.dataTransfer.dropEffect = 'move';
        //     // event.dataTransfer.effectAllowed = 'move';
        //     event.dataTransfer.setData('text/plain', event.target);
        // },
        // checkDrag: function(event) {
        //     console.log(event);
        //     console.log(event.target);
        //     console.log(event.dataTransfer);
        //     // event.dataTransfer.dropEffect = 'move'
        //     // event.dataTransfer.effectAllowed = 'move'
        // },
        parseMatchedTypes: function (componentData, element, updating) {
            let elDatas= {};
            for (let m in componentData.matchedTypes) {
                let matchedType = componentData.matchedTypes[m];
                let foundElement = element.getElementsByTagName(matchedType)[0];
                if (foundElement) { //IF THERE ARE MORE THAN ONE ELEMENT IN COMPONENT
                    if (foundElement.nodeName.toLowerCase() === "picture") { //IF IS PICTURE ELEMENT
                        if (updating) {
                            let parent = foundElement.parentElement;
                            if (m === "imgSrcDesktop") {
                                elDatas[m] = parent.querySelector(".options--imgsrc--desktop").textContent.trim();
                            } if (m === "imgSrcMobile") {
                                let mobileImgSrcBlock = parent.querySelector(".options--imgsrc--mobile");
                                if (mobileImgSrcBlock.textContent.length > 1) {
                                    elDatas[m] = mobileImgSrcBlock.textContent.trim();
                                } else {
                                    elDatas[m] = parent.querySelector(".options--imgsrc--desktop").textContent.trim();
                                }
                            } if (m === "imgChangeToMobile") {
                                elDatas[m] = parent.querySelector(".options--img--changetomobile").textContent.trim();
                            } else if (m === "imgAlt") {
                                elDatas[m] = parent.querySelector(".options--img--alt").textContent.trim();
                            }
                        } else {
                            if (m === "imgSrcDesktop") {
                                elDatas[m] = foundElement.getElementsByTagName("img")[0].getAttribute("src");
                            } if (m === "imgSrcMobile") {
                                elDatas[m] = foundElement.getElementsByTagName("source")[0].getAttribute("srcset");
                            } if (m === "imgChangeToMobile") {
                                elDatas[m] = foundElement.getElementsByTagName("source")[0].getAttribute("media").replace("(min-width: ", "").replace(")", "");
                            } else if (m === "imgAlt") {
                                elDatas[m] = foundElement.getElementsByTagName("img")[0].getAttribute("alt");
                            }
                        }
                    } else if (foundElement.nodeName.toLowerCase() === "ul" || foundElement.nodeName.toLowerCase() === "ol") {
                        let listItemArray = [];
                        Array.from(element.getElementsByTagName("li")).forEach(innerEl => {
                            listItemArray.push({li: innerEl.textContent.trim()});
                        });
                        if (listItemArray.length > 0) {
                            elDatas.listItems = listItemArray;
                        }
                    } else {
                        elDatas[m] = foundElement.textContent.trim();
                    }
                } else { //IF THERE IS JUST ONE ELEMENT IN COMPONENT
                    if (element.nodeName.toLowerCase() === "ul" || element.nodeName.toLowerCase() === "ol") { //LISTS
                        let listItemArray = [];
                        Array.from(element.getElementsByTagName("li")).forEach(innerEl => {
                            listItemArray.push({li: innerEl.textContent.trim()});
                        });
                        if (listItemArray.length > 0) {
                            elDatas.listItems = listItemArray;
                        }
                    } else {
                        elDatas[m] = element.textContent.trim();
                    }
                }
            }
            return elDatas;
        },
        findType: function (els) {
            let dataObj = {};
            let elements = els.length ? els : [els];
            Array.from(elements).forEach(el => {
                for (let t in this.linkDataElements) {
                    if (t) {
                        for (let u in this.linkDataElements[t]) {
                            if (el.nodeName.toLowerCase() === "li" && u.toLowerCase() === "ul" || el.nodeName.toLowerCase() === "li" && u.toLowerCase() === "ol") {
                                dataObj["listItems"] = u;
                            } else if (u.toLowerCase() === el.nodeName.toLowerCase()) {
                                this.linkDataElements[t][u].forEach((trans, index) => {
                                    if (!dataObj[trans.toLowerCase()]) {
                                        dataObj[trans] = {};
                                    }
                                    dataObj[trans] = u.toLowerCase();
                                });
                            } 
                        }
                    }
                }
            });
            return dataObj;
        },
        findTypes: function (element) {
            let innerElements = element.querySelectorAll("*:not(div):not(.element__exclude)");
            let dataObj = innerElements.length === 0 ? this.findType(element) : this.findType(innerElements);
            return dataObj;
        },
        getUpdatedLists: function (type) {

        },
        findInArray: function (data) {
            return data.uniqueName === this.currentComponentName;
        },
        updateTarget: function (data) {
            let ncd = data.newComponentData;
            let textsToGrab;
            if (ncd.parentData) { //IF PARENT DATA THEN NAME OF CURRENT COMPONENT IS PARENT'S NAME, IF NOT THEN JUST SINGLE COMPONENT NAME
                if (ncd.parentData.grandparentData && Object.keys(ncd.parentData.grandparentData).length > 0) {
                    this.currentComponentName = ncd.parentData.grandparentData.uniqueName;
                    ncd.matchedTypes = this.findTypes(this.$el.querySelector("." + this.currentComponentName + '--' + ncd.parentData.uniqueName));
                    textsToGrab = this.parseMatchedTypes(ncd, this.$el.querySelector("." + this.currentComponentName + '--' + ncd.parentData.uniqueName), true);     
                } else {
                    this.currentComponentName = ncd.parentData.uniqueName;
                    ncd.matchedTypes = this.findTypes(this.$el.querySelector("." + this.currentComponentName));
                    textsToGrab = this.parseMatchedTypes(ncd, this.$el.querySelector("." + this.currentComponentName ), true);  
                }
            } else {
                this.currentComponentName = ncd.uniqueName;
                ncd.matchedTypes = this.findTypes(this.$el.querySelector("." + this.currentComponentName));
                textsToGrab = this.parseMatchedTypes(ncd, this.$el.querySelector("." + this.currentComponentName), true);      
            }
            let findIn = this.clickedElements.elements.findIndex(this.findInArray);  
            if (ncd.parentData) {
                if (ncd.parentData.grandparentData && Object.keys(ncd.parentData.grandparentData).length > 0) {
                    let grandChildren = Object.assign({}, this.clickedElements.elements[findIn].elementData.children[ncd.parentData.componentNumber].elementData, textsToGrab);
                    this.clickedElements.elements[findIn].elementData.children[ncd.parentData.componentNumber].elementData = grandChildren;
                } else {
                    Object.assign(ncd.parentData.elementData, textsToGrab);
                    if (data.action === "addListItem" || data.action === "deleteListItem") {
                        let newListItems = data.action === "addListItem" ? this.addListItem(data.event) : this.deleteListItem(data.event);
                        ncd.parentData.elementData.listItems = newListItems;
                    }
                    if (data.action === "pasted" && data.pasted.type === "listItems") {
                        ncd.parentData.elementData.listItems = data.pasted.newListItems;
                    }
                    this.clickedElements.elements[findIn] = ncd.parentData;
                }
            } else if (data.action === "pasted" && data.pasted.type === "listItems") { //IF PASTED AND ARE LIST ITEMS
                this.clickedElements.elements[findIn].elementData.listItems = data.pasted.newListItems;
            } else if (data.action === "addListItem" || data.action === "deleteListItem") {
                let newListItems = data.action === "addListItem" ? this.addListItem(data.event) : this.deleteListItem(data.event);
                ncd.elementData["listItems"] = newListItems;
                this.clickedElements.elements[findIn] = ncd;
            } else if (data.action === "addChartRow" || data.action === "deleteChartRow") {
                let newChartRows = data.action === "addChartRow" ? this.addChartRow(data.event) : this.deleteChartRow(data.event);
                ncd.elementData.chartRows = newChartRows;
                this.clickedElements.elements[findIn]= ncd;
            } else if (data.action === "addChartColumn" || data.action === "deleteChartColumn") {
                let newChartRows = data.action === "addChartColumn" ? this.addChartColumn(data.event) : this.deleteChartColumn(data.event);
                ncd.elementData.chartRows = newChartRows;
                this.clickedElements.elements[findIn] = ncd;
            } else if (ncd.componentName === "Chart") {
                let textsToGrab = this.getChartRows(data.event);
                ncd.elementData.chartRows = textsToGrab;
                this.clickedElements.elements[findIn] = ncd;
            } else { //REGULAR ELEMENT
                Object.assign(ncd.elementData, textsToGrab);
                this.clickedElements.elements[findIn] = ncd;
            }
            this.pageActions += 1;
        },
        
        arrayMove: function (arr, fromIndex, toIndex) {
            var element = arr[fromIndex];
            arr.splice(fromIndex, 1);
            arr.splice(toIndex, 0, element);
        },
        changePageType: function (type) {
            this.pageType = type;
        },
        checkPageType: function (data) {
            if (data.showLive) {
                return data.pageTypes.includes(this.pageType);
            }
        },
        checkRestricted: function (name) {
            return this.restrictions.includes(name);
        },
        copyText: function () {
            let text = this.$el.querySelector(".code__text__area");
            text.focus();
            text.select();
            document.execCommand('copy');
        },

        //CHART FUNCTIONS
        //CHART FUNCTIONS
        //CHART FUNCTIONS
        addChartColumn(event) {
            let chartRows = this.getChartRows(event);
            let clickedCell = Number(this.getClickedCell(event));
            chartRows.forEach((chartRow, index) => {
                let cellObj = {};
                index === 0 ? cellObj["text"] = "New" : cellObj["in"] = "0";
                chartRow.row.splice(clickedCell + 1, 0, cellObj);
            });
            return chartRows;
        },
        addChartRow(event) {
            let rowToAdd = {type: "chartRow", row: []};
            let chartRows = this.getChartRows(event);
            let clickedRow = this.getClickedChartRow(event, chartRows);
            chartRows[0].row.forEach((el, index) => {
                let cellObj = {};
                index === 0 ? cellObj["text"] = "New" : cellObj["in"] ="0";
                rowToAdd.row.push(cellObj);
            })
            chartRows.splice(clickedRow + 1, 0, rowToAdd);
            return chartRows;
        },
        deleteChartColumn(event) {
            let chartRows = this.getChartRows(event);
            let clickedCell = this.getClickedCell(event).substr(-1);
            chartRows.forEach(chartRow => {
                chartRow.row.splice(clickedCell, 1);
            });
            return chartRows;
        },
        deleteChartRow(event) {
            let chartRows = this.getChartRows(event);
            let clickedRow = this.getClickedChartRow(event, chartRows);
            chartRows.splice(clickedRow, 1);
            return chartRows;
        },
        getChartRows(incomingData) {
            let newChartRows;
            let isImport = false;
            if (incomingData.target) {
                newChartRows = incomingData.target.closest(".page__chart").getElementsByClassName("chart__row");
            } else {
                newChartRows = incomingData.getElementsByClassName("chart__row");
                isImport = true;
            }
            let newChartArr = Array.from(newChartRows).map((div) => {
                let newChildren = this.getChartRowCells(div.children, isImport);
                return {row: newChildren}
            });
            return newChartArr;
        },
        getChartRowCells(data, imported) {
            let childrenArray = Array.from(data);
            if (!imported) {childrenArray.pop();}
            let newChildrenArray =[];
            childrenArray.forEach((cell, index) => {
                let buttonComponentFromCell = cell.querySelector(".component__remove");
                if (buttonComponentFromCell && buttonComponentFromCell.parentNode) {
                    buttonComponentFromCell.parentNode.removeChild(buttonComponentFromCell);
                }
                let cellNumValue = cell.children[0].dataset.cellNumber;
                let cleanStr = cell.innerText.trim();
                while(cleanStr.indexOf("0") === 0) {
                    cleanStr = cleanStr.replace("0", "");
                } 
                let cellObj = {};
                let keyStr
                if (cell.firstChild && cell.firstChild.children[0] && cell.firstChild.children[0].dataset.keyStr) {
                    keyStr = cell.firstChild.children[0].dataset.keyStr.trim()
                } else {
                    keyStr = 'in'
                }
                if (cleanStr.length > 0 ) {
                    cellObj[keyStr] = cleanStr;
                } else {
                    cellObj['in'] = 0;
                }
                cleanStr = isNaN(cleanStr) ? cleanStr : parseInt(cleanStr);
                cellObj["cellNumber"] = cellNumValue;
                newChildrenArray.push(cellObj);
            })
            return newChildrenArray;
        },
        getClickedCell(event) {
            return event.path[2].firstChild.dataset.cellNumber.split("-")[1];
        },
        getClickedChartRow(event, chartRows) {
            let clickedItem = -1;
            let chartRowArray = Array.from(chartRows);
            chartRowArray.forEach((chartRow, index) => {
                let chartRowIndex = chartRow.row[0].cellNumber.split("-")[0];
                let eventIndex = event.target.closest(".chart__row").getElementsByTagName("div")[0].children[0].dataset.cellNumber.split("-")[0];
                if(chartRowIndex === eventIndex) {
                   clickedItem = index;
               }
            });
            return clickedItem;
        },
        //END CHART FUNCTIONS
        //END CHART FUNCTIONS
        //END CHART FUNCTIONS
        

        //LIST FUNCTIONS
        //LIST FUNCTIONS
        //LIST FUNCTIONS
        addListItem(event) {
            let newListItems = this.getNewListItems(event);
            let clickedItem = this.getClickedListItem(event, newListItems);
            newListItems.splice(clickedItem + 1, 0, {li: "New List Item"});
            return newListItems;
        },
        deleteListItem(event) {
            let newListItems = this.getNewListItems(event);
            let clickedItem = this.getClickedListItem(event, newListItems);
            newListItems.splice(clickedItem, 1);
            return newListItems;
        },
        getNewListItems(event) {
            // console.log(event);
            let newListItems = event.target.closest(".page__ul__list").getElementsByTagName("li");
            let newLiArr = Array.from(newListItems).map(function (li) {
                return {
                    li: li.textContent.trim()
                }
            });
            return newLiArr;
        },
        getClickedListItem(event, newListItems) {
            let clickedItem = -1;
            Array.from(newListItems).forEach((listItem, index) => {
                let liText = listItem.li.trim().toLowerCase();
                let eventText = event.target.closest(".component__wrapper").getElementsByTagName("li")[0].textContent.trim().toLowerCase();
                if (liText === eventText) {
                    clickedItem = index;
                }
            });
            return clickedItem;
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
                Object.assign(newData, importData);
            }
            return newListItems;
        },
        //END LIST FUNCTIONS
        //END LIST FUNCTIONS
        //END LIST FUNCTIONS
        
        //CREATE FUNCTIONS
        //CREATE FUNCTIONS
        //CREATE FUNCTIONS
        createComponent: function (typeOfCreate, importData) {
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
            let component = this.components.filter(obj => {
                return obj.componentName === compname
            })[0];
            let componentDetails = JSON.parse(JSON.stringify(component.types.filter(obj => {
                return obj.type.toLowerCase() === comptype.toLowerCase()
            })[0]));
            
            if (typeOfCreate === "import") {
                Object.assign(componentDetails.elementData, importData.newElementData);
                if (importData.elOptions && componentDetails.elementData.elementOptions) {
                    Object.assign(componentDetails.elementData.elementOptions, importData.elOptions);
                }
            }
            // console.log(componentDetails);
            let newComponent = {
                componentName: component.componentName,
                uniqueName: component.componentName + this.clickedElements.numberOfComponents,
                type: componentDetails.type,
                elementData: componentDetails.elementData,
                hasInnerComponents: componentDetails.elementData.hasOwnProperty("children") ? true : false,
                optionsShown: true,
                componentChanges: 0,
                vendorRestricted: this.checkRestricted("vendors"),
                group: Object.keys(componentDetails.elementData).length > 1 ? true : false
            };
            // console.log(1);
            console.log(newComponent)
            this.clickedElements.numberOfComponents += 1;
            this.clickedElements.elements.push(newComponent);
        },
        //END CREATE FUNCTIONS
        //END CREATE FUNCTIONS
        //END CREATE FUNCTIONS
        
        //CODE FUNCTIONS
        //CODE FUNCTIONS
        //CODE FUNCTIONS
        togglePaste: function () {
            this.showPasteBox = !this.showPasteBox;
        },
        pasteInput: function (e) {
            let pastedData = e.clipboardData.getData('text/html');
            if (pastedData && pastedData.length > 1000) {
                let pastedDoc = new DOMParser().parseFromString(e.clipboardData.getData('text/html'), "text/html").getElementsByTagName("body")[0].getElementsByTagName("b")[0];
                let pastedChildren = pastedDoc.children;
                Array.from(pastedChildren).forEach(el => {
                    
                    if (el.dataset) {
                        // console.log(el.dataset);
                    }
                    
                });
                // console.log(pastedDoc);
                // console.log(pastedDoc.children);
                // let dataObj = {
                //     type: "listItems",
                //     newListItems: []
                // };
                // pastedDoc.querySelectorAll("p").forEach(item => {
                //     dataObj.newListItems.push({li: item.textContent.substr(1).trim()});
                // });
                // this.updateTarget("pasted", dataObj);
            }
        },
        removeAttributes: function (els) {
            return els.forEach(el => {
                el.removeAttribute("contenteditable");
            });
        },
        removeElements: function (els) {
            return els.forEach(el => {
                el.parentNode.removeChild(el);
            });
        },
        removeClasses: function (codeCopy, arr) {
            return arr.forEach(arrItem => {
                let elements = codeCopy.querySelectorAll("." + arrItem);
                elements.forEach(el => {
                    el.classList.remove(arrItem);
                });
            });
        },
        moveChildrenOutOfParents: function (els) {
            return els.forEach(el =>  {
                el.outerHTML = el.innerHTML.trim();
            });
        },
        removeSpaces: function (els) {
            return els.forEach(el => {
                el.textContent.trim();
            });
        },
        buildCode: function () {
            let code = this.$el.querySelector(".page__content");
            let codeCopy = code.cloneNode(true);
            
            this.removeAttributes(codeCopy.querySelectorAll("[contenteditable]"));
            this.removeElements(codeCopy.querySelectorAll(".component__options"));
            this.removeElements(codeCopy.querySelectorAll(".options__editable__bottom"));
            this.removeElements(codeCopy.querySelectorAll(".component__remove"));
            this.moveChildrenOutOfParents(codeCopy.querySelectorAll(".page__component"));
            this.moveChildrenOutOfParents(codeCopy.querySelectorAll(".component__wrapper"));
            codeCopy = codeCopy.outerHTML.replace(/\<!---->/g, "").replace(/\s+/g, ' ').replace(/> /g, ">").replace(/ </g, "<");
            this.code = codeCopy;
            this.showCode = true;
        },
        findInComponents: function (element, nameOfElement) {
            let comp = {};
            this.components.forEach(component => {
                component.types.forEach(type => {
                    if (type.htmlElement) { //SINGLE ELEMENTS
                        if (type.htmlElement.toLowerCase() === element.nodeName.toLowerCase()) {
                            comp = {
                                typeData: type,
                                type: type,
                                component: component,
                            }
                        }
                    } else if (nameOfElement && nameOfElement === component.componentName) { //ELEMENTS WITH MORE THAN ONE CHILD
                        if (type.type === element.getAttribute("data-component-sub-type")) {
                            comp = {
                                typeData: type,
                                type: element.getAttribute("data-component-sub-type"),
                                component: component,
                            }
                        }
                    } 
                });
            });
            return comp;
        },
        
        importCode: function () {
            this.clickedElements.elements = [];
            let importZone = document.querySelector(".code__text__area");
            let importCode = new DOMParser().parseFromString(importZone.value, "text/html");
            let contentArea = importCode.querySelector(".page__content");
            let initialElements = contentArea.children;
            let componentSubDetails;
            Array.from(initialElements).forEach(element => {                
                if (element.nodeName.toLowerCase() !== "parsererror") {
                    console.group("1 - Import Data");
                    let elDatas = {};
                    let elOptions = {};
                    let componentData = element.hasAttribute("data-component-type") ? this.findInComponents(element, element.getAttribute("data-component-type")) : this.findInComponents(element); 
                    // console.log(componentData);
                        //IF MULTIPLE ELEMENTS OR JUST SINGLE ELEMENT
                    componentData.matchedTypes = this.findTypes(element);
                    if (element.dataset) {
                        for (let d in element.dataset) {
                            if (d.indexOf("options") >= 0) { //IF OPTIONS EXIST ON DOM ELEMENT
                                let newObj = {};
                                let key = d.toLowerCase().replace(/options/g, "");
                                let value = element.dataset[d];
                                elOptions[key] = value;
                            }
                        }
                    }
                    let textsToGrab;
                    if (componentData.component.componentName === "Chart") {
                        this.removeElements(element.querySelectorAll(".chart__row--cm"));
                        textsToGrab = {
                            chartRows: this.getChartRows(element)
                        };
                    } else {
                        textsToGrab = this.parseMatchedTypes(componentData, element, false);
                    }
                    let el = {
                        componentData: componentData,
                        componentName: componentData.component.componentName,
                        elementType: componentData.typeData.type,
                        newElementData: textsToGrab,
                        elOptions: elOptions
                    };
                    this.createComponent("import", el);
                    console.groupEnd();
                }
            });
            this.toggleCode();
        },
        clearCode: function () {
            this.code = "";
        },
        toggleCode: function () {
            this.showCode = !this.showCode;
            if (this.showCode === false) {
                this.code = "";
            }
        },
        //END CODE FUNCTIONS
        //END CODE FUNCTIONS
        //END CODE FUNCTIONS
    },
    head() {
        return {
            title: this.pageInfo.title,
            meta: [
                { 
                    hid: 'description',
                    name: 'description',
                    content: this.pageInfo.description
                },
                { hid: 'robots', name: 'robots', content: 'noindex, nofollow' }
            ]
        };
    }
}
</script>

<style>
    .page__component {
        cursor: pointer;
    }

    .page__para--builder {
        margin: 0;
    }
</style>