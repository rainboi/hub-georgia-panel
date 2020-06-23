<template>
    <form
        @submit.prevent="deleteLanguage"
        class="delete-or-update-language-form"
    >
        <LanguageSelect
            :defaultValue="1"
            :languages="languages"
            @input="selectedLanguage = { ...$event }"
        />
        <input
            type="text"
            v-model="selectedLanguage.language"
            placeholder="ენა"
        />
        <input
            type="text"
            v-model="selectedLanguage.lang_acronym"
            placeholder="აკრონიმი"
        />
        <input
            type="number"
            v-model.number="selectedLanguage.order_id"
            placeholder="რიგის ნომერი"
        />
        <button :disabled="requesting" class="delete">წაშლა</button>
        <button
            :disabled="requesting"
            @click="updateLanguage"
            type="button"
            class="update"
        >
            განახლება
        </button>
    </form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import LanguageSelect from "@/components/Language/LanguageSelect";

export default {
    name: "LanguageController",
    components: {
        LanguageSelect
    },
    props: {
        languages: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            selectedLanguage: {},
            requesting: false
        };
    },
    methods: {
        ...mapActions({
            delLang: "language/delete",
            updateLang: "language/update"
        }),
        async deleteLanguage() {
            this.requesting = true;
            const ID = this.selectedLanguage.id;
            const res = await this.delLang(ID);
            if (res) {
                this.selectedLanguage = {};
            }
            this.$emit("actionMade");
            this.requesting = false;
        },
        async updateLanguage() {
            this.requesting = true;
            const params = { ...this.selectedLanguage };
            const res = await this.updateLang(params);
            this.$emit("actionMade");
            this.requesting = false;
        }
    }
};
</script>

<style scoped>
.delete-or-update-language-form {
    display: grid;
    grid-template-columns: 45% 45%;
    grid-column-gap: 10%;
    grid-row-gap: 20px;
}
</style>
