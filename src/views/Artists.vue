<template>
  <div>
    <my-transition>
      <my-spinner v-if="loading" />
    </my-transition>

    <my-transition>
      <div v-if="!loading" id="artists">
        <h1 class="is-size-2">Artists</h1>
        <ul>
          <li v-for="artist in artists" :key="artist.id">
            <router-link :to="{ name: `artist`, params: { id: artist.id , artist }}" >{{ artist.name }}</router-link>
          </li>
        </ul>
      </div>
    </my-transition>

    <my-transition>
      <pagination v-if="count > 5" @next="handleNext" @previous="handlePrevious" @go-to="handleGoTo" :count="count" />
    </my-transition>

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
      loading: true,
      artists: [],
      count: 0,
      next: null,
      previous: null
    }
  },
  created () {
    this.fetchArtists('/artists/');
  },
  methods: {
    handleNext() {
      this.fetchArtists(this.next);
    },
    handlePrevious() {
      this.fetchArtists(this.previous);
    },
    handleGoTo(n) {
      this.fetchArtists(`/artists/?limit=5&offset=${(n-1)*5}`);
    },
    fetchArtists(url) {
      this.axios.get(url).then(response => {
        this.artists = response.data.results;
        this.count = response.data.count;
        this.next = response.data.next;
        this.previous = response.data.previous;
        this.loading = false;
      }).catch(err => {
        console.log(err)
      });
    }
  }
}
</script>

<style scoped>
h1 {
  color: #716c6ccc;
}

ul {
  padding-top: 2em;
}

#artists {
  height: 20em;
}

.pagination {
  bottom: 0;
}
</style>
