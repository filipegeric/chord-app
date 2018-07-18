<template>
  <div>
    <my-transition>
      <my-spinner v-if="loading" />
    </my-transition>

    <my-transition>
      <div v-if="!loading">
        <h1>{{ user.name }}</h1>
        <h2>Uploaded songs:</h2>
        <ul>
          <li v-for="song in songs" :key="song.id">
            <router-link :to="`/songs/${song.id}`">{{ song.name }}</router-link>
          </li>
        </ul>
      </div>
    </my-transition>
    
  </div>
</template>

<script>
import axios from 'axios';

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
      axios.get(`/users/${this.$route.params.id}`).then(response => {
        this.user = response.data;
        // carefull with this
      }).catch(err => {
        console.log(err)
      });
    }

    axios.get(`/users/${this.$route.params.id}/songs`).then(response => {
      this.songs = response.data;
      this.loading = false;
    }).catch(err => {
      console.log(err)
    });
  }
}
</script>

<style scoped>

</style>
