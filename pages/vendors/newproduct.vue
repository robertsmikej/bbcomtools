<template>
    <section class="container new__product">
        <div class="built__elements__wrapper">
            <div class="built__elements__wrapper__inner page__content__outer" :class="'page__type--' + pageType">
                <h2 class="page__type__header" v-if="pageType === 'product'">Product Overview</h2>
                <div class="page__content" @:removeElement="removeElement($event)" :key="pageActions" :class="'page__type--' + pageType">
                    <component :is="element.componentName" :componentData="element" v-for="element in clickedElements.elements" :key="element.uniqueName" :type="element.type ? element.type : null"></component> 
                </div>
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
            pageType: "product",
            restrictions: [
                "vendors"
            ]
        }
    },
    computed: {
        components: function () {
            return this.$store.state.components
        }
    },
    created() {
        let vendorPageStructure = [
            {
                componentName: "Headers",
                type: "H2",
                elementData: {
                    headerText: "Signature 100% Whey Protein Powder",
                }
            },
            {
                componentName: "Paragraphs",
                type: "p",
                elementData: {
                    paraText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                }
            },
            {
                componentName: "Spacer",
                type: "small"
            },
            {
                componentName: "Videos",
                type: "VideoJW",
                elementData: {
                    paraText: "",
                }
            },
            {
                componentName: "Spacer",
                type: "small"
            },
            {
                componentName: "Headers",
                type: "H3",
                elementData: {
                    headerText: "Product Benefits",
                }
            },
            {
                componentName: "List",
                type: "list",
                elementData: {
                    listItems: [
                        "New List Item",
                        "New List Item"
                    ]
                }
            },
            {
                componentName: "Sidebyside",
                type: "sidebyside",
                elementData: {
                    headerText: "Key Ingredients",
                    paraText: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                    imgSrc: "https://www.bodybuilding.com/images/merchandising/february-2020-/02-03-on-bsn-isopure550x420-550x420-sale.jpg",
                    imgAlt: "Key Ingredients"
                }
            },
            {
                componentName: "Sidebyside",
                type: "sidebyside",
                elementData: {
                    headerText: "Supports Your Goals",
                    paraText: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
                    imgSrc: "https://www.bodybuilding.com/images/merchandising/february-2020-/02-03-on-bsn-isopure550x420-550x420-sale.jpg",
                    imgAlt: "Key Ingredients"
                }
            },
            {
                componentName: "Sidebyside",
                type: "sidebyside",
                elementData: {
                    headerText: "Good To Know",
                    paraText: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
                    imgSrc: "https://www.bodybuilding.com/images/merchandising/february-2020-/02-03-on-bsn-isopure550x420-550x420-sale.jpg",
                    imgAlt: "Key Ingredients"
                }
            }
        ];
        let that = this;
        vendorPageStructure.forEach(function (el) {
            let newNumber = that.clickedElements.numberOfComponents;
            let newComponent = {
                componentName: el.componentName,
                uniqueName: el.componentName + newNumber,
                number: newNumber,
                type: el.type,
                elementData: {},
                elementData: that.components[el.componentName].types[el.type].elementData,
                optionsHidden: true,
                alreadyCreated: false,
                vendorRestricted: that.checkRestricted("vendors")
            };
            if (el.elementData) {
                for (let d in el.elementData) {
                    newComponent.elementData[d] = el.elementData[d];
                }
            }
            that.clickedElements.elements.push(newComponent);
            that.clickedElements.numberOfComponents += 1;
            that.pageActions += 1;
        });
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
        changePageType: function (e) {
            this.pageType = e.target.innerHTML.toLowerCase();
        },
        checkRestricted: function (name) {
            return this.restrictions.includes(name);
        }
    },
    head() {
        return {
            title: "New Product Page Form || Bodybuilding.com",
            meta: [
                { 
                    hid: 'description',
                    name: 'description',
                    content: "New product page form for vendors"
                },
                { hid: 'robots', name: 'robots', content: 'noindex, nofollow' }
            ]
        };
    }
}
</script>

<style>
    .new__product .built__elements__wrapper {
        padding-left: 0px;
    }
</style>
