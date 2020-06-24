const state = () => ({
    all: [],
    types: [
        {
            id: 1,
            name: "ჟურნალი"
        },
        {
            id: 2,
            name: "სამუშაო"
        },
        {
            id: 3,
            name: "სიახლე"
        }
    ]
});

const getters = {
    all: state => state.all,
    types: state => state.types
};

const actions = {
    async fetch({ commit }, langID = 1) {
        try {
            const response = await this.$axios.get(
                `posts/fetch?lang_id=${langID}`
            );
            await commit("setAll", response.data.result.data);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    async fetchOne({}, params) {
        try {
            let langID = params.langID;
            let postID = params.id;
            const response = await this.$axios.get(
                `post/fetch/${postID}?lang_id=${langID}`
            );
            const data = response.data.result.data;
            return data ? data : false;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    async add({}, params) {
        try {
            await this.$axios.post(`post/add`, params);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    async delete({}, ID) {
        try {
            await this.$axios.post(`post/delete/${ID}`);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    async update({}, params) {
        try {
            let ID = params.post_id;
            await this.$axios.post(`post/translate/${ID}`, params);
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
