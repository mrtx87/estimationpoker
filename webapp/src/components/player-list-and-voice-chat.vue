<template>
    <div class="player-list-wrapper" v-if="players" :class="{'open':open, 'close':animClose}"  @animationend="onAnimEnd">
        <button class="player-list-header" aria-label="close player list" v-on:click="interToggleOpenClose()">
            Players
        </button>

        <button class="close-players" aria-label="close player list" v-on:click="interToggleOpenClose()">
            <img src="../assets/close.svg" alt="close player list">
        </button>
        <div class="local-player-row" v-if="localPlayer">
            <div class="voice-chat-inner-title">
                Voice Chat
            </div>
            <lobby-avatar class="list-avatar is-local-player" v-bind:noPlayerName="true"
                          v-bind:lobbyPlayer="localPlayer"></lobby-avatar>
            <div class="list-player-name">{{localPlayer?.name}}</div>
            <div>
                <button v-if="!voiceChatDisabled" v-on:click="toggleMuteLocalPlayer()"
                        class="plain-btn mute-toggle" title="mute/unmute local player">
                    <img class="mute-toggle-mic" src="../assets/mic.svg" alt="microphone">
                    <img v-show="localPlayerIsMuted || fullMute" class="slash" src="../assets/slash.svg" alt="slash">
                </button>
            </div>
            <div>
                <button v-if="!voiceChatDisabled" v-on:click="toggleMuteAll()" title="mute/unmute all"
                        class="plain-btn headphones-mute-toggle">
                    <img class="disable-voice-chat" src="../assets/headphones.svg" alt="headphones">
                    <img v-show="fullMute" class="slash" src="../assets/slash.svg" alt="slash">
                </button>
            </div>

            <div>
                <button v-if="voiceChatDisabled" v-on:click="enterVoiceChat()"
                        class="plain-btn headphones-mute-toggle" title="enter voice chat">
                    <img class="disable-voice-chat" src="../assets/enter.svg" alt="enter voice chat">
                </button>

                <button v-if="!voiceChatDisabled" v-on:click="leaveVoiceChat()"
                        class="plain-btn headphones-mute-toggle" title="leave voice chat" alt="leave voice chat">
                    <img class="disable-voice-chat" src="../assets/exit.svg">
                </button>
            </div>

        </div>
        <div class="player-list-content" :class="{'open':open}">
            <div class="player-row" v-for="pl in displayedPlayers"
                 :key="pl.id">
                <lobby-avatar class="list-avatar" v-bind:noPlayerName="true" v-bind:lobbyPlayer="pl"></lobby-avatar>
                <div class="list-player-name">{{pl.name}}</div>
                <div>
                    <button class="plain-btn toggle-player-mute"
                            v-on:click="muteRemotePlayerLocally(pl.id)"
                            v-if="pl?.pc"
                            title="mute/unmute">
                        <img class="speaker" src="../assets/speaker.svg">
                        <img v-show="pl.pc.localMuted" class="mute-speaker" src="../assets/slash.svg">
                    </button>
                </div>
                <audio style="display:none;" :id="'remote_audio_elem_id'+pl.id" autoplay></audio>
            </div>
        </div>
    </div>
</template>

<script>

    import LobbyAvatar from "@/components/lobby-avatar";
    import {AuthenticatedRequest} from "@/model/authenticated-request.model";
    import {
        RequestMessageType, SIGNALING_ANSWER_PEER_CONNECTION, SIGNALING_BROADCAST_ICE_CANDIDATE,
        SIGNALING_OFFER_PEER_CONNECTION, WANTS_TO_VOICE_CHAT
    } from "@/constants/vue-constants";
    import {WebRTCConnectionSession} from "@/model/WebRTCConnectionSession";
    import {Logger} from "@/services/util";

    const servers = {
        iceServers: [
            {
                urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
            },
        ],
        iceCandidatePoolSize: 10,
    };

    const REMOTE_AUDIO_ELEM_ID = 'remote_audio_elem_id'

    export default {
        name: 'PlayerListAndVoiceChat',
        components: {LobbyAvatar},
        emits: ['onInnerToggleOpenCloseChange'],
        props: [
            'players', 'extOpen', 'disconnectedIds', 'voiceChatSignalUpdate', 'playersInVoiceChat'
        ],
        beforeMount: function () {
            const onFrame = function () {
                const localPlayerIsMuted = !this.localStream || !this.localStream?.getAudioTracks()[0].enabled;
                if (localPlayerIsMuted !== this.localPlayerIsMuted) {
                    this.$store.commit('updateLocalPlayerIsMuted', localPlayerIsMuted);
                    const data = {muted: localPlayerIsMuted, fullMute: this.fullMute}
                    this.sendLocalMuteChangeViaDataChannel(data);
                }

                this.peerConnections.forEach(pc => {
                    const audioElem = document.getElementById(REMOTE_AUDIO_ELEM_ID + pc.connectedTo);
                    pc.localMuted = audioElem ? audioElem.muted : true;
                });

                this.$store.commit('updatePeerConnections', new Map(this.peerConnections));

                window.requestAnimationFrame(onFrame);
            }.bind(this);
            window.requestAnimationFrame(onFrame);
        },
        data() {
            return {
                open: false,
                animClose: false
            }
        },
        watch: {
            extOpen: function (newVal, oldVal) {
                this.open = newVal;
            },
            voiceChatSignalUpdate: function (nextVoiceChatSignalUpdate, previousVoiceChatSignalUpdate) {
                this.processVoiceChatSignalUpdate(nextVoiceChatSignalUpdate);
            },
            playersInVoiceChat: function (newPlayersInVoiceChat, previousPlayersInVoiceChat) {
                const removedPlayerIds = previousPlayersInVoiceChat.filter(id => !newPlayersInVoiceChat.includes(id));
                const addedPlayers = newPlayersInVoiceChat.filter(id => !previousPlayersInVoiceChat.includes(id));

                const localPlayerJoinedVoiceChat = addedPlayers.find(pid => pid === this.localPlayerId);
                if (localPlayerJoinedVoiceChat) {
                    this.updateFullMute(false);
                    this.initPeerConnectionsAndSendOffers();
                }

                removedPlayerIds.forEach(pid => {
                    const connection = this.peerConnections.get(pid);
                    if (connection) {
                        connection.close();
                        this.peerConnections.delete(pid);
                    }
                });
            }
        },
        methods: {
            muteRemotePlayerLocally: function (pid) {
                const elem = document.getElementById(REMOTE_AUDIO_ELEM_ID + pid);
                if (elem) {
                    elem.muted = !elem.muted;
                }
            },
            playerIsInVoiceChat: function (playerId) {
                return this.playersInVoiceChat.includes(playerId);
            },
            onAnimEnd: function() {
              this.animClose = false;
            },
            interToggleOpenClose: function () {
                this.open = !this.open;
                if(!this.open) {
                    this.animClose = true;
                }else{
                    this.animClose = false;
                }
                this.$emit('onInnerToggleOpenCloseChange', this.open);
            },
            isDisconnected: function (player) {
                return player && this.disconnectedIds ? this.disconnectedIds.includes(player.id) : false;
            },
            notLocalPlayer: function (id) {
                return id !== this.localPlayerId;
            },
            getLocalInputStream: function () {
                return navigator.mediaDevices.getUserMedia({video: false, audio: true})
                    .then(mediaStream => {
                        this.$store.commit('updateLocalVoiceInputStream', mediaStream);
                    });
            },
            initPeerConnectionsAndSendOffers: function () {
                this.otherPlayersInVoiceChat.forEach(playerId => {
                    const newPeerConnection = this.initPeerConnection(playerId);
                    this.addPerConnectionSafe(newPeerConnection);
                });
                this.sendOffers();
            },
            addPerConnectionSafe: function (newPeerConnection) {
                const existingConnection = this.peerConnections.get(newPeerConnection.connectedTo);
                if (existingConnection) {
                    existingConnection.close();
                }
                this.peerConnections.set(newPeerConnection.connectedTo, newPeerConnection);
            },
            initPeerConnection: function (connectedTo) {
                const peerConnections = this.peerConnections;
                const peerConnection = new WebRTCConnectionSession(servers, connectedTo);
                peerConnection.onconnectionstatechange = function (event) {
                    const peerConnection = event.target;
                    Logger.log('connection-state: ' + peerConnection.connectionState)
                    switch (peerConnection.connectionState) {
                        case "connected":
                            break;
                        case "disconnected":
                        case "failed":
                        case "closed": {
                            peerConnections.delete(peerConnection.connectedTo);
                            Logger.warn(peerConnection.connectedTo + ' left voice chat')
                        }
                            break;
                    }
                }

                const outgoingDataChannel = peerConnection.createDataChannel(this.localPlayerId);
                outgoingDataChannel.addEventListener('open', event => {
                    const data = {muted: this.localPlayerIsMuted, fullMute: this.fullMute};
                    this.sendLocalMuteChangeViaDataChannel(data);
                });

                outgoingDataChannel.addEventListener('close', event => {
                    Logger.warn('data channel closed')
                });
                peerConnection.outgoingDataChannel = outgoingDataChannel;

                peerConnection.addEventListener('datachannel', event => {
                    const incomingDataChannel = event.channel;
                    peerConnection.incomingDataChannel = incomingDataChannel;

                    incomingDataChannel.addEventListener('message', event => {
                        const message = JSON.parse(event.data);
                        Logger.log('message:', message)

                        if ('muted' in message) {
                            peerConnection.remoteMuted = message.muted;
                        }

                        if ('fullMute' in message) {
                            peerConnection.remoteFullMute = message.fullMute;
                        }
                    });
                });

                peerConnection.oniceconnectionstatechange = function (event) {
                    const peerConnection = event.target;
                    Logger.log('ice-connection-state: ' + peerConnection.iceConnectionState);
                    switch (peerConnection.iceConnectionState) {
                        case "connected":
                            break;
                        case "checking":
                            break;
                        case "disconnected":
                        case "failed":
                        case "closed": {
                            peerConnection.close();
                            peerConnections.delete(peerConnection.connectedTo);
                            Logger.warn(peerConnection.connectedTo + ' left voice chat')
                        }
                            break;
                    }
                }
                peerConnection.onsignalingstatechange = function (event) {
                    Logger.log(peerConnection.signalingState)
                };

                peerConnection.onicecandidate = (event) => {
                    if (event.candidate) {
                        this.sendIceCandidate(event.candidate, peerConnection);
                    }
                };

                peerConnection.ontrack = (event) => {
                    const remoteStreamElem = document.getElementById(REMOTE_AUDIO_ELEM_ID + peerConnection.connectedTo);
                    const remoteInputStream = event.streams[0]
                    remoteStreamElem.srcObject = remoteInputStream;
                    peerConnection.stream = remoteInputStream;
                }

                this.initPushLocalStreamData(peerConnection);
                return peerConnection;
            },
            initPushLocalStreamData: function (peerConnection) {
                if (this.localStream) {
                    this.localStream.getAudioTracks().forEach((track) => {
                        peerConnection.sender = peerConnection.addTrack(track, this.localStream);
                    });
                }
            },
            closeVoiceChat: function () {
                this.disableVoiceChat();
                this.sendWantsToDeactivateVoiceChat();
            },
            sendOffers: function () {
                this.peerConnections.forEach(peerConnection =>
                    peerConnection.createOffer()
                        .then(offerDescription => peerConnection.setLocalDescription(offerDescription))
                        .then(() => this.sendSingleOffer(peerConnection))
                );
            },
            sendWantsToActiveVoiceChat: function () {
                this.sendWantsToVoiceChat(true);
            },
            sendWantsToDeactivateVoiceChat: function () {
                this.sendWantsToVoiceChat(false);
            },
            sendWantsToVoiceChat: function (wantsToVoiceChat) {
                const wantsToVoiceChatRequest = {
                    type: WANTS_TO_VOICE_CHAT,
                    playerAuthentication: this.$store.state.playerAuthentication,
                    gameSessionId: this.$store.state.gameSessionId,
                    data: wantsToVoiceChat
                }
                this.$websocketService.sendMessage(wantsToVoiceChatRequest);
            },
            sendSingleOffer(peerConnection) {
                Logger.warn('send offer')
                const callRequest = {
                    type: SIGNALING_OFFER_PEER_CONNECTION,
                    playerAuthentication: this.$store.state.playerAuthentication,
                    gameSessionId: this.$store.state.gameSessionId,
                    data: {signalContent: peerConnection.localDescription, connectedTo: peerConnection.connectedTo}
                }
                this.$websocketService.sendMessage(callRequest);
            },
            sendAnswerCallRequest(peerConnection) {
                Logger.warn('send answer call')
                const answerRequest = {
                    type: SIGNALING_ANSWER_PEER_CONNECTION,
                    playerAuthentication: this.$store.state.playerAuthentication,
                    gameSessionId: this.$store.state.gameSessionId,
                    data: {signalContent: peerConnection.localDescription, connectedTo: peerConnection.connectedTo}
                }
                this.$websocketService.sendMessage(answerRequest);
            },
            sendIceCandidate(candidate, peerConnection) {
                const candidateRequest = {
                    type: SIGNALING_BROADCAST_ICE_CANDIDATE,
                    playerAuthentication: this.$store.state.playerAuthentication,
                    gameSessionId: this.$store.state.gameSessionId,
                    data: {signalContent: candidate, connectedTo: peerConnection.connectedTo}
                }
                this.$websocketService.sendMessage(candidateRequest);
            },
            sendLocalMuteChangeViaDataChannel(updateObject) {
                this.notifyAllInVoiceChatViaDataChannel(updateObject);
            },
            notifyAllInVoiceChatViaDataChannel(data) {
                this.peerConnections.forEach(pc => {
                    if (pc.outgoingDataChannel.readyState === "open") {
                        pc.outgoingDataChannel.send(JSON.stringify(data))
                    }
                });
            },
            enterVoiceChat: function () {
                if (this.localStream) {
                    this.sendWantsToActiveVoiceChat();
                } else {
                    this.getLocalInputStream()
                        .then(this.sendWantsToActiveVoiceChat)
                }
            },
            leaveVoiceChat: function () {
                this.closeVoiceChat();
            },
            disableVoiceChat: function () {
                this.peerConnections.forEach(pc => pc.close());
                this.$store.commit('updatePeerConnections', new Map());

                this.localStream?.getTracks().forEach(function (track) {
                    track.stop();
                });
                this.$store.commit('updateLocalVoiceInputStream', null);
            },
            toggleMuteAll: function () {
                if (this.fullMute) {
                    this.muteAll(false);
                    this.unmuteLocalPlayer();
                } else {
                    this.muteAll(true);
                    this.muteLocalPlayer();
                }
            },
            muteAll: function (mute) {
                this.displayedPlayers.forEach(player => {
                    const elem = document.getElementById(REMOTE_AUDIO_ELEM_ID + player.id);
                    if (elem) {
                        elem.muted = mute;
                    }
                });
                this.updateFullMute(mute)

            },
            updateFullMute: function (value) {
                const data = {muted: this.localPlayerIsMuted, fullMute: value}
                this.sendLocalMuteChangeViaDataChannel(data);
                this.$store.commit('updateFullMute', value);
            },
            toggleMuteLocalPlayer: function () {
                if (!this.localPlayerIsMuted) {
                    this.muteLocalPlayer();
                } else {
                    this.unmuteLocalPlayer();
                    if (this.fullMute) {
                        this.muteAll(false);
                    }
                }
            },
            unmuteLocalPlayer: function () {
                this.localStream.getAudioTracks()[0].enabled = true;
            },
            muteLocalPlayer: function () {
                this.localStream.getAudioTracks()[0].enabled = false;
            },
            processVoiceChatSignalUpdate: function (voiceChatSignalUpdate) {

                if (!voiceChatSignalUpdate) {
                    return;
                }

                if (voiceChatSignalUpdate?.data?.type === 'offer') {
                    this.updateOffersChanges(voiceChatSignalUpdate);
                }

                if (voiceChatSignalUpdate?.data?.type === 'answer') {
                    this.updateAnswersChanges(voiceChatSignalUpdate);
                }

                if (voiceChatSignalUpdate?.data?.candidate) {
                    this.updateCandidatesChange(voiceChatSignalUpdate);
                }
            },
            updateOffersChanges: function (voiceChatUpdate) {
                const updatedOffer = voiceChatUpdate?.data;
                const peerConnection = this.initPeerConnection(voiceChatUpdate.from);
                if (peerConnection && updatedOffer) {
                    this.addPerConnectionSafe(peerConnection)
                    Logger.log('add remote offer description')
                    const offersDescription = new RTCSessionDescription(updatedOffer);
                    peerConnection.setRemoteDescription(offersDescription)
                        .then(() =>
                            peerConnection.createAnswer()
                                .then(answerDescription => peerConnection.setLocalDescription(answerDescription))
                                .then(() => this.sendAnswerCallRequest(peerConnection))
                        );
                    return;
                }
            },
            updateAnswersChanges: function (voiceChatUpdate) {
                const updatedAnswer = voiceChatUpdate.data;
                const peerConnection = this.peerConnections.get(voiceChatUpdate.from)
                if (updatedAnswer && peerConnection) {
                    Logger.log('added remote answer description')
                    const answerDescription = new RTCSessionDescription(updatedAnswer);
                    peerConnection.setRemoteDescription(answerDescription);
                }
            },
            updateCandidatesChange: function (voiceChatUpdate) {
                const updatedCandidate = voiceChatUpdate.data;
                const peerConnection = this.peerConnections.get(voiceChatUpdate.from)
                if (updatedCandidate && peerConnection) {
                    Logger.log('added remote ice candidate')
                    peerConnection.addIceCandidate(new RTCIceCandidate(updatedCandidate))
                        .catch(e => Logger.error(e));
                }
            },
        },
        computed: {
            peerConnections: function () {
                return this.$store.state.peerConnections;
            },
            localStream: function () {
                return this.$store.state.localVoiceInputStream;
            },
            localPlayerId: function () {
                return this.$store.state.playerId;
            },
            otherPlayersInVoiceChat: function () {
                return this.playersInVoiceChat.filter(pid => pid !== this.localPlayerId);
            },
            voiceChatDisabled: function () {
                return !this.playersInVoiceChat.includes(this.localPlayerId)
            },
            localPlayer: function () {
                const localPlayer = this.players?.find(p => p.id === this.localPlayerId);
                if (localPlayer) {
                    return {
                        ...localPlayer,
                        ready: false,
                    };
                }

                return null;
            },
            displayedPlayers: function () {
                return this.players
                    .filter(p => p.id !== this.localPlayerId)
                    .map(p => {
                        const pc = this.peerConnections?.get(p.id);
                        return {
                            ...p,
                            ready: false,
                            pc: pc,
                            voiceChatActive: this.playersInVoiceChat?.includes(p.id)
                        }
                    })
            },
            localPlayerIsMuted: function () {
                return this.$store.state.localPlayerIsMuted;
            },
            fullMute: function () {
                return this.$store.state.fullMute;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .player-list-wrapper {
        position: fixed;
        z-index: 99999;
        display: flex;
        flex-direction: column;
        border: none;
        border-radius: 15px 15px 0px 0px;
        color: white;
        text-align: center;
        justify-content: center;
        user-select: none;
        overflow: hidden;
        background-color: #322046;
        bottom: 0px;
        right: -350px;


        &.close {
            animation: slideRightPlayers 0.25s ease-in-out;

            @keyframes slideRightPlayers {
                from {
                    right: 2vw;
                }
                to {
                    right: -350px;
                }
            }
        }

        &.open {
            animation: slideOpen 0.25s ease-in-out;
            right: 2vw;
            min-width: 350px;
            max-width: 100%;

            @keyframes slideOpen {
                from {
                    right: -350px;
                }
                to {
                    right: 2vw;
                }
            }

        }

        .close-players {
            cursor: pointer;
            appearance: none;
            background-color: transparent;
            border: none;
            outline: none;
            position: absolute;
            right: 2px;
            top: 0px;

            img {
                width: 20px;
                height: auto;
            }

            :hover {
                transform: scale(1.15);
            }
        }

        .player-list-header {
            width: 100%;
            font-family: bungee;
            font-size: calc(11px + 0.75vw);
            line-height: calc(14px + 0.75vw);
            cursor: pointer;
            position: relative;
            display: flex;
            background-color: transparent;
            border-radius: 11px 11px 0 0;
            border: none;
            box-sizing: border-box;
            justify-content: center;
            align-items: center;
            white-space: nowrap;
            appearance: none;
            padding: 8px 12px;
            user-select: none;
            color: var(--highlight-color);
            text-shadow: 3px 2px 1px black;

        }


        .local-player-row {
            display: grid;
            position: relative;
            box-sizing: border-box;
            grid-template-columns: 60px auto 20px 20px 20px;
            grid-column-gap: 10px;
            align-items: center;
            padding: 5px;
            width: 100%;
            box-shadow: 0px 15px 10px -15px #111;
            font-size: min(max(9px, 2vw), 11px);

            .toggle-local-player-mute {
                display: flex;

            }

            .voice-chat-inner-title {
                position: absolute;
                width: 90px;
                right: 0px;
                top: -7px;
                color: var(--highlight-color);
                text-shadow: 3px 2px 1px black;
            }
        }

        .player-list-content {
            box-sizing: border-box;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            width: 100%;
            padding: 5px;
            height: 250px;
            max-height: 250px;
            overflow-y: auto;
            overflow-x: hidden;
            box-sizing: border-box;
            background-color: #503370;


            .player-row {
                display: grid;
                box-sizing: border-box;
                grid-template-columns: 60px auto 20px;
                grid-column-gap: 10px;
                align-items: center;
                width: 333px;
                padding: 2px;
                font-size: min(max(9px, 2vw), 11px);
                margin-bottom: 10px;
                border-radius: 5px;

                .toggle-player-mute {
                    position: relative;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    justify-content: flex-end;

                    .speaker {
                        width: inherit;
                        height: auto;
                    }

                    .mute-speaker {
                        position: absolute;
                        left: 0;
                        transform: rotateX(180deg);
                    }
                }


                .list-player-disconnected, .list-role {
                    width: 100%;

                    img {
                        box-sizing: border-box;
                        width: inherit;
                        height: auto;
                        border-radius: 6px;
                        padding: 2px;
                    }
                }
            }

        }


        .list-avatar {
            max-width: 60px;
            max-height: 60px;
            height: 60px;
            width: 60px;
            min-height: unset;
            min-width: unset;
            margin: 0;
        }

        .list-player-name {
            text-align: left;
            word-break: break-word;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

    @media only screen and (max-aspect-ratio: 1/1) {
        .player-list-wrapper {
            width: 100%;
            left: 0;
            border: none;
            border-radius: 0px;
            box-shadow: unset;
            box-sizing: border-box;
            bottom: -311px;

            &.close {
                animation: slideDown 0.35s ease-in-out;
                @keyframes slideDown {
                    from {
                        bottom: 0;
                    }
                    to {
                        bottom: -311px;
                    }
                }
            }

            &.open {
                display: unset !important;
                animation: slideOpen 0.35s ease-in-out;
                bottom: 0;
                @keyframes slideOpen {
                    from {
                        bottom: -311px;
                    }
                    to {
                        bottom: 0;
                    }
                }
            }

            .player-list-header {
                font-size: calc(9px + 2.75vw);
            }

            .player-list-content {
                height: 200px;
                max-height: 200px;

                .player-row {
                    width: unset;
                }

                .local-player-row {
                    width: unset;
                }
            }
        }

    }

    .mute-toggle, .headphones-mute-toggle {
        width: 100%;
        display: flex;
        justify-content: flex-end;

        .mute-toggle-mic, img {
            width: 75%;
            height: auto;
        }

        .disable-voice-chat {
            width: inherit;
            height: auto;
        }
    }

    .slash {
        position: absolute;
        transform: rotateX(180deg);
    }

</style>
