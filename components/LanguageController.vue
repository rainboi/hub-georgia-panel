<template>
    <div class="language-controller">
        <form submit.prevnet class="add-language">
            <input
                type="text"
                v-model="newLanguage.language"
                placeholder="ენა"
            />
            <input
                type="text"
                v-model="newLanguage.lang_acronym"
                placeholder="აკრონიმი"
            />
            <input
                type="text"
                v-model.number="newLanguage.lang_id"
                placeholder="ID"
            />
            <button class="add">დამატება</button>
        </form>
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
import LanguageSelect from "@/components/LanguageSelect";

export default {
    name: "LanguageController",
    components: {
        LanguageSelect
    },
    computed: {
        ...mapGetters({ all: "language/all" })
    },
    data() {
        return {
            selectedLanguage: {},
            newLanguage: {
                language: null,
                lang_acronym: null,
                lang_id: null
            }
        };
    },
    methods: {
        ...mapActions({
            fetchAll: "language/fetch",
            addLang: "language/add"
        }),
        async addLanguage() {
            const data = {
                ...this.newLanguage
            };
            const res = await this.addLang(data);
            console.log(res);
        }
    },
    created() {
        this.fetchAll();
    }
};
</script>

<style scoped>
.language,
.add-language {
    display: grid;
    grid-template-columns: 16% 16% 16% 16% 16%;
    grid-column-gap: calc(20% / 4);
}
</style>
