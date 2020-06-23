const state = () => ({
    all: []
});

const getters = {
    all: state => state.all
};

const actions = {
    async fetch({ commit }) {
        try {
            const response = await this.$axios.get(`language/fetch`);
            await commit("setAll", response.data.result.data);
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    async add(params) {
        try {
            await axios.post(`language/add`, params);
        } catch (error) {
            console.error(error);
            return false;
        }
    }
};

const mutations = {
    setAll: (state, data) => (state.all = data)
};

export default {
    state,
    getters,
    actions,
    mutations
};
