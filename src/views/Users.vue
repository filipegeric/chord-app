<template>
  <div>
    <my-transition mode="out-in">
      <my-spinner v-if="loading" />
      <div v-if="!loading" id="users">
        <h1 class="is-size-2">Users</h1>
        <div class="columns is-multiline">
          <div v-for="user in users" :key="user.id" class="column is-2">
            <router-link :to="{ name: `user`, params: { id: user.id , user }}">
              <img src="@/assets/logo.png" alt="IMG" style="height: 5em;">
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
export default {
  data() {
    return {
      loading: true,
      users: [],
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

</style>
