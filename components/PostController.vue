<template>
    <div class="post-controller">
        <hr />
        <AddPostForm @actionMade="refetch" />
        <hr />
        <DeleteOrUpdatePostForm :posts="all" @actionMade="refetch" />
        <hr />
        <TranslatePostForm :posts="all" @actionMade="refetch" />
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AddPostForm from "@/components/Post/AddPostForm";
import DeleteOrUpdatePostForm from "@/components/Post/DeleteOrUpdatePostForm";
import TranslatePostForm from "@/components/Post/TranslatePostForm";

export default {
    name: "PostController",
    components: {
        AddPostForm,
        DeleteOrUpdatePostForm,
        TranslatePostForm
    },
    computed: {
        ...mapGetters({
            all: "post/all",
            allLanguages: "language/all"
        })
    },
    data() {
        return {
            selectedLangID: 1
        };
    },
    methods: {
        ...mapActions({
            fetchAll: "post/fetch"
        }),
        refetch(langID) {
            this.fetchAll(langID ? langID : this.selectedLangID);
        }
        // languageUpdated(e) {
        //     this.selectedLangID = e.id;
        //     this.refetch();
        // }
    }
};
</script>

<style scoped>
</style>

<style>
.post-text {
    /* resize: none; */
    resize: vertical;
    grid-column: 1 / span 2;
    min-height: 150px;
    border-radius: 5px;
}
</style>