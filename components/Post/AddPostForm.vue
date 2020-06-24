<template>
    <form class="add-post-form" @submit.prevent="addPost">
        <LanguageSelect
            :required="true"
            :languages="allLanguages"
            :defaultValue="newPost.lang_id"
            @input="newPost.lang_id = $event.id"
        />
        <select required v-model="newPost.type_id">
            <option v-for="type in types" :key="type.id" :value="type.id">{{
                type.name
            }}</option>
        </select>
        <input
            spellcheck="false"
            type="text"
            v-model="newPost.title"
            placeholder="სათაური"
            required
        />
        <input
            spellcheck="false"
            type="text"
            v-model="newPost.subtitle"
            placeholder="საბ სათაური"
            required
        />
        <input
            spellcheck="false"
            type="text"
            v-model="newPost.slug"
            placeholder="სლაგი"
        />
        <input
            spellcheck="false"
            type="number"
            v-model.number="newPost.order_id"
            placeholder="რიგის ნომერი"
            required
        />
        <textarea
            class="post-text"
            spellcheck="false"
            type="text"
            v-model="newPost.text"
            placeholder="ტექსტი"
        ></textarea>
        <div class="post-is-pinned">
            <span>დაპინულია</span>
            <input type="checkbox" v-model="newPost.is_pinned" />
        </div>
        <button :disabled="requesting" class="add">დამატება</button>
    </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import LanguageSelect from "@/components/Language/LanguageSelect";

function newPostTemplate() {
    return {
        title: null,
        subtitle: null,
        text: null,
        type_id: 1,
        order_id: null,
        lang_id: 1,
        slug: null,
        is_pinned: false
    };
}

export default {
    name: "AddPostForm",
    components: {
        LanguageSelect
    },
    computed: {
        ...mapGetters({
            allLanguages: "language/all",
            types: "post/types"
        })
    },
    data() {
        return {
            newPost: newPostTemplate(),
            requesting: false
        };
    },
    methods: {
        ...mapActions({
            add: "post/add"
        }),
        async addPost() {
            this.requesting = true;
            const params = {
                ...this.newPost
            };
            const res = await this.add(params);
            this.$emit("actionMade", params.lang_id);
            if (res) {
                this.newPost = newPostTemplate();
            }
            this.requesting = false;
        }
    }
};
</script>

<style scoped>
.add-post-form {
    display: grid;
    grid-template-columns: 45% 45%;
    grid-column-gap: 10%;
    grid-row-gap: 20px;
}

.add-post-form button.add {
    grid-column: 1 / span 2;
    width: 45%;
    justify-self: center;
}

.post-is-pinned {
    grid-column: 1 / span 2;
}
</style>
