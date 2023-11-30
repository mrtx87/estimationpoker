<template>
    <div class="vote-card-wrapper">
        {{value}}
    </div>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";

export default {
    name: "Vote-Card",
    props:['value'],
    created() {
        this.appState = useAppStateStore();
    },
    data: function () {
        return {
            appState: null,
        }
    },
    methods: {},
    computed: {}
};
</script>

<style lang="scss">

.vote-card-wrapper {
    display: flex;
    width: 10%;
    text-align: center;
    align-items: center;
    justify-content: center;
    height: 150px;
    border: 1px solid black;
    border-radius: 4px;
    background-color: #9f92e4;
}

</style>
