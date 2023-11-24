<template>
    <div class="voice-chat-toggle">
        <button v-if="!voiceChatDisabled" v-on:click="toggleMuteLocalPlayer()" class="plain-btn">
            <img class="global-mute-toggle" src="../assets/mic.svg" alt="microphone">
            <img v-show="localPlayerIsMuted || fullMute" class="slash" src="../assets/slash.svg" alt="slash">
        </button>

        <button v-if="!voiceChatDisabled" v-on:click="toggleMuteAll()" class="plain-btn">
            <img class="global-full-mute-toggle" src="../assets/headphones.svg" alt="headphones">
            <img v-show="fullMute" class="slash" src="../assets/slash.svg" alt="slash">
        </button>

        <button v-if="voiceChatDisabled" v-on:click="enterVoiceChat()"
                class="plain-btn global-toggle-enter-leave-voice-chat" title="enter voice chat">
            <div>Voice Chat</div>
            <img src="../assets/enter.svg" alt="enter voice chat">
        </button>

        <button v-if="!voiceChatDisabled" v-on:click="leaveVoiceChat()"
                class="plain-btn global-toggle-enter-leave-voice-chat" title="leave voice chat">
            <img src="../assets/exit.svg" alt="leave voice chat">
        </button>
    </div>
</template>

<script>

    import {Logger} from "@/services/util";


    export default {
        name: 'VoiceChatToggle',
        props: [],
        emits: ['onToggleMuteAll', 'onToggleMuteLocalPlayer', 'onEnterVoiceChat'],
        components: {},
        data() {
            return {}
        },
        watch: {},
        methods: {
            toggleMuteAll: function () {
                this.$emit('onToggleMuteAll', true)
            },
            toggleMuteLocalPlayer: function () {
                this.$emit('onToggleMuteLocalPlayer', true)
            },
            enterVoiceChat: function () {
                this.$emit('onEnterVoiceChat', true)
            },
            leaveVoiceChat: function () {
                this.$emit('onEnterVoiceChat', false)
            }
        },
        computed: {
            localPlayerIsMuted: function () {
                return this.$store.state.localPlayerIsMuted;
            },
            playersInVoiceChat: function () {
                return this.$store.state.playersInVoiceChat;
            },
            localPlayerId: function () {
                return this.$store.state.playerId;
            },
            fullMute: function () {
                return this.$store.state.fullMute;
            },
            voiceChatDisabled: function () {
                return !this.playersInVoiceChat.includes(this.localPlayerId)
            },
        }
    }
</script>

<style scoped lang="scss">

    .voice-chat-toggle {
        background-color: #322046;
        border-radius: 10px;
        position: absolute;
        top: 10px;
        right: 50px;
        z-index: 55555;
        display: flex;
        gap: 10px;
        padding: 4px;
        align-items: center;


        .global-mute-toggle {
            width: 15px;
            height: auto;
        }

        .global-full-mute-toggle {
            width: 20px;
            height: auto;
        }

        .global-toggle-enter-leave-voice-chat {
            gap: 5px;
            color: white;

            div {
                line-break: strict;
                font-size: min(max(9px, 1.1vw), 12px);
                line-height: min(max(10px, 1.2vw), 13px);
            }

            img {
                width: 20px;
                height: auto;
            }
        }

        .slash {
            position: absolute;
            transform: rotateX(180deg);
        }
    }

</style>