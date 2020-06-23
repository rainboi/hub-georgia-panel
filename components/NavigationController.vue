<template>
    <div class="navigation-controller">
        <LanguageSelect
            :required="true"
            :languages="allLanguages"
            :defaultValue="selectedLangID"
            @input="languageUpdated"
        />

        <hr />

        <AddNavigationForm @actionMade="refetch" :langID="selectedLangID" />

        <hr />

        <DeleteNavigationForm
            :navigations="allNavigations"
            @actionMade="refetch"
        />
        <!-- <form class="update-navigation">
            <select class="nav-select" v-model="selectedNavID">
                <option v-for="nav in all" :key="nav.id" :value="nav.id">{{
                    nav.title
                }}</option>
            </select>
            <input type="text" v-model="selectedNav.title" />
            <button :disabled="requesting" class="update">განახლება</button>
            <button
                :disabled="requesting"
                type="button"
                @click="deleteNavigation"
                class="delete"
            >
                წაშლა
            </button>
        </form> -->

        <hr v-if="selectedNav.children && selectedNav.children.length !== 0" />

        <form
            v-if="selectedNav.children && selectedNav.children.length !== 0"
            class="update-navigation-child"
        >
            <select class="nav-children-select" v-model="selectedNavChildID">
                <option
                    v-for="navChild in selectedNav.children"
                    :key="navChild.id"
                    :value="navChild.id"
                    >{{ navChild.title }}</option
                >
            </select>
            <input
                v-if="selectedChild"
                type="text"
                v-model="selectedChild.title"
            />
            <button :disabled="requesting" class="update">განახლება</button>
            <button :disabled="requesting" type="button" class="delete">
                წაშლა
            </button>
        </form>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import LanguageSelect from "@/components/LanguageSelect";
import AddNavigationForm from "@/components/Navigation/AddNavigationForm";
import DeleteNavigationForm from "@/components/Navigation/DeleteNavigationForm";

export default {
    name: "NavigationController",
    components: {
        AddNavigationForm,
        DeleteNavigationForm,
        LanguageSelect
    },
    computed: {
        ...mapGetters({
            allNavigations: "navigation/all",
            allLanguages: "language/all"
        }),
        selectedNav() {
            return {
                ...this.allNavigations.find(
                    entry => entry.id === this.selectedNavID
                )
            };
        },
        selectedChild() {
            if (this.selectedNav.children) {
                return {
                    ...this.selectedNav.children.find(
                        entry => entry.id === this.selectedNavChildID
                    )
                };
            }
            return null;
        }
    },
    data() {
        return {
            selectedNavID: 1,
            selectedNavChildID: null,
            selectedLangID: 1,
            requesting: false
        };
    },
    methods: {
        ...mapActions({
            fetchAll: "navigation/fetch",
            deleteNav: "navigation/delete"
        }),
        refetch() {
            this.fetchAll(this.selectedLangID);
        },
        languageUpdated(e) {
            this.selectedLangID = e.id;
            this.refetch();
        }
    }
};
</script>

<style scoped>
.update-navigation,
.update-navigation-child {
    display: grid;
    grid-template-columns: 20% 20% 20% 20%;
    grid-column-gap: calc(20% / 3);
}

.nav-children {
    grid-column: 1 / span 3;
    display: grid;
    grid-template-columns: 30% 30% 30%;
    grid-column-gap: 5%;
}
</style>
