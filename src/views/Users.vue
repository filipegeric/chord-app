<template>
  <div>
    <my-transition mode="out-in">
      <my-spinner v-if="loading" />
      <div v-if="!loading" id="users">
        <h1 class="is-size-2">Users</h1>
        <div class="columns is-multiline">
          <div v-for="user in users" :key="user.id" class="column is-2">
            <router-link :to="{ name: `user`, params: { id: user.id , user }}">
              <img :src="user.avatar != 'http://127.0.0.1:8000/' ? user.avatar : logo" alt="IMG">
            </router-link>
            <router-link :to="{ name: `user`, params: { id: user.id , user }}">
              <h2>{{ user.username }}</h2>
            </router-link>
          </div>
        </div>
      </div>
    </my-transition>
  </div>
</template>

<script>
import logo from '@/assets/logo.png';

export default {
  data() {
    return {
      loading: true,
      users: [],
      logo
    }
  },
  created() {
    this.axios.get('/users/').then(response => {
      this.users = response.data.results;
      this.loading = false;      
    }).catch(err => {
      console.log(err)
    });
  }
}
</script>

<style scoped>
img {
  height: 5em;
  border-radius: 50%;
}
</style>
