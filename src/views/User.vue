<template>
  <div>
    <my-transition>
      <my-spinner v-if="loading" />
    </my-transition>

    <my-transition>
      <div v-if="!loading">
        <h1>{{ $route.params.user.name }}</h1>
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
export default {
  data() {
    return {
      loading: false
    }
  }
}
</script>

<style scoped>

</style>
