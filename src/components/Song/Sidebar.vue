<template>
  <div class="column is-3">
    <my-transition mode="out-in">
      <my-spinner id="sidebar-spinner" v-if="loading" />
      <div v-if="!loading">
        <h3>Songs by {{ artist.name }}</h3>
        <ul>
          <li v-for="song in songs" :key="song.id">
            <router-link :to="`/songs/${song.id}`">{{ song.title }}</router-link>
          </li>
          <li v-if="next"><a @click.prevent="loadMore">Load more...</a></li>
        </ul>
      </div>
    </my-transition>
  </div>
</template>

<script>
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
      songs: [],
      count: 0,
      next: null,
    }
  },
  created () {
    this.fetchSongs(`/artists/${this.artist.id}/songs`);
  },
  methods: {
    fetchSongs(url) {
      this.loading = true;
      this.axios.get(url).then(response => {
        console.log(response);
        this.songs = this.songs.concat(response.data.results);
        this.count = response.data.count;
        this.next = response.data.next;
        this.loading = false;
      }).catch(err => {
        console.log(err);
      });
    },
    loadMore() {
      if(this.next) {
        this.fetchSongs(this.next);
      }
    }
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
