<template>
    <form class="delete-navigation" @submit.prevent="deleteNavigation">
        <select class="nav-select" v-model="selectedNavigationID" required>
            <option v-for="nav in navigations" :key="nav.id" :value="nav.id">{{
                nav.title
            }}</option>
        </select>
        <button :disabled="requesting" class="delete">წაშლა</button>
    </form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: "DeleteNavigationForm",
    props: {
        navigations: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            selectedNavigationID: null,
            requesting: false
        };
    },
    methods: {
        ...mapActions({
            deleteNav: "navigation/delete"
        }),
        async deleteNavigation() {
            this.requesting = true;
            await this.deleteNav(this.selectedNavigationID);
            this.$emit("actionMade");
            this.requesting = false;
        }
    }
};
</script>

<style scoped>
.delete-navigation {
    display: grid;
    grid-template-columns: 20% 20% 20% 20%;
    grid-column-gap: calc(20% / 3);
}
</style>
