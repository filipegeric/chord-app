<template>
  <nav class="navbar is-transparent">
    <div class="navbar-brand">
      <span class="navbar-item">
        <router-link to="/"><img src="../../assets/logo.png" alt="LOGO"></router-link>
      </span>
      <div 
        @click.prevent="handleBurgerToggle" 
        :class="{'is-active': burgerIsActive}" 
        class="navbar-burger burger" 
        data-target="nav-menu"
        aria-label="menu"
        aria-expanded="false"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div id="nav-menu" class="navbar-menu" :class="{'is-active': burgerIsActive}">
      <div class="navbar-start">
        <span class="navbar-item">
          <router-link @click.native="handleNavigationClick" to="/songs">Songs</router-link>
        </span>
        <span class="navbar-item">
          <router-link @click.native="handleNavigationClick" to="/artists">Artists</router-link>
        </span>
        <span class="navbar-item">
          <router-link @click.native="handleNavigationClick" to="/users">Users</router-link>
        </span>
      </div>

      <div class="navbar-end">
        <a v-if="!$store.state.signedIn" @click.prevent="openSignInModal" class="navbar-item">
          <span>Sign in</span>
        </a>
        <a v-if="!$store.state.signedIn" @click.prevent="openRegisterModal" class="navbar-item">
          <span>Register</span>
        </a>
        <a v-if="$store.state.signedIn" @click.prevent="navigateToProfile" class="navbar-item">
          <span>Profile</span>
        </a>
        <router-link  @click.native="handleNavigationClick" to="/create-song" v-if="$store.state.signedIn" class="navbar-item">
          <span>Create</span>
        </router-link>
        <a v-if="$store.state.signedIn" @click.prevent="$store.commit('logout')" class="navbar-item">
          <span>Log out</span>
        </a>

        <div class="navbar-item">
          <div class="field has-addons">
            <form @submit.prevent="/*TODO*/" style="display: flex;">
              <div class="control">
                <input class="input is-rounded" type="text" placeholder="Song title or artist name">
              </div>
              <div class="control">
                <a id="search-button" class="button is-rounded">
                  <span class="icon is-small is-right">
                    <i class="fas fa-search"></i>
                  </span>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>


<script>
export default {
  props: {
    openRegisterModal: {
      type: Function,
      required: true
    },
    openSignInModal: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      burgerIsActive: false
    }
  },
  methods: {
    handleBurgerToggle() {
      this.burgerIsActive = !this.burgerIsActive;
    },
    handleNavigationClick() {
      this.burgerIsActive = false;
      // default...
    },
    navigateToProfile() {
      this.burgerIsActive = false;
      if(this.$store.state.user == null) {
        this.axios.post('/users/me/', {token: this.$store.state.token}).then(response => {
          this.$store.commit('setUser', response.data);
          /*if(this.$route.name == 'user' && this.$route.params.id != this.$store.state.user.id) {
            this.$router.go();
          }*/
          this.$router.push({ path: `/users/${this.$store.state.user.id}` });
        }).catch(err => {
          console.log(err)
        });
      } else {
        /*if(this.$route.name == 'user' && this.$route.params.id != this.$store.state.user.id) {
          this.$router.go();
        }*/
        this.$router.push({ path: `/users/${this.$store.state.user.id}` });
      }
    }
  }
}
</script>


<style scoped>
nav {
  border-bottom: solid 2px #41b883;
}

.navbar-brand {
  padding-left: 2em;
}

.navbar-item>* {
  color: black;
}

.navbar-item>*:hover {
  color: #41b883;
}

#search-button {
  background-color: #41b883;
}

input:focus {
  outline: none !important;
  border:1px solid #41b883;
  box-shadow: 0 0 10px #41b883;
}

.field.has-addons {
  justify-content: center;
}

@media (max-width: 640px) {
  .navbar-brand {
    padding-left: 0;
  }
} 
</style>
