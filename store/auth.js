import { _login } from "@/lib/api/auth";

const state = () => ({
    user: null,
    token: null
});

const getters = {
    user: state => state.user,
    token: state => state.token
};

const actions = {
    async login({ commit, dispatch }, params) {
        let data = await _login(params);
        if (data) {
            await commit("setUser", data.user);
            dispatch("setToken", data.token);
            return true;
        } else {
            return false;
        }
    },
    async setToken({ commit }, token) {
        commit("setToken", token);
    }
};

const mutations = {
    setUser: (state, data) => (state.user = data),
    setToken: (state, data) => (state.token = data)
};

export default {
    state,
    getters,
    actions,
    mutations
};
