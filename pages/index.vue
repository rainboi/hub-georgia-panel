<template>
    <div class="page-container index">
        <h1>Hub Georgia</h1>
        <LoginForm />
    </div>
</template>

<script>
import LoginForm from "@/components/LoginForm";

export default {
    middleware: "notAuthenticated",
    name: "Index",
    components: {
        LoginForm
    }
};
</script>

<style scoped>
.index {
    flex-direction: column;
}
</style>
