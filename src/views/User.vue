<template>
  <div>
    <my-transition>
      <my-spinner v-if="loading" />
    </my-transition>

    <my-transition>
      <div v-if="!loading">
        <img :src="user.avatar != 'http://127.0.0.1:8000/' ? user.avatar  : logo" alt="AVATAR">
        <h1 class="is-size-2">{{ user.username }}</h1>
        <h2>Uploaded songs:</h2>
        <ul>
          <li v-for="song in songs" :key="song.id">
            <router-link :to="`/songs/${song.id}`">{{ song.title }}</router-link>
          </li>
        </ul>
      </div>
    </my-transition>
    
  </div>
</template>

<script>
import logo from '@/assets/logo.png';

export default {
  data() {
    return {
      user: null,
      loading: true,
      songs: [],
      logo
    }
  },
  created() {
    if(this.$route.params.user) {
      this.user = this.$route.params.user;
    } else {
      this.fetchUser();
    }
    this.fetchSongs();
  },
  watch: {
    '$route'(newValue) {
      console.log(newValue);
      this.loading = true;
      this.fetchUser();
      this.fetchSongs();
    }
  },
  methods: {
    fetchUser() {
      this.axios.get(`/users/${this.$route.params.id}/`).then(response => {
        this.user = response.data;
      }).catch(err => {
        console.log(err)
      });
    },
    fetchSongs() {
      this.axios.get(`/users/${this.$route.params.id}/songs`).then(response => {
        this.songs = response.data.results;
        this.loading = false;
      }).catch(err => {
        console.log(err)
      });
    }
  }
}
</script>

<style scoped>
img {
  height: 8em;
  border-radius: 50%;
}
</style>
