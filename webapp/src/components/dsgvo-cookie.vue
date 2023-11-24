<template>
    <div class="dsgvo-content">

        <span class="dsgvo-content-heading">Privacy settings</span>
        <p class="dsgvo-text">To make the gaming experience possible, we need to use cookies.
            In order to use cookies, we need your consent. By clicking "Confirm", you agree (revocable at any
            time) to this data processing. Under "privacy-settings" you can change your settings or reject the use of
            cookies. For more information, please see our privacy policy.
        </p>
        <p class="dsgvo-text">
            You can revoke your confirmation at any time by clicking on the link in the footer.
        </p>
        <span class="dsgvo-description-heading">
            We use your cookies:
        </span>
        <div class="dsgvo-description-text">
            <ul>
                <li>
                    to store data about your avatar and player name.
                </li>
                <li>
                    to store the information about the game sessions you join or create. Required for rejoin.
                </li>
            </ul>
        </div>
        <button v-if="!hasConfirmed" class="main-button centered" v-on:click="confirmPrivacyPolicy()">Confirm</button>
        <button v-if="hasConfirmed" class="main-button centered" v-on:click="revokePrivacyPolicy()">Revoke</button>
    </div>
</template>

<script>
    export default {
        name: "DsgvoCookieModal",
        props: ['hasConfirmed'],
        emits: ['onUpdatePrivacyPolicyConfirmState'],
        methods: {
            confirmPrivacyPolicy: function () {
                this.$emit('onUpdatePrivacyPolicyConfirmState', true);
            },
            revokePrivacyPolicy: function () {
                this.$emit('onUpdatePrivacyPolicyConfirmState', false);
            }
        }
    }
</script>

<style scoped lang="scss">

    .dsgvo-content {
        font-family: 'Source Sans Pro', sans-serif;
        border-radius: 10px;
        background-color: rgba(44, 62, 80, 0.95);
        width: 40vw;
        min-width: 275px;
        padding: calc(10px + 0.5vw);
        display: flex;
        flex-direction: column;

        .dsgvo-content-heading {
            font-family: bungee;
            font-size: calc(12px + 0.75vw);
            line-height: calc(12px + 0.75vw);
        }

        .dsgvo-text {
            text-align: justify;
            font-size: calc(8px + 0.5vw);
            line-height: calc(8px + 0.5vw);
        }

        .dsgvo-description-heading {
            font-family: bungee;
            font-size: calc(8px + 0.5vw);
            line-height: calc(8px + 0.5vw);
        }

        .dsgvo-description-text {
            font-weight: bold;
            padding: 0 10px;

            &.alert {
                color: red;
            }
        }
    }


</style>