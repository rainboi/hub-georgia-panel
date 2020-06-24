<template>
    <div class="partner-controller">
        <LanguageSelect
            :required="true"
            :languages="allLanguages"
            :defaultValue="selectedLangID"
            @input="languageUpdated"
        />
        <hr />
        <AddPartner :langID="selectedLangID" @actionMade="refetch" />
        <hr />
        <DeleteOrUpdatePartnerForm
            :partners="allPartners"
            @actionMade="refetch"
        />
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import LanguageSelect from "@/components/Language/LanguageSelect";
import AddPartner from "@/components/Partner/AddPartnerForm";
import DeleteOrUpdatePartnerForm from "@/components/Partner/DeleteOrUpdatePartnerForm";

export default {
    name: "PartnerController",
    components: {
        LanguageSelect,
        AddPartner,
        DeleteOrUpdatePartnerForm
    },
    computed: {
        ...mapGetters({
            allPartners: "partner/all",
            allLanguages: "language/all"
        })
    },
    data() {
        return {
            selectedLangID: 1
        };
    },
    methods: {
        ...mapActions({ fetchAll: "partner/fetch" }),
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
</style>