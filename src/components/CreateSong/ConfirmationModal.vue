<template>
  <div class="modal animated fadeIn is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Successfully created a song</p>
      </header>
      <section class="modal-card-body">
        <img src="@/assets/success.svg" alt="SUCCESS">
      </section>
      <footer class="modal-card-foot">
        <button @click="handleClick" class="button is-success">Okay</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: false,
      default: '/'
    }
  },
  methods: {
    handleClick() {
      this.$router.push({ path: this.to });
    }
  }
}
</script>

<style scoped>
img {
  height: 5em;
}
</style>
