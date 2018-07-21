<template>
  <div @keyup.esc="close" id="create-artist-modal" class="modal animated fadeIn" :class="{'is-active': isActive}">
    <div @click.prevent="close" class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Create new artist</p>
        <button @click.prevent="close" class="delete" aria-label="close"></button>
      </header>
      <form @submit.prevent="handleSubmit">
        <section class="modal-card-body">
          <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutUp">
            <div v-if="errors" class="notification is-danger">
              <button class="delete"></button>
              Errors...TODO
            </div>
          </transition>
          <div class="field">
            <p class="control">
              <input v-model="name" ref="nameInput" class="input" type="text" placeholder="Name of the artist" required>
            </p>
          </div>
          <div class="field">
            <p class="control">
              <textarea v-model="bio" class="textarea" resizable="false" placeholder="Bio"></textarea>
            </p>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" type="submit">Create</button>
          <!-- -->
          <button @click.prevent="close" class="button" type="reset">Cancel</button>
        </footer>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    addArtistToArray: {
      type: Function,
      required: false
    }
  },
  data () {
    return {
      isActive: false,
      errors: false,
      name: '',
      bio: ''
    };
  },
  methods: {
    handleSubmit () {
      this.axios.post('/artists/', 
                  { name: this.name, bio: this.bio }, 
                  { headers: { 'Authorization': `Bearer ${this.$store.state.token}` } }).then(response => {
        console.log(response);
        this.addArtistToArray(response.data);
        this.isActive = false;
      }).catch(err => {
        console.log(err)
      })
    },
    close () {
      this.isActive = false;
    }
  },
  watch: {
    isActive (newValue) {
      if(newValue) {
        this.$nextTick(() => {
          this.$refs.nameInput.focus();
        });
      }
    }
  }
}
</script>

<style scoped>
textarea {
  resize: none;
}
</style>
