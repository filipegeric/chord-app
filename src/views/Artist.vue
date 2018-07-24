<template>
  <div>
    <my-transition>
      <my-spinner v-if="loading && !error404" />
    </my-transition>

    <my-transition>
      <not-found v-if="error404" />
    </my-transition>

    <my-transition>
      <div v-if="!loading">
        <h1 class="is-size-2">{{ artist.name }}</h1>
        <p>{{ artist.bio }}</p>
        <h2 class="is-size-3">Songs</h2>
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
import NotFound from '@/views/NotFound';

export default {
  components: {
    NotFound
  },
  data () {
    return {
      artist: null,
      songs: [],
      loading: true,
      error404: false
    }
  },
  created () {
    if(this.$route.params.artist) {
      this.artist = this.$route.params.artist;
    } else {
      this.axios.get(`/artists/${this.$route.params.id}/`).then(response => {
        this.artist = response.data;
      }).catch(err => {
        console.log(err)
        if(err.response.status == 404) {
          this.error404 = true;
        }
      })
    }

    this.axios.get(`/artists/${this.$route.params.id}/songs`).then(response => {   
      this.songs = response.data.results;
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
