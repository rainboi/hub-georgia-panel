<template>
    <div class="language-controller">
        <AddLanguageForm @actionMade="refetch" />
        <hr />
        <DeleteOrUpdateLanguageForm :languages="all" @actionMade="refetch" />
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import LanguageSelect from "@/components/Language/LanguageSelect";
import AddLanguageForm from "@/components/Language/AddLanguageForm";
import DeleteOrUpdateLanguageForm from "@/components/Language/DeleteOrUpdateLanguageForm";

export default {
    name: "LanguageController",
    components: {
        LanguageSelect,
        AddLanguageForm,
        DeleteOrUpdateLanguageForm
    },
    computed: {
        ...mapGetters({ all: "language/all" })
    },
    data() {
        return {
            selectedLanguage: {}
        };
    },
    methods: {
        ...mapActions({
            fetchAll: "language/fetch"
        }),
        async refetch() {
            await this.fetchAll();
        }
    }
};
</script>

<style scoped>
</style>
