<template>
    <form class="delete-navigation" @submit.prevent="deleteNavigation">
        <select class="nav-select" v-model="selectedNavigationID" required>
            <option v-for="nav in navigations" :key="nav.id" :value="nav.id">{{
                nav.title
            }}</option>
        </select>
        <input
            type="text"
            :value="selectedNavigation ? selectedNavigation.slug : null"
            placeholder="slug"
            disabled
        />
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
    computed: {
        selectedNavigation() {
            return this.navigations.find(
                entry => entry.id === this.selectedNavigationID
            );
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

input:disabled {
    background-color: var(--dark-gray);
    color: var(--white);
}

input:disabled::placeholder {
    color: var(--white);
}
</style>
