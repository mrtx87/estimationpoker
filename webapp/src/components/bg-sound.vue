<template>
    <div class="bg-sound-wrapper">
        <button class="main-button bg-sound-btn" @click="toggleMute()">
            <img :class="{'hidden-sound-elem': !isMuted}" src="../assets/mute.svg">
            <img :class="{'hidden-sound-elem': isMuted}" src="../assets/unmute.svg">
        </button>
        <video ref='backgroundSound' id="" src="../assets/bg_sound.ogg" loop></video>
    </div>
</template>

<script>

    import {setCookie} from "@/services/cookie-service";

    export default {
        name: 'BanPoll',
        emits: [],
        created() {
            const userCookie = this.userCookie;
            this.isMuted = userCookie.bgSoundMuted;
            document.body.addEventListener('keydown', this.handleInteraction);
            document.body.addEventListener('click', this.handleInteraction);
            document.body.addEventListener('touchstart', this.handleInteraction);
        },
        watch: {
            userCookie: function (newCookie, oldCookie) {
                this.updateMuteState(newCookie?.bgSoundMuted);
            }
        },
        mounted() {
            const bgElem = this.$refs.backgroundSound;
            if (bgElem) {
                bgElem.volume = 0.15;
            }
        },
        data() {
            return {
                isMuted: false
            }
        },
        methods: {
            updateMuteState: function (muted) {
                this.isMuted = muted;
                this.$refs.backgroundSound.muted = muted;
            },
            toggleMute: function () {
                const newGlobalPlayerCookie = {...this.userCookie, bgSoundMuted: !this.isMuted}
                setCookie('wtfi_globalPlayer', JSON.stringify(newGlobalPlayerCookie));
                this.$store.commit('updateGlobalCookie', newGlobalPlayerCookie);
            },
            handleInteraction: function (event) {
                if (!this.initialInteractionDone) {
                    const bgSoundElem = this.$refs.backgroundSound;
                    this.store?.commit('updateInitialInteractionDone', true);
                    bgSoundElem.muted = this.isMuted;
                    bgSoundElem.play();
                }
                document.body.removeEventListener('keydown', this.handleInteraction);
                document.body.removeEventListener('click', this.handleInteraction);
                document.body.removeEventListener('touchstart', this.handleInteraction);
            }
        },
        computed: {
            userCookie: function () {
                return this.$store.state.globalPlayerCookie;
            },
            initialInteractionDone: function () {
                return this.$store.state.initialInteractionDone;
            },
        }
    }
</script>

<style scoped lang="scss">


    .bg-sound-wrapper {
        position: absolute;
        top: 50px;
        right: 9px;
        transition: all 0.25s;
        width: 35px;
        height: 35px;
        z-index: 10000;

        .hidden-sound-elem {
            display: none;
        }

        .bg-sound-btn {
            width: 100%;
            height: auto;
            border-radius: 5px;
        }

    }

</style>