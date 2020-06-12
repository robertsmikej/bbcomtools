var allComponents = [
    {
        title: "Headers",
        componentName: "Headers",
        pageTypes: ["product", "marketing"],
        types: [
            {
                title: "H1",
                type: "H1",
                elementData: {
                    listItems: [
                        { 
                            headerText: "New H1"
                        }
                    ]
                },
                img: ""
            },
            {
                title: "H2",
                type: "H2",
                elementData: {
                    listItems: [
                        { 
                            headerText: "New H2"
                        }
                    ]
                },
                img: ""
            },
            {
                title: "H3",
                type: "H3",
                elementData: {
                    listItems: [
                        { 
                            headerText: "New H3"
                        }
                    ]
                },
                img: ""
            },
            {
                title: "H4",
                type: "H4",
                elementData: {
                    listItems: [
                        { 
                            headerText: "New H4"
                        }
                    ]
                },
                img: ""
            },
            {
                title: "H5",
                type: "H5",
                elementData: {
                    listItems: [
                        { 
                            headerText: "New H5"
                        }
                    ]
                },
                img: ""
            },
            {
                title: "H6",
                type: "H6",
                elementData: {
                    listItems: [
                        { 
                            headerText: "New H6"
                        }
                    ]
                },
                img: ""
            }
        ]
    },
    {
        title: "Paragraphs",
        componentName: "Paragraphs",
        pageTypes: ["product", "marketing"],
        types: [
            {
                title: "P",
                type: "p",
                elementData: {
                    listItems: [
                        { 
                            paraText: "New Para"
                        }
                    ]
                },
                img: "paragraph.png"
            }
        ]
    },
    {
        title: "Videos",
        componentName: "Videos",
        pageTypes: ["product", "marketing"],
        types: [
            {
                title: "VideoJW",
                
                type: "Video",
                elementData: {
                    listItems: [
                        { 
                            videoCode: "PLACE VIDEO PLAYER CODE HERE"
                        }
                    ]
                },
                img: "jwplayer.png"
            }
        ]
    },
    {
        title: "List",
        componentName: "List",
        pageTypes: ["product", "marketing"],
        types: [
            {
                title: "List",
                type: "list",
                elementData: {
                    listItems: [
                        { 
                            li: "New List Item 1"
                        },
                        {
                            li: "New List Item 2"
                        }
                    ]
                },
                img: "list.png"
            }
        ]
    },
    {
        title: "Spacers",
        componentName: "Spacer",
        pageTypes: ["product", "marketing"],
        types: [
            {
                title: "XS",
                type: "extra-small",
                elementData: {
                    height: "10px"
                },
                img: ""
            },
            {
                title: "S",
                type: "small",
                elementData: {
                    height: "20px"
                },
                img: ""
            },
            {
                title: "M",
                type: "medium",
                elementData: {
                    height: "40px"
                },
                img: ""
            },
            {
                title: "L",
                type: "large",
                elementData: {
                    height: "60px"
                },
                img: ""
            },
            {
                title: "XL",
                type: "extralarge",
                elementData: {
                    height: "80px"
                },
                img: ""
            }
        ]
    },
    {
        title: "Image Header Paras",
        componentName: "Imageheaderpara",
        pageTypes: ["product", "marketing"],
        types: [
            {
                title: "Row",
                type: "row",
                elementData: {
                    listItems: [
                        {
                            headerText: "New Header"
                        },
                        {
                            paraText: "New Para"
                        },
                        {
                            imgSrc: "https://www.bodybuilding.com/images/merchandising/april-2020/birthday-week-hotdeal-550x420.jpg"
                        }
                    ]
                },
                img: "iht-image-right3.png"
            },
            {
                title: "Column",
                type: "column",
                elementData: {
                    listItems: [
                        {
                            headerText: "New Header"
                        },
                        {
                            paraText: "New Para"
                        },
                        {
                            imgSrc: "https://www.bodybuilding.com/images/merchandising/april-2020/birthday-week-hotdeal-550x420.jpg"
                        }
                    ]
                },
                img: "iht-image-column.png"
            },
            {
                title: "List",
                type: "list",
                elementData: {
                    listItems: [
                        {
                            headerText: "New Header"
                        },
                        {
                            paraText: "New Para"
                        },
                        {
                            imgSrc: "https://www.bodybuilding.com/images/merchandising/april-2020/birthday-week-hotdeal-550x420.jpg"
                        }
                    ]
                },
                img: "iht-image-list.png"
            }
        ]
    },
    {
        title: "Story Row",
        componentName: "Storyrow",
        pageTypes: ["product", "marketing"],
        types: [
            {
                title: "Row",
                type: "Story",
                elementData: {
                    componentTypes: [
                        {
                            componentName: "Imageheaderpara",
                            type: "row"
                        },
                        {
                            componentName: "Imageheaderpara",
                            type: "column"
                        },
                        {
                            componentName: "Imageheaderpara",
                            type: "list"
                        }
                    ]
                },
                img: "story-row.png"
            }
        ]
    },
    {
        title: "Banners",
        pageTypes: ["marketing"],
        types: [
            {
                title: "Banner",
                componentName: "Bannersheroes",
                type: "Bannersheroes",
                elementData: {
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
                        name: "White",
                        code: "#FFFFFF"
                    },
                    dropdowns: [
                        {
                            name: "Text Color",
                            updateName: "textColor",
                            data: [
                                {
                                    name: "White",
                                    code: "#FFFFFF"
                                },
                                {
                                    name: "Black",
                                    code: "#232323"
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
        ]
    },
];

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
