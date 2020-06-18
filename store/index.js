export const state = () => ({
    components: [],
    tooltips: {}
});

export const mutations = {
    setComponents(state, data) {
        let newArr = [];
        data.forEach(function (obj) {
            newArr.push(obj);
        });
        state.components = newArr;
    },
    setTooltips(state, data) {
        let newObj = {};
        data.forEach(function (obj) {
            newObj[obj.slug] = obj;
        });
        state.tooltips = newObj;
    }
};

export const getters = {
    sitewide: state => state.components,
    tooltips: state => state.tooltips
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
    }
};