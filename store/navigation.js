const state = () => ({
    all: []
});

const getters = {
    all: state => state.all
};

const actions = {
    async fetch({ commit }, langID = 1) {
        try {
            const response = await this.$axios.get(
                `navigation/fetch?lang_id=${langID}`
            );
            await commit("setAll", response.data.result.data);
        } catch (error) {
            console.error(error);
            return false;
        }
    },

    async add({}, params) {
        try {
            const response = await this.$axios.post(`navigation/add`, params);
            let data = response.data.result.data;
            return data ? true : false;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    async delete({}, ID) {
        try {
            const response = await this.$axios.post(`navigation/delete/${ID}`);
            let data = response.data.result.data;
            return data ? true : false;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    async update({}, params) {
        try {
            const response = await this.$axios.post(
                `navigation/translate`,
                params
            );
            let data = response.data.result.data;
            return data ? true : false;
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
