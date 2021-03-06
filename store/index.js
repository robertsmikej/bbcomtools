export const state = () => ({
    components: [],
    tooltips: {},
    pagetypes: {}
});

export const mutations = {
    setComponents(state, data) {
        let newArr = [];
        data.forEach(function (obj) {
            // console.log(obj);
            // if (obj.hasOwnProperty("types")) {
            //     for (let t in obj.types) {
            //         if (obj.types[t].hasOwnProperty("elementData")) {
            //             let elData = obj.types[t].elementData;
            //             if (elData.hasOwnProperty("elementOptions")) {
            //                 let options = elData.elementOptions;
            //                 let optionsNames;
            //                 console.log(options);
            //             }
            //         }
            //     }
            // }
            newArr.push(obj);
        });
        newArr.sort((a, b) => (a.order > b.order) ? 1 : -1)
        state.components = newArr;
    },
    setTooltips(state, data) {
        let newObj = {};
        data.forEach(function (obj) {
            newObj[obj.slug] = obj;
        });
        state.tooltips = newObj;
    },
    setPageTypes(state, data) {
        state.pagetypes = data;
    }
};

export const getters = {
    sitewide: state => state.components,
    tooltips: state => state.tooltips,
    pagetypes: state => state.pagetypes
};

export const actions = {
    async nuxtServerInit({ commit }) {

        var components = await require.context('~/assets/content/components', false, /\.json$/);
        var d = components.keys().map(key => {
            let res = components(key);
            res.slug = key.slice(2, -5);
            return res;
        });
        await commit('setComponents', d);

        var toolTips = await require.context('~/assets/content/tooltips', false, /\.json$/);
        var d = toolTips.keys().map(key => {
            let res = toolTips(key);
            res.slug = key.slice(2, -5);
            return res;
        });
        await commit('setTooltips', d);

        var pageTypes = await require.context('~/assets/content/pages', false, /\.json$/);
        var d = pageTypes.keys().map(key => {
            let res = pageTypes(key);
            res.slug = key.slice(2, -5);
            return res;
        });
        await commit('setPageTypes', d);
    }
};