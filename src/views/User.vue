<template>
  <div>
    <my-transition>
      <my-spinner v-if="loading" />
    </my-transition>

    <my-transition>
      <div v-if="!loading">
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
export default {
  data() {
    return {
      user: null,
      loading: true,
      songs: []
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

</style>
