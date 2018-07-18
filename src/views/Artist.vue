<template>
  <div>
    <my-transition>
      <my-spinner v-if="loading" />
    </my-transition>

    <my-transition>
      <div v-if="!loading">
        <h1 class="is-size-2">{{ artist.name }}</h1>
        <p>{{ artist.bio }}</p>
        <h2 class="is-size-3">Songs</h2>
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
  data () {
    return {
      artist: null,
      songs: [],
      loading: true
    }
  },
  created () {
    if(this.$route.params.artist) {
      this.artist = this.$route.params.artist;
    } else {
      axios.get(`/artists/${this.$route.params.id}`).then(response => {
        this.artist = response.data;
      }).catch(err => {
        console.log(err)
      })
    }

    axios.get(`/artists/${this.$route.params.id}/songs`).then(response => {   
      this.songs = response.data;
      this.loading = false;
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style scoped>
h2 {
  margin-top: 1em;
}
</style>
