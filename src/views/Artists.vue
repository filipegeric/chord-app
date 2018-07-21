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

  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: true,
      artists: []
    }
  },
  created () {
    this.axios.get('/artists/').then(response => {
      this.artists = response.data.results;
      this.loading = false;
    }).catch(err => {
      console.log(err)
    })
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
</style>
