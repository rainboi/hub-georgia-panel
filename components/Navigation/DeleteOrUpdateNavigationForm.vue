<template>
    <form class="delete-navigation" @submit.prevent="deleteNavigation">
        <select class="nav-select" v-model="selectedNavigationID" required>
            <option v-for="nav in navigations" :key="nav.id" :value="nav.id">{{
                nav.title
            }}</option>
        </select>
        <input
            spellcheck="false"
            type="text"
            v-model="selectedNavigation.title"
            placeholder="სათაური"
        />
        <input
            spellcheck="false"
            type="text"
            :value="selectedNavigation.slug"
            placeholder="სლაგი"
            disabled
        />
        <input
            spellcheck="false"
            type="number"
            v-model.number="selectedNavigation.order_id"
            placeholder="რიგის ნომერი"
        />
        <button :disabled="requesting" class="delete">წაშლა</button>
        <button
            type="button"
            @click="updateNavigation"
            :disabled="requesting"
            class="update"
        >
            განახლება
        </button>
    </form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: "DeleteOrUpdateNavigationForm",
    props: {
        navigations: {
            type: Array,
            required: true
        }
    },
    computed: {
        selectedNavigation() {
            this.$emit("input", this.selectedNavigationID);
            let selected = this.navigations.find(
                entry => entry.id === this.selectedNavigationID
            );
            if (selected) {
                return { ...selected };
            } else {
                return {
                    title: null,
                    slug: null,
                    order_id: null
                };
            }
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
            deleteNav: "navigation/delete",
            updateNav: "navigation/update"
        }),
        async deleteNavigation() {
            this.requesting = true;
            await this.deleteNav(this.selectedNavigationID);
            this.$emit("actionMade");
            this.requesting = false;
        },
        async updateNavigation() {
            this.requesting = true;
            await this.updateNav(this.selectedNavigation);
            this.$emit("actionMade");
            this.requesting = false;
        }
    }
};
</script>

<style scoped>
.delete-navigation {
    display: grid;
    grid-template-columns: 45% 45%;
    grid-column-gap: calc(10% / 2);
    grid-row-gap: 20px;
}

input:disabled {
    background-color: var(--dark-gray);
    color: var(--white);
}
</style>
