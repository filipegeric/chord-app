<template>
  <div id="transpose-box">
    <h3 class="is-size-4">Transpose: <span>{{ transpose }}</span></h3>
    <div class="has-text-centered">
      <button @click="handleMinus" class="button">-1</button>
      <button @click="handlePlus" class="button">+1</button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    keys() {
      return this.$store.getters.keys;
    },
    transpose() {
      return this.$store.getters.transpose;
    }
  },
  methods: {
    handlePlus() {
      this.$store.commit('setTranspose', this.transpose + 1);
    },
    handleMinus() {
      this.$store.commit('setTranspose', this.transpose - 1);
    }
  }
}
</script>

<style scoped>
#transpose-box {
  width: 15em;
  height: 10em;
  border: solid 5px #41b883;
  border-radius: 1em;
  position: sticky;
  top: 2.5em;
  float: right;
}

h3 {
  padding: 1em;
}

button {
  margin: 0.5em;
  width: 3em;
  border-color: #41b883;
}
</style>
