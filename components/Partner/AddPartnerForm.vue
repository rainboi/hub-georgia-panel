<template>
    <form class="add-partner" @submit.prevent="addPartner">
        <input
            spellcheck="false"
            type="text"
            v-model="newPartner.title"
            placeholder="სახელი"
            required
        />
        <input
            spellcheck="false"
            type="text"
            v-model="newPartner.logo"
            placeholder="ლოგო url"
            required
        />
        <input
            spellcheck="false"
            type="text"
            v-model="newPartner.description"
            placeholder="აღწერა"
        />
        <input
            spellcheck="false"
            type="text"
            v-model="newPartner.url"
            placeholder="web მისამართი"
        />
        <input
            spellcheck="false"
            type="number"
            v-model.number="newPartner.order_id"
            placeholder="რიგის ნომერი"
            required
        />
        <button :disabled="requesting" class="add">დამატება</button>
    </form>
</template>

<script>
import { mapActions } from "vuex";

function newPartnerTemplate() {
    return {
        logo: null,
        title: null,
        description: null,
        url: null,
        order_id: null,
        lang_id: 1
    };
}

export default {
    name: "AddPartnerForm",
    props: {
        langID: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            newPartner: newPartnerTemplate(),
            requesting: false
        };
    },
    methods: {
        ...mapActions({
            add: "partner/add"
        }),
        async addPartner() {
            this.requesting = true;
            const params = {
                ...this.newPartner
            };
            params.lang_id = this.langID;
            const res = await this.add(params);
            this.$emit("actionMade");
            if (res) {
                this.newPartner = newPartnerTemplate();
            }
            this.requesting = false;
        }
    }
};
</script>

<style scoped>
.add-partner {
    display: grid;
    grid-template-columns: 45% 45%;
    grid-column-gap: calc(10% / 2);
    grid-row-gap: 20px;
}

.add-partner button.add {
    grid-column: 1 / span 2;
    width: 45%;
    justify-self: center;
}
</style>
