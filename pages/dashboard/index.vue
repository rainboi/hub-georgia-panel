<template>
    <div class="page-container dashboard">
        <h1>Hub Georgia Dashboard</h1>
        <button class="logout-btn" @click="$auth.logout()">გასვლა</button>
        <div class=" snap navigation-contoller-container">
            <h2>ნავიგაცია</h2>
            <NavigationController />
        </div>
        <hr />
        <div class=" snap language-contoller-container">
            <h2>ენა</h2>
            <LanguageController />
        </div>
    </div>
</template>

<script>
import NavigationController from "@/components/NavigationController";
import LanguageController from "@/components/LanguageController";

export default {
    middleware: "authenticated",
    name: "Dashboard",
    components: {
        NavigationController,
        LanguageController
    },
    data() {
        return {};
    },
    async asyncData({ store }) {
        await store.dispatch("navigation/fetch");
        await store.dispatch("language/fetch");
    }
};
</script>

<style scoped>
.dashboard {
    display: block;
}

h1 {
    margin-top: 20px;
    margin-bottom: 15px;
}

h2 {
    margin: 20px 0;
}

.dashboard > hr {
    margin: 30px 0;
    border-width: 3px;
}
</style>

<style>
/* snap */

.snap {
    width: 80%;
    margin: 0 auto;
    border: 2px solid var(--green);
    padding: 20px;
    padding-top: 0;
    border-radius: 15px;
}

.snap select,
.snap input,
.snap button {
    height: 30px;
    border-radius: 100vw;
    outline: none;
    box-sizing: border-box;
    border: none;
    padding: 0 10px;
}

.snap select:focus,
.snap input:focus,
.snap button:focus {
    border: 2px solid var(--green);
}

.snap select {
    border-radius: 0;
}

hr {
    margin: 20px 0;
}

.snap .delete {
    background-color: var(--red);
}

.snap .update {
    background-color: var(--blue);
}

.logout-btn {
    position: absolute;
    top: 5px;
    right: 20px;
    height: 30px;
    border-radius: 100vw;
    background-color: transparent;
    font-size: 18px;
    color: var(--green);
    outline: none;
}
</style>
