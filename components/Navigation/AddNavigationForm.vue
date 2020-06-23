<template>
    <form class="add-navigation" @submit.prevent="addNavigation">
        <input
            type="text"
            v-model="newNavigation.title"
            placeholder="სათაური"
            required
        />
        <input
            type="text"
            v-model="newNavigation.slug"
            placeholder="slug"
            required
        />
        <button :disabled="requesting" class="add">დამატება</button>
    </form>
</template>

<script>
import { mapActions } from "vuex";

function newNavigationTemplate() {
    return {
        title: null,
        slug: null,
        lang_id: 1,
        parent_id: 0,
        order_id: 1
    };
}

export default {
    name: "AddNavigationForm",
    props: {
        langID: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            newNavigation: newNavigationTemplate(),
            requesting: false
        };
    },
    methods: {
        ...mapActions({
            addNav: "navigation/add"
        }),
        async addNavigation() {
            this.requesting = true;
            const data = {
                ...this.newNavigation
            };
            data.lang_id = this.langID;
            const res = await this.addNav(data);
            this.$emit("actionMade");
            if (res) {
                this.newNavigation = newNavigationTemplate();
            }
            this.requesting = false;
        }
    }
};
</script>

<style scoped>
.add-navigation {
    display: grid;
    grid-template-columns: 20% 20% 20% 20%;
    grid-column-gap: calc(20% / 3);
}
</style>
