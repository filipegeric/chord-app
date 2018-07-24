<template>
  <div id="songs-container">
    <my-transition mode="out-in">
      <my-spinner style="position: static; padding-bottom: 120px;" v-if="loading" />
      <div id="songs" v-if="!loading">
        <h1 class="is-size-2">Songs</h1>
        <ul>
          <li v-for="song in songs" :key="song.id">
            <router-link :to="`/songs/${song.id}`">{{ song.title }}</router-link>
          </li>
        </ul>
        
      </div>
    </my-transition>
    <pagination v-if="count > 5" @next="handleNext" @previous="handlePrevious" @go-to="handleGoTo" :count="count" />
  </div>
</template>

<script>
import Pagination from '@/components/common/Pagination';

export default {
  components: {
    Pagination
  },
  data () {
    return {
      songs: [],
      loading: true,
      count: 0,
      next: null,
      previous: null
    }
  },
  created () {
    this.fetchSongs('/songs/');
  },
  methods: {
    handleNext() {
      this.fetchSongs(this.next);
    },
    handlePrevious() {
      this.fetchSongs(this.previous);
    },
    handleGoTo(n) {
      this.fetchSongs(`/songs/?limit=5&offset=${(n-1)*5}`);
    },
    fetchSongs(url) {
      this.loading = true;
      this.axios.get(url).then(response => {
        this.count = response.data.count;
        this.songs = response.data.results;
        this.next = response.data.next;
        this.previous = response.data.previous;
        this.loading = false;
      }).catch(err => {
        console.log(err)
      })
    }
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

.pagination {
  bottom: 0;
}

#songs {
  height: 20em;
}

#songs-container {
  height: 85vh;
}
</style>

