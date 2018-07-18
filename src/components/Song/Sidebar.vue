<template>
  <div class="column is-3">
    <my-transition mode="out-in">
      <my-spinner id="sidebar-spinner" v-if="loading" />
      <div v-if="!loading">
        <h3>Songs by {{ artist.name }}</h3>
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
  props: {
    artist: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      loading: true,
      songs: []
    }
  },
  created () {
    axios.get(`/artists/${this.artist.id}/songs`).then(response => {   
      this.songs = response.data;
      this.loading = false;
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style scoped>
.column {
  border-right: solid 2px #41b883;
}

ul {
  margin-top: 2em;
}

#sidebar-spinner {
  position: relative;
}

@media (max-width: 768px) {
  .column {
    border-right: none;
  }
}
</style>
