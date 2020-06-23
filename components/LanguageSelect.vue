<template>
    <select
        class="language-select"
        v-model.number="_value"
        :required="required"
    >
        <option v-for="lang in languages" :key="lang.id" :value="lang.id"
            >{{ lang.language }} - {{ lang.lang_acronym }}</option
        >
    </select>
</template>

<script>
export default {
    name: "LanguageSelect",
    props: {
        languages: {
            type: Array,
            required: true
        },
        defaultValue: {
            type: Number,
            default: null
        },
        required: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        _value: {
            get: function() {
                return this.value;
            },
            set: function(val) {
                this.emitInput(val);
                this.value = val;
            }
        }
    },
    data() {
        return {
            value: this.defaultValue
        };
    },
    methods: {
        emitInput(ID) {
            let lang = this.languages.find(entry => entry.id === ID);
            if (lang) {
                this.$emit("input", lang);
            }
        }
    },
    created() {
        if (this.defaultValue) {
            this.emitInput(this.defaultValue);
        }
    }
};
</script>

<style scoped></style>
