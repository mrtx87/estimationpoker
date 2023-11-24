<template>
    <transition-group tag="div" name="instant-message-transition" class="instant-message-wrapper">
        <div v-for="msg in displayedMessages"
             :key="msg.id"
             class="instant-message instant-message-transition-item"
             :class="[msg.type]"
             v-on:click="removeMessageOnClick(msg)"
        >
            {{msg.message}}
        </div>
    </transition-group>
</template>

<script>

    import {InstantMessage} from "@/model/dto/instant-message";

    export default {
        name: 'InstantMessageWrapper',
        emits: ['onMessageEnd'],
        data() {
            return {
                displayedMessages: []
            }
        },
        beforeMount() {
            this.updateMessages(this.messages);
        },
        props: [
            'messages'
        ],
        watch: {
            messages: function (newMessages, oldMessages) {
                this.updateMessages(newMessages);
            }
        },
        methods: {
            updateMessages: function (newMessages = []) {
                this.displayedMessages = this.displayedMessages.filter(dm => newMessages.find(nm => dm.id === nm.id));

                const addedMessages = newMessages.filter(nm => !this.displayedMessages.find(dm => dm.id === nm.id));
                addedMessages.forEach(rawAddedMessage => {
                    const addedMessage = new InstantMessage(rawAddedMessage);
                    addedMessage.timeOutId = setTimeout(function (messageId) {
                        this.removeMessage(messageId);
                    }.bind(this), addedMessage.ttl, addedMessage.id)
                    this.displayedMessages.push(addedMessage);
                });
            },
            removeMessage: function (msgId) {
                this.$store.commit('removeInstantMessage', msgId);
            },
            removeMessageOnClick: function (msg) {
                this.removeMessage(msg.id);
                clearTimeout(msg.timeoutId);
            },
        },
        computed: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .instant-message-wrapper {
        position: absolute;
        display: flex;
        flex-direction: column;
        left: 10px;
        bottom: 10%;
        z-index: 10000;

        .instant-message {
            background-color: var(--primary-dark-transparent-color);
            padding: 10px;
            border-radius: 7px;
            font-size: calc(8px + 0.5vw);
            line-height: calc(10px + 0.5vw);
            margin-bottom: calc(10px);
            cursor: pointer;

            &.warn {
                background-color: rgba(115, 48, 39, 0.55);
            }

            &.success {
                background-color: rgba(127, 255, 214, 0.51);
                color: black;
            }

            &.info {
            }
        }

        .instant-message-transition-item {
            transition: all 0.5s ease;
        }

        .instant-message-transition-enter-active {
        }

        .instant-message-transition-leave-active {
            position: absolute;
            width: max-content;
        }

        .instant-message-transition-enter-from {
            transform: translateX(-50vw);
            opacity: 0;
        }

        .instant-message-transition-leave-to {
            opacity: 0;
            transform: translateX(-50vw);
        }

    }
</style>
