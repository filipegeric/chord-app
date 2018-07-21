<template>
  <div @keyup.esc="close" id="modal-register" class="modal animated fadeIn " :class="{'is-active': isActive}">
    <div @click.prevent="close" class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Register</p>
        <button @click.prevent="close" class="delete" aria-label="close"></button>
      </header>
      <form @submit.prevent="handleSubmit">
        <section class="modal-card-body">
          <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutUp">
            <div v-if="errors || validationErrors.length > 0" class="notification is-danger content">
              <button @click.prevent="$store.commit('changeRegisterErrors', null); validationErrors = []" class="delete"></button>
              <ul>
                <li v-for="(value, key) in errors" :key="key">{{ value[0] }}</li>
                <li v-for="(value, key) in validationErrors" :key="key">{{ value }}</li>
              </ul>
            </div>
          </transition>
          
          <div class="field">
            <p class="control">
              <input ref="nameInput" class="input" v-model="credentials.name" type="text" placeholder="Name" required>
            </p>
          </div>
          <div class="field">
            <p class="control">
              <input class="input" v-model="credentials.username" type="text" placeholder="Username" required>
            </p>
          </div>
          
          <div class="field">
            <p class="control">
              <input class="input" v-model="credentials.password" type="password" placeholder="Password" required>
            </p>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" type="submit">Register</button>
          <my-spinner v-if="loading" id="spinner" :size="30" :lineSize="5" />
          <button @click.prevent="close" class="button" type="reset">Cancel</button>
        </footer>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    close: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      isActive: false,
      validationErrors: [],
      credentials: {
        username: '',
        name: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      errors: 'registerErrors'
    })
  },
  methods: {
    handleSubmit () {
      if(this.credentials.username.length < 3) {
        this.validationErrors.push('Username should be at least 3 characters long.');
      }
      if(this.credentials.name.length == 0) {
        this.validationErrors.push(`Name can't be empty.`);
      }
      if(this.credentials.password.length < 6) {
        this.validationErrors.push('Password should be at least 6 characters long.');
      }
      if(this.validationErrors.length > 0) {
        return;
      }
      this.loading = true;
      this.$store.dispatch('tryRegister', this.credentials)
    }
  },
  watch: {
    isActive (newValue) {
      if(newValue) {
        this.$nextTick(() => {
          this.$refs.nameInput.focus()
        })
      }
    },
    credentials: {
      handler(newValue) {
        if(newValue.username.length >= 3 && newValue.name.length > 0 && newValue.password.length >= 6) {
          this.validationErrors = [];
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.columns {
  margin-bottom: 0;
  padding-top: 0.5em;
}

.button[type="reset"] {
  margin-left: auto;
}

.modal-card {
  width: 520px;
}

.is-danger {
  color: #a94442;
  background-color: #f2dede;
  border-color: #ebccd1;
  padding-left: 0.2em;
  padding-right: 0.2em;
  padding-top: 0.2em;
}

#spinner {
  margin: 0;
  z-index: 2;
  width: unset;
  padding: 0;
  position: static;
}
</style>