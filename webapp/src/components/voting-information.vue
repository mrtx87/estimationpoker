<template>
    <div class="voting-information-wrapper">
        Es haben {{ votes.length }} von {{ participants.length}} abgestimmt
    </div>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";
import {Roles} from "@/constants/vue-constants";

export default {
    name: "voting-information",
    components: {
    },
    props: ['estimation'],
    created() {
        this.appStore = useAppStateStore();
    },
    data: function () {
        return {
            appStore: null,
        }
    },
    methods: {},
    computed: {
        votes() {
            return this.appStore.room ? this.appStore.room.currentEstimation.votes : [];
        },
        participants() {
            return this.appStore.users ? this.appStore.users.filter(u => this.appStore.room.connections.includes(u.id) && u.roles.includes(Roles.PARTICIPANT) )  : [];
        }
    }
};
</script>

<style lang="scss">

.voting-information-wrapper {

}

</style>
