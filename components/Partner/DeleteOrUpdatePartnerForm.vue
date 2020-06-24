<template>
    <form class="delete-or-update-partner-form" @submit.prevent="deletePartner">
        <select class="partner-select" v-model="selectedPartnerID" required>
            <option
                v-for="partner in partners"
                :key="partner.id"
                :value="partner.id"
                >{{ partner.title }}</option
            >
        </select>
        <input
            spellcheck="false"
            type="text"
            v-model="selectedPartner.title"
            placeholder="სახელი"
            required
        />
        <input
            spellcheck="false"
            type="text"
            v-model="selectedPartner.logo"
            placeholder="ლოგო url"
            required
        />
        <input
            spellcheck="false"
            type="text"
            v-model="selectedPartner.description"
            placeholder="აღწერა"
        />
        <input
            spellcheck="false"
            type="text"
            v-model="selectedPartner.url"
            placeholder="web მისამართი"
        />
        <input
            spellcheck="false"
            type="number"
            v-model.number="selectedPartner.order_id"
            placeholder="რიგის ნომერი"
            required
        />
        <button :disabled="requesting" class="delete">წაშლა</button>
        <button
            type="button"
            @click="updatePartner"
            :disabled="requesting"
            class="update"
        >
            განახლება
        </button>
    </form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: "DeleteOrUpdatePartnerForm",
    props: {
        partners: {
            type: Array,
            required: true
        }
    },
    computed: {
        selectedPartner() {
            this.$emit("input", this.selectedPartnerID);
            let selected = this.partners.find(
                entry => entry.id === this.selectedPartnerID
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
            selectedPartnerID: null,
            requesting: false
        };
    },
    methods: {
        ...mapActions({
            delete: "partner/delete",
            update: "partner/update"
        }),
        async deletePartner() {
            this.requesting = true;
            await this.delete(this.selectedPartnerID);
            this.$emit("actionMade");
            this.requesting = false;
        },
        async updatePartner() {
            this.requesting = true;
            await this.update(this.selectedPartner);
            this.$emit("actionMade");
            this.requesting = false;
        }
    }
};
</script>

<style scoped>
.delete-or-update-partner-form {
    display: grid;
    grid-template-columns: 45% 45%;
    grid-column-gap: calc(10% / 2);
    grid-row-gap: 20px;
}

input:disabled {
    background-color: var(--dark-gray);
    color: var(--white);
}
</style>
