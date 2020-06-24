<template>
    <form class="translate-post-form" @submit.prevent="submit">
        <LanguageSelect
            :required="true"
            :languages="allLanguages"
            :defaultValue="selectedLangID"
            @input="languageUpdated"
        />
        <LanguageSelect
            :required="true"
            :languages="
                allLanguages.filter(entry => entry.id !== selectedLangID)
            "
            :defaultValue="selectedTranslateLangID"
            @input="translateLanguageUpdated"
        />
        <hr />
        <select class="post-select" v-model="_selectedPostID" required>
            <option
                v-for="post in posts"
                :key="post.post_id"
                :value="post.post_id"
                >{{ post.title }}</option
            >
        </select>
        <select disabled :value="selectedPost.type_id">
            <option v-for="type in types" :key="type.id" :value="type.id">{{
                type.name
            }}</option>
        </select>
        <input
            spellcheck="false"
            type="text"
            v-model="selectedPost.title"
            placeholder="სათაური"
            required
        />
        <input
            spellcheck="false"
            type="text"
            v-model="selectedPost.subtitle"
            placeholder="საბ სათაური"
            required
        />
        <input
            spellcheck="false"
            type="text"
            :value="selectedPost.slug"
            placeholder="სლაგი"
            disabled
        />
        <input
            spellcheck="false"
            type="number"
            v-model.number="selectedPost.order_id"
            placeholder="რიგის ნომერი"
            required
        />
        <textarea
            class="post-text"
            spellcheck="false"
            type="text"
            v-model="selectedPost.text"
            placeholder="ტექსტი"
        ></textarea>
        <div class="post-is-pinned">
            <span>დაპინულია</span>
            <input type="checkbox" v-model="selectedPost.is_pinned" />
        </div>
        <button :disabled="requesting" class="update">
            თარგმნა
        </button>
    </form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import LanguageSelect from "@/components/Language/LanguageSelect";

export default {
    name: "TranslatePostForm",
    components: {
        LanguageSelect
    },
    props: {
        posts: {
            type: Array,
            required: true
        }
    },
    computed: {
        ...mapGetters({
            allLanguages: "language/all",
            types: "post/types"
        }),
        _selectedPostID: {
            get: function() {
                return this.selectedPostID;
            },
            set: async function(val) {
                this.selectedPostID = val;
                this.selectedPost = await this._selectedPost();
            }
        }
    },
    data() {
        return {
            selectedLangID: 1,
            selectedTranslateLangID: 2,
            selectedPostID: null,
            selectedPost: {},
            requesting: false
        };
    },
    methods: {
        ...mapActions({
            update: "post/update",
            fetchOne: "post/fetchOne"
        }),
        languageUpdated(e) {
            this.selectedLangID = e.id;
            this.$emit("actionMade", this.selectedLangID);
        },
        translateLanguageUpdated(e) {
            this.selectedTranslateLangID = e.id;
        },
        async submit() {
            this.requesting = true;
            const params = { ...this.selectedPost };
            params.lang_id = this.selectedTranslateLangID;
            await this.update(params);
            this.$emit("actionMade", this.selectedLangID);
            this.requesting = false;
        },
        async _selectedPost() {
            if (this._selectedPostID && this.selectedTranslateLangID) {
                const res = await this.fetchOne({
                    id: this._selectedPostID,
                    langID: this.selectedTranslateLangID
                });

                if (res) {
                    return res;
                }
            }

            let selected = this.posts.find(
                entry => entry.post_id === this._selectedPostID
            );

            if (selected) {
                return { ...selected };
            } else {
                return {};
            }
        }
    }
};
</script>

<style scoped>
.translate-post-form {
    display: grid;
    grid-template-columns: 45% 45%;
    grid-column-gap: calc(10% / 2);
    grid-row-gap: 20px;
}

input:disabled,
select:disabled {
    background-color: var(--dark-gray);
    color: var(--white);
}

.post-is-pinned,
.language-select,
hr {
    grid-column: 1 / span 2;
}

hr {
    width: 50%;
    margin: 0 auto;
}

.update {
    grid-column: 1 / span 2;
    width: 45%;
    margin: 0 auto;
}
</style>
