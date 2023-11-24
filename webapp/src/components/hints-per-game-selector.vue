<template>
    <div class="hints-selection">
        <button class="main-button hint-config-btn" :disabled="disabled" :class="{'disabled': disabled}" v-on:click="minus()">-</button>
        <input id="hintsPerGameId" v-bind:value="updatedSelection" type="text" :disabled="true" maxlength="3" class="hint-count-config">
        <button class="main-button hint-config-btn" :disabled="disabled" :class="{'disabled': disabled}" v-on:click="plus()">+</button>
    </div>
</template>

<script>
    export default {
        name: 'HintsPerGameSelector',
        props: ['selection', 'disabled'],
        emits:['onHintSelectionChange'],
        watch: {
            selection: function (newVal, oldVal) {
                this.externalUpdate(newVal);
            }
        },
        beforeMount: function () {
            this.externalUpdate(this.selection);
        },
        data() {
            return {
                updatedSelection : null,
                runningTimeout : -1,
            }
        },
        methods: {
            plus: function() {
                this.updateHintsPerGame(+1)
            },
            minus: function() {
                if (this.updatedSelection > 0) {
                    this.updateHintsPerGame(-1)
                }
            },
            updateHintsPerGame: function(value) {
                if (this.disabled) {
                    return;
                }
                this.updatedSelection = this.updatedSelection + value;
                clearTimeout(this.runningTimeout);
                this.runningTimeout = setTimeout(this.triggerUpdateHintsPerGame.bind(this), 400)
            },
            triggerUpdateHintsPerGame: function () {
                this.$emit('onHintSelectionChange', this.updatedSelection);
                this.runningTimeout = -1;
            },
            externalUpdate: function (selection) {
                if (selection && this.runningTimeout === -1) {
                    this.updatedSelection = selection;
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    .hints-selection {
        display: grid;
        width: min-content;
        align-self: center;
        grid-template-columns: min-content min-content min-content;
        grid-column-gap: 15px;
        justify-content: center;
        align-items: center;

        .hint-count-config {
            box-sizing: border-box;
            background-color: #5e488a;
            border-radius: 8px;
            border: 3px #BEB4E9 solid;
            font-family: bungee;
            color: var(--primary-light-text-color);
            font-size: min(max(10px, 1.2vw), 15px);
            line-height: min(max(10px, 1.2vw), 15px);
            text-align: center;
            width: min(max(30px, 3vw), 50px);
            height: min(max(30px, 3vw), 50px);
        }

        .hint-config-btn {
            width: min(max(20px, 1.75vw), 35px);
            height: min(max(20px, 1.75vw), 35px);
            font-size: min(max(15px, 1.5vw), 25px);

            &.disabled {
                cursor: not-allowed;
            }
        }

    }

</style>
