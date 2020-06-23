<template>
    <form class="add-navigation" @submit.prevent="addNavigation">
        <select
            class="nav-select"
            v-model.number="newNavigation.parent_id"
            required
        >
            <option :value="0" selected
                >(აირჩიეთ მშობელი თუ ამატებთ საბ-ნავიგაციას)</option
            >
            <option v-for="nav in navigations" :key="nav.id" :value="nav.id">{{
                nav.title
            }}</option>
        </select>
        <input
            spellcheck="false"
            type="text"
            v-model="newNavigation.title"
            placeholder="სათაური"
            required
        />
        <input
            spellcheck="false"
            type="text"
            v-model="newNavigation.slug"
            placeholder="სლაგი"
            required
        />
        <input
            spellcheck="false"
            type="number"
            v-model.number="newNavigation.order_id"
            placeholder="რიგის ნომერი"
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
        order_id: null
    };
}

export default {
    name: "AddNavigationForm",
    props: {
        langID: {
            type: Number,
            required: true
        },
        navigations: {
            type: Array,
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
    grid-template-columns: 45% 45%;
    grid-column-gap: calc(10% / 2);
    grid-row-gap: 20px;
}

.add-navigation button.add {
    grid-column: 1 / span 2;
    width: 45%;
    justify-self: center;
}
</style>
