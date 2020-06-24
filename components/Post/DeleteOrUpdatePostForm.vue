<template>
    <form class="delete-or-update-post-form" @submit.prevent="deletePost">
        <LanguageSelect
            :required="true"
            :languages="allLanguages"
            :defaultValue="selectedLangID"
            @input="languageUpdated"
        />
        <hr />
        <select class="post-select" v-model="selectedPostID" required>
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
        <button :disabled="requesting" class="delete">წაშლა</button>
        <button
            type="button"
            @click="updatePost"
            :disabled="requesting"
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
    name: "DeleteOrUpdatePostForm",
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
        selectedPost() {
            this.$emit("input", this.selectedPostID);
            let selected = this.posts.find(
                entry => entry.post_id === this.selectedPostID
            );
            if (selected) {
                return { ...selected };
            } else {
                return {
                    title: null,
                    slug: null,
                    order_id: null
                };
            }
        }
    },
    data() {
        return {
            selectedLangID: 1,
            selectedPostID: null,
            requesting: false
        };
    },
    methods: {
        ...mapActions({
            delete: "post/delete",
            update: "post/update"
        }),
        languageUpdated(e) {
            this.selectedLangID = e.id;
            this.$emit("actionMade", this.selectedLangID);
        },
        async deletePost() {
            this.requesting = true;
            await this.delete(this.selectedPostID);
            this.$emit("actionMade", this.selectedLangID);
            this.requesting = false;
        },
        async updatePost() {
            this.requesting = true;
            await this.update(this.selectedPost);
            this.$emit("actionMade", this.selectedLangID);
            this.requesting = false;
        }
    }
};
</script>

<style scoped>
.delete-or-update-post-form {
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
</style>
