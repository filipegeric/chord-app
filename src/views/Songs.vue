<template>
  <div>
    <my-transition>
      <my-spinner v-if="loading" />
      <div id="songs" v-if="!loading">
        <h1 class="is-size-2">Songs</h1>
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
import axios from 'axios';

export default {
  data () {
    return {
      songs: [],
      loading: true
    }
  },
  created () {
    axios.get('/songs/').then(response => {
      console.log(response);
      
      this.songs = response.data.results;
      this.loading = false;
    }).catch(err => {
      console.log(err)
    })
  }
};
</script>

<style scoped>
h1 {
  color: #716c6ccc;
}

ul {
  padding-top: 2em;
}
</style>

