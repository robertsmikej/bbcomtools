var allComponents = {
    Headers: {
        title: "text headers",
        pageTypes: ["product", "marketing"],
        types: {
            "H1": {
                title: "H1",
                componentName: "Headers",
                type: "H1",
                defaultData: {
                    headerText: "New H1"
                },
                img: ""
            },
            "H2": {
                title: "H2",
                componentName: "Headers",
                type: "H2",
                defaultData: {
                    headerText: "New H2"
                },
                img: ""
            },
            "H3": {
                title: "H3",
                componentName: "Headers",
                type: "H3",
                defaultData: {
                    headerText: "New H3"
                },
                img: ""
            },
            "H4": {
                title: "H4",
                componentName: "Headers",
                type: "H4",
                defaultData: {
                    headerText: "New H4"
                },
                img: ""
            },
            "H5": {
                title: "H5",
                componentName: "Headers",
                type: "H5",
                defaultData: {
                    headerText: "New H5"
                },
                img: ""
            },
            "H6": {
                title: "H6",
                componentName: "Headers",
                type: "H6",
                defaultData: {
                    headerText: "New H6"
                },
                img: ""
            }
        }
    },
    Paragraphs: {
        title: "paragraphs",
        pageTypes: ["product", "marketing"],
        types: {
            "p": {
                title: "P",
                componentName: "Paragraphs",
                type: "p",
                defaultData: {
                    paraText: "New Paragraph"
                },
                img: "paragraph.png"
            }
        }
    },
    List: {
        title: "list",
        pageTypes: ["product", "marketing"],
        types: {
            "list": {
                title: "List",
                componentName: "List",
                type: "list",
                defaultData: {
                    listItems: ["New List Item 1", "New List Item 2"]
                },
                img: "list.png"
            }
        }
    },
    Spacer: {
        title: "spacers",
        pageTypes: ["product", "marketing"],
        types: {
            "extra-small": {
                title: "XS",
                componentName: "Spacer",
                type: "extra-small",
                defaultData: {
                    height: "10px"
                },
                img: ""
            },
            "small": {
                title: "S",
                componentName: "Spacer",
                type: "small",
                defaultData: {
                    height: "20px"
                },
                img: ""
            },
            "medium": {
                title: "M",
                componentName: "Spacer",
                type: "medium",
                defaultData: {
                    height: "40px"
                },
                img: ""
            },
            "large": {
                title: "L",
                componentName: "Spacer",
                type: "large",
                defaultData: {
                    height: "60px"
                },
                img: ""
            },
            "extralarge": {
                title: "XL",
                componentName: "Spacer",
                type: "extralarge",
                defaultData: {
                    height: "80px"
                },
                img: ""
            }
        }
    },
    Sidebyside: {
        title: "Side By Side",
        pageTypes: ["product", "marketing"],
        types: {
            "sidebyside": {
                title: "Side By Side",
                componentName: "Sidebyside",
                type: "sidebyside",
                defaultData: {
                    headerText: "New Header",
                    paraText: "New Para",
                    imgSrc: "https://www.bodybuilding.com/images/merchandising/april-2020/birthday-week-hotdeal-550x420.jpg"
                },
                img: "sidebysidewheader1.png"
            }
        }
    },
    Videos: {
        title: "Videos",
        pageTypes: ["product", "marketing"],
        types: {
            "VideoJW": {
                title: "VideoJW",
                componentName: "Videos",
                type: "VideoJW",
                defaultData: {
                    videoCode: ""
                },
                img: "jwplayer.png"
            }
        }
    },
    Bannersheroes: {
        title: "banners",
        pageTypes: ["marketing"],
        types: {
            "Bannersheroes": {
                title: "Banner",
                componentName: "Bannersheroes",
                type: "Bannersheroes",
                defaultData: {
                    header_1: "Line 1",
                    header_2: "Line 2",
                    header_3: "Line 3",
                    disclaimerText: "*Disclaimer Text",
                    buttonText: "Shop Now",
                    bannerLink: "https://www.bodybuilding.com",
                    backgroundImg: {
                        desktop: "https://www.bodybuilding.com/images/lpimages/optimization/evergreen-header-02.jpg",
                        mobile: "https://www.bodybuilding.com/images/merch/landingpages/components/header-bg/2020-evergreen-header-01-mobile.jpg"
                    },
                    textColor: {
                        name: "Black",
                        code: "#232323"
                    },
                    dropdowns: [
                        {
                            name: "Text Color",
                            updateName: "textColor",
                            data: [
                                {
                                    name: "Black",
                                    code: "#232323"
                                },
                                {
                                    name: "White",
                                    code: "#FFFFFF"
                                }
                            ]
                        },
                        {
                            name: "Background Templates",
                            updateName: "backgroundImg",
                            data: [
                                {
                                    name: "1",
                                    desktop: "https://www.bodybuilding.com/images/lpimages/optimization/evergreen-header-01.jpg",
                                    mobile: "https://www.bodybuilding.com/images/merch/landingpages/components/header-bg/2020-evergreen-header-01-mobile.jpg"
                                },
                                {
                                    name: "2",
                                    desktop: "https://www.bodybuilding.com/images/lpimages/optimization/evergreen-header-02.jpg",
                                    mobile: "https://www.bodybuilding.com/images/merch/landingpages/components/header-bg/2020-evergreen-header-02-mobile.jpg"
                                },
                                {
                                    name: "3",
                                    desktop: "https://www.bodybuilding.com/images/lpimages/optimization/evergreen-header-03.jpg",
                                    mobile: "https://www.bodybuilding.com/images/merch/landingpages/components/header-bg/2020-evergreen-header-03-mobile.jpg"
                                },
                                {
                                    name: "4",
                                    desktop: "https://www.bodybuilding.com/images/lpimages/optimization/evergreen-header-04.jpg",
                                    mobile: "https://www.bodybuilding.com/images/merch/landingpages/components/header-bg/2020-evergreen-header-04-mobile.jpg"
                                },
                                {
                                    name: "5",
                                    desktop: "https://www.bodybuilding.com/images/lpimages/optimization/evergreen-header-05.jpg",
                                    mobile: "https://www.bodybuilding.com/images/merch/landingpages/components/header-bg/2020-evergreen-header-05-mobile.jpg"
                                },
                                {
                                    name: "6",
                                    desktop: "https://www.bodybuilding.com/images/lpimages/optimization/evergreen-header-06.jpg",
                                    mobile: "https://www.bodybuilding.com/images/merch/landingpages/components/header-bg/evergreen-header-06-mobile.jpg"
                                },
                                {
                                    name: "7",
                                    desktop: "https://www.bodybuilding.com/images/lpimages/optimization/evergreen-header-07.jpg",
                                    mobile: "https://www.bodybuilding.com/images/merch/landingpages/components/header-bg/evergreen-header-07-mobile.jpg"
                                },
                                {
                                    name: "8",
                                    desktop: "https://www.bodybuilding.com/images/lpimages/optimization/evergreen-header-08.jpg",
                                    mobile: "https://www.bodybuilding.com/images/merch/landingpages/components/header-bg/2020-evergreen-header-08-mobile.jpg"
                                },
                                {
                                    name: "9",
                                    desktop: "https://www.bodybuilding.com/images/lpimages/optimization/evergreen-header-09.jpg",
                                    mobile: "https://www.bodybuilding.com/images/merch/landingpages/components/header-bg/2020-evergreen-header-09-mobile.jpg"
                                },
                                {
                                    name: "10",
                                    desktop: "https://www.bodybuilding.com/images/lpimages/optimization/evergreen-header-10.jpg",
                                    mobile: "https://www.bodybuilding.com/images/merch/landingpages/components/header-bg/2020-evergreen-header-10-mobile.jpg"
                                },
                                {
                                    name: "11",
                                    desktop: "https://www.bodybuilding.com/images/lpimages/optimization/evergreen-header-11.jpg",
                                    mobile: "https://www.bodybuilding.com/images/merch/landingpages/components/header-bg/2020-evergreen-header-11-mobile.jpg"
                                },
                                {
                                    name: "Birthday",
                                    desktop: "https://www.bodybuilding.com/images/2020/april/04-01-customer-apprec-headers-desktop.jpg",
                                    mobile: "https://www.bodybuilding.com/images/2020/april/04-01-customer-apprec-headers-mobile.jpg"
                                }
                            ]
                        }
                    ]
                },
                img: ""
            }
        }
    },
};

export const state = () => ({
    components: {}
});

export const mutations = {
    setComponents(state, data) {
        state.components = data;
    }
};

export const getters = {
    sitewide: state => state.components
};

export const actions = {
    async nuxtServerInit({ commit }) {
        await commit('setComponents', allComponents);
    }
};
