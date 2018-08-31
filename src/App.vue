<template>
  <div id="app">
    <navigation-bar :openRegisterModal="openRegisterModal" :openSignInModal="openSignInModal" />
    <transition 
      appear 
      appear-active-class="animated fadeIn" 
      mode="out-in" 
      :enter-active-class="`animated ${transitionEnter}`" 
      :leave-active-class="`animated ${transitionLeave}`"
    >
      <router-view :openRegisterModal="openRegisterModal"/>
    </transition>

    <transition leave-active-class="animated fadeOut">
      <sign-in-modal ref="signInModal" :close="closeSignInModal"  v-if="!signedIn" />
    </transition>
    <transition leave-active-class="animated fadeOut">
      <register-modal ref="registerModal" :close="closeRegisterModal" v-if="!signedIn" />
    </transition>

  </div>
</template>

<script>
import NavigationBar from "./components/common/NavigationBar";
import RegisterModal from "./components/common/RegisterModal";
import SignInModal from "./components/common/SignInModal";
import { mapGetters } from 'vuex';

export default {
  components: {
    NavigationBar,
    RegisterModal,
    SignInModal,
  },
  data() {
    return {
      transitionEnter: '',
      transitionLeave: '',
    }
  },
  methods: {
    openRegisterModal() {
      this.$refs.registerModal.isActive = true;
    },
    openSignInModal() {
      this.$refs.signInModal.isActive = true;
    },
    closeRegisterModal() {
      this.$refs.registerModal.isActive = false;
    },
    closeSignInModal() {
      this.$refs.signInModal.isActive = false;
    },
  },
  computed: {
    ...mapGetters([
      'signedIn',
      'user'
    ])
  },
  created() {
    if(localStorage.token) {
      this.$store.commit('login', { token: localStorage.token })
    }
  },
  watch: {
    '$route' (to, from) {
      if(from.meta.index < to.meta.index) {
        this.transitionEnter = 'fadeInRight';
        this.transitionLeave = 'fadeOutLeft';
      } else if(from.meta.index > to.meta.index) {
        this.transitionEnter = 'fadeInLeft';
        this.transitionLeave = 'fadeOutRight';
      } else {
        this.transitionEnter = 'fadeIn';
        this.transitionLeave = 'fadeOut';
      }
    }
  }
};
</script>


<style lang="scss">
@import "../node_modules/bulma/css/bulma.css";
@import url("https://use.fontawesome.com/releases/v5.0.9/css/all.css");
@import url('https://fonts.googleapis.com/css?family=Poppins');
@import "./assets/animate.css";
@import "./assets/style-variables.scss";

html {
  height: 100%;
  box-sizing: border-box;
}

body {
  margin-top: 0px;
  margin-bottom: 0px;
  height: 100%;
  min-height: 100%;
}

nav {
  height: $nav-height;
}


#app {
  font-family: "Poppins", Helvetica, Arial, sans-serif;
  text-align: center;
  margin-left: 2em;
  margin-right: 2em;
  border-left: solid 1px #41b883;
  border-right: solid 1px #41b883;
  min-height: 100%;
}

@media (max-width: 640px) {
  #app {
    margin-left: 0;
    margin-right: 0;
    border-left: none;
    border-right: none;
  }
}
</style>
