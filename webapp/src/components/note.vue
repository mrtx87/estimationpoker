<template>
  <div ref='main' :id="`note-${termAssignmentPlayer?.id}`" class="note"
       :class="{'question-mark':getDisplayedTerm === '?'}">
        <span v-if="termAssignmentPlayer?.assignment || ('term' in termAssignmentPlayer)">
          {{ getDisplayedTerm }}
        </span>
  </div>
</template>

<script>
export default {
  name: 'Note',
  props: ['termAssignmentPlayer'],
  mounted() {
    this.initObserver()
  },
  beforeUnmount() {
    if (this.observer) this.observer.unobserve(this.$refs.main)
  },
  data() {
    return {
      open: false,
      observer: null,
    }
  },
  methods: {
    onResize() {
      const noteDiv = this.$refs.main;
      const width = noteDiv.offsetWidth;
      if (noteDiv.className.includes('question-mark')) {
        noteDiv.style.fontSize = `${width / 2}px`;
        noteDiv.style.lineHeight = `${width / 2}px`;
      } else {
        noteDiv.style.fontSize = `${width / 10}px`;
        noteDiv.style.lineHeight = `${(width / 10) + 2}px`;
      }
    },
    initObserver() {
      const observer = new ResizeObserver(this.onResize)
      observer.observe(this.$refs.main)
      this.observer = observer
    }
  },
  computed: {
    getDisplayedTerm: function () {
      if ('term' in this.termAssignmentPlayer) {
        return this.termAssignmentPlayer.term;
      }
      return this.termAssignmentPlayer?.assignment ? this.termAssignmentPlayer.assignment.term : '';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.note {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 40%;
  height: 25%;
  left: 30%;
  top: 15%;
  background-image: url("../assets/note.svg");
  background-size: 100%;
  background-repeat: no-repeat;
  z-index: 25;
  color: black;
  padding: 2%;
  outline: 0px solid transparent;
  overflow: hidden;
  box-sizing: border-box;
  word-break: break-word;
  user-select: none;
  box-shadow: 0px 15px 10px -15px #111;


  transition: transform 0.3s ease-in-out;

  &.question-mark {

  }

}

@media only screen and (max-width: 900px) {
  .note:hover {
    transform: scale(1.75) !important;
  }
}


.note span {
  min-width: 100%;
  text-align: center;
  transition: none;
}

.note:hover {
  overflow: visible;
  transform: scale(1.6);
}

</style>
