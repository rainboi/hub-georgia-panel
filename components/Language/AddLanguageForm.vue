<template>
    <form @submit.prevent="submit" class="add-language-form">
        <input
            spellcheck="flase"
            type="text"
            v-model="newLanguage.language"
            placeholder="ენა"
            required
        />
        <input
            type="text"
            spellcheck="false"
            v-model="newLanguage.lang_acronym"
            placeholder="აკრონიმი"
            required
        />
        <input
            spellcheck="false"
            type="number"
            v-model.number="newLanguage.order_id"
            placeholder="რიგის ნომერი"
            required
        />
        <button class="add">დამატება</button>
    </form>
</template>

<script>
import { mapActions } from "vuex";

function newLanguageTemplate() {
    return {
        language: null,
        lang_acronym: null,
        order_id: null
    };
}

export default {
    name: "AddLanguageForm",
    data() {
        return {
            newLanguage: newLanguageTemplate(),
            requesting: false
        };
    },
    methods: {
        ...mapActions({ addLanguage: "language/add" }),
        async submit() {
            this.requesting = true;
            const params = { ...this.newLanguage };
            // temp
            params.lang_id = Math.floor(Math.random() * 100000 + 500);
            // temp
            const res = await this.addLanguage(params);
            if (res) {
                this.newLanguage = newLanguageTemplate();
            }
            this.$emit("actionMade");
            this.requesting = false;
        }
    }
};
</script>

<style scoped>
.add-language-form {
    display: grid;
    grid-template-columns: 20% 20% 20% 20%;
    grid-column-gap: calc(20% / 4);
}
</style>