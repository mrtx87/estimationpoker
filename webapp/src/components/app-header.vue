<template>
    <div class="header-wrapper">
        <h2>Header</h2>
    </div>
</template>

<script>
    export default {
        name: 'AppHeader',
        props: {
            msg: String
        },
        data() {
            return {

            }
        },
        methods: {
        },
        computed: {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header-wrapper {
    background: #2c3e50;
    width: 100%;
    height: 50px;
}
</style>
