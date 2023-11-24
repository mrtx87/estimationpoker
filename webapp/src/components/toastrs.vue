<template>
    <transition-group name="toast-transition" tag="div" class="toastr-wrapper">

        <div class="toast toast-transition-item" :class="toast.type"
             v-on:click="removeToast(toast.id)"
             v-for="toast in appState.toastrs"
             :key="toast.id">
            <img :src="require(`../assets/images/${toast.type}.svg`)">
            <span>{{toast.message}}</span>
        </div>
    </transition-group>
</template>

<script>

    import {useAppStateStore} from "../stores/app-state";

    export default {
        name: 'toastrs-vue',
        components: {},
        created() {
            this.appState = useAppStateStore();
        },
        beforeMount() {
        },
        watch: {},
        data() {
            return {
                appState: null
            }
        },
        computed: {},
        methods: {
            removeToast: function (toastId) {
                this.appState.removeToast(toastId);
            }
        }
    }

</script>

<style scoped>

    .toastr-wrapper {
        justify-self: center;
        top: 50px;
        position: absolute;
        z-index: 300;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        max-height: 50vh;
        width: 25vw;
        max-width: 350px;
        min-width: 250px;
        box-sizing: border-box;
    }

    .toast {
        display: flex;
        gap: 0 0.75rem;
        background-color: var(--toast-color);
        padding: 0.5rem;
        color: white;
        width: 100%;
        box-sizing: border-box;
        box-shadow: 0 0 12px #999;
        border-radius: 3px;
        cursor: pointer;
        align-items: center;
        height: 70px;
        transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
        font-size:17px;
        box-sizing: border-box;
    }

    .toast img {
        width: 5vw;
        max-width: 35px;
        height:auto;
    }

    .error {
        background-color: var(--dark-error);
    }

    .warn {
        background-color: var(--warn-color);
    }

    .success {
        background-color: var(--success);
    }

    .toast-transition-enter-active,
    .toast-transition-leave-active,
    .toast-transition-move {
        transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
    }

    .toast-transition-leave-active {
        position: absolute;
    }


    .toast-transition-enter-from {
        opacity: 0;

    }

    .toast-transition-leave-to {
        opacity: 0;
        z-index: -1;
    }

</style>
