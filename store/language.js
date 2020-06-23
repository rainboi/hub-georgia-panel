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
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    async add({}, params) {
        try {
            await this.$axios.post(`language/add`, params);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    async delete({}, ID) {
        try {
            await this.$axios.post(`language/delete/${ID}`);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    async update({}, params) {
        try {
            let ID = params.id;
            await this.$axios.post(`language/update/${ID}`, params);
            return true;
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
