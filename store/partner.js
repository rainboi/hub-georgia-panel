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
                `partner/fetch?lang_id=${langID}`
            );
            await commit("setAll", response.data.result.data);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    async add({}, params) {
        try {
            await this.$axios.post(`partner/add`, params);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    async delete({}, ID) {
        try {
            await this.$axios.post(`partner/delete/${ID}`);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    async update({}, params) {
        try {
            let ID = params.id;
            await this.$axios.post(`partner/translate/${ID}`, params);
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
