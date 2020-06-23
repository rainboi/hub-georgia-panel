<template>
    <div class="navigation-controller">
        <LanguageSelect
            :required="true"
            :languages="allLanguages"
            :defaultValue="selectedLangID"
            @input="languageUpdated"
        />

        <hr />

        <AddNavigationForm
            :navigations="allNavigations"
            @actionMade="refetch"
            :langID="selectedLangID"
        />

        <hr />

        <DeleteOrUpdateNavigationForm
            :navigations="allNavigations"
            @input="selectedNavID = $event"
            @actionMade="refetch"
        />

        <div
            v-if="
                selectedNav &&
                    selectedNav.children &&
                    selectedNav.children.length !== 0
            "
            class="sub-navs"
        >
            <hr />

            <h3>{{ selectedNav.title }} --- საბ-ნავიგაციები</h3>

            <DeleteOrUpdateNavigationForm
                :navigations="selectedNav.children"
                @actionMade="refetch"
            />
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import LanguageSelect from "@/components/LanguageSelect";
import AddNavigationForm from "@/components/Navigation/AddNavigationForm";
import DeleteOrUpdateNavigationForm from "@/components/Navigation/DeleteOrUpdateNavigationForm";

export default {
    name: "NavigationController",
    components: {
        AddNavigationForm,
        DeleteOrUpdateNavigationForm,
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
        }
    },
    data() {
        return {
            selectedNavID: 1,
            selectedLangID: 1,
            requesting: false
        };
    },
    methods: {
        ...mapActions({
            fetchAll: "navigation/fetch"
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

.sub-navs h3 {
    margin-bottom: 15px;
}
</style>
