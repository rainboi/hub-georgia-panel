<template>
    <form @submit.prevent="submit" class="login-form">
        <input
            v-model="params.email"
            type="text"
            placeholder="იმეილი"
            required
        />
        <input
            v-model="params.password"
            type="password"
            minlength="6"
            placeholder="პაროლი"
            required
        />
        <button :disabled="requesting">შესვლა</button>
    </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "LoginForm",
    data() {
        return {
            params: {
                email: null,
                password: null
            },
            requesting: false
        };
    },
    methods: {
        ...mapActions({ login: "auth/login" }),
        async submit() {
            this.requesting = true;
            const res = await this.login(this.params);
            if (res) {
                this.$router.push({ name: "dashboard" });
            }
            this.requesting = false;
        }
    }
};
</script>

<style scoped>
form {
    width: 300px;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}

form > * {
    font-size: 18px;
    height: 35px;
    width: 100%;
    border-radius: 100vw;
    box-sizing: border-box;
    padding: 0 10px;
    border: none;
}

button {
}
</style>
