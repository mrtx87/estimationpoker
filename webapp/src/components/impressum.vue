<template>
    <div class="impressum-content">
        <span class="impressum-heading">Impressum</span>
        <span class="impressum-entry">
            <span class="title">Owner:</span>
            <span class="content">Patrick Beiersdörfer</span>
        </span>
        <span class="impressum-entry">
            <span class="title">Address:</span>
            <span class="content">12051 Berlin Emserstraße 118</span>
        </span>
        <span class="impressum-entry">
            <span class="title">E-Mail:</span>
            <span class="content">E-Mail: contact@sektion9.net</span>
        </span>
        <span class="impressum-entry">
            <span class="title">Domain:</span>
            <span class="content">https://www.whothefuckami.eu</span>
        </span>
    </div>
</template>

<script>
    export default {
        name: "Impressum",
        props: [],
        emits: [],
        methods: {}
    }
</script>

<style scoped lang="scss">

    .impressum-content {
        font-family: 'Source Sans Pro', sans-serif;
        border-radius: 10px;
        background-color: rgba(44, 62, 80, 0.95);
        width: 50vw;
        min-width: 275px;
        padding: calc(10px + 0.5vw);
        display: flex;
        flex-direction: column;


        .impressum-heading {
            font-family: bungee;
            font-size: calc(18px + 0.5vw);
            line-height: calc(18px + 0.5vw);
            margin: 15px 0;
        }

        .impressum-entry {
            font-family: 'Source Sans Pro', sans-serif;;
            margin: 0.5vw 0;
            display: grid;
            grid-template-columns: min(30%, 100px) auto;

            .title {
                font-size: calc(16px + 0.5vw);
                line-height: calc(16px + 0.5vw);
                font-weight: bold;
                width: 150px;
            }

            .content {
                font-size: calc(13px + 0.5vw);
                line-height: calc(13px + 0.5vw);
            }
        }
    }


</style>