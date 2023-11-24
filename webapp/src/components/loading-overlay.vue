<template>
    <div class="loading-overlay">
        <div class="spinner-center-container">
            <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            <span class="loading-text-elem">{{loadingText}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'loading-overlay',
        props:['loadingText']
    }

</script>

<style scoped>
    .loading-overlay {
        position: fixed;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100vw;
        height: 100vh;
        z-index: 9999;
        background-color: rgb(112 112 112 / 40%);
    }

    .spinner-center-container {
        border-radius: 5px;
        width: fit-content;
        height: fit-content;
        padding: 35px;
        background-color: rgba(255, 255, 255, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 10px;
    }

    .loading-text-elem {
        margin-left: 25px;
        font-size: var(--huge-base-font-size);
        font-family: inherit;
    }
</style>
