<template>
    <div class="language-controller">
        <AddLanguageForm @actionMade="refetch" />
        <hr />
        <form submit.prevnet class="language">
            <LanguageSelect
                :defaultValue="1"
                :languages="all"
                @input="selectedLanguage = $event"
            />
            <input type="text" v-model="selectedLanguage.language" />
            <input type="text" v-model="selectedLanguage.lang_acronym" />
            <button class="update">განახლება</button>
            <button class="delete">წაშლა</button>
        </form>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import LanguageSelect from "@/components/Language/LanguageSelect";
import AddLanguageForm from "@/components/Language/AddLanguageForm";

export default {
    name: "LanguageController",
    components: {
        LanguageSelect,
        AddLanguageForm
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
.language {
    display: grid;
    grid-template-columns: 16% 16% 16% 16% 16%;
    grid-column-gap: calc(20% / 4);
}
</style>
