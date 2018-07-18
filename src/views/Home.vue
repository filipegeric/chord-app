<template>
  <div class="home">
    <img src="../assets/logo.png">
    <h1 class="is-size-2">Welcome to Chord App</h1>
    <h2 class="is-size-5">Find a song or <a @click.prevent="openRegisterModal">join</a> us!</h2>
    <form @submit.prevent="/*TODO*/">
      <div class="field">
        <div class="control">
          <input v-model="input" class="input is-medium" type="text" placeholder="Enter song title or artist name">
        </div>
      </div>
      <div class="field">
        <div class="control has-text-centered">
          <button type="submit" class="button is-large">Search</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    openRegisterModal: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      input: ''
    }
  },
};
</script>

<style scoped>
.field {
  width: 40%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0.5em;
}

.button {
  background-color: #41b883;
  margin-left: auto;
  margin-right: auto;
}

input:focus {
  outline: none !important;
  border:1px solid #41b883;
  box-shadow: 0 0 10px #41b883;
}

@media (max-width: 768px) {
  .field {
    width: 75%;
  }
}
</style>

