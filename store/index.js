var allComponents = {
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
                    headerText: "SBS New",
                    paraText: "Test Para",
                    imgSrc: "",
                    imgAlt: ""
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
