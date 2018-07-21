import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Songs from './views/Songs.vue';
import Artists from './views/Artists.vue';
import Users from './views/Users.vue';
import Song from './views/Song.vue';
import Artist from './views/Artist.vue';
import User from './views/User.vue';
import MySpinner from './components/common/MySpinner.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/songs',
      name: 'songs',
      component: Songs,
    },
    {
      path: '/artists',
      name: 'artists',
      component: Artists,
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
    },
    {
      path: '/songs/:id',
      name: 'song',
      component: Song,
    },
    {
      path: '/artists/:id',
      name: 'artist',
      component: Artist,
    },
    {
      path: '/users/:id',
      name: 'user',
      component: User,
    },
    {
      path: '/create-song',
      name: 'create-song',
      meta: {
        requiresAuth: true,
      },
      component: () => ({
        component: import('@/views/CreateSong.vue'),
        loading: MySpinner,
        delay: 1,
      }),
    },

    {
      path: '*',
      name: 'not-found',
      component: () => ({
        component: import('@/views/NotFound.vue'),
        loading: MySpinner,
        delay: 1,
      }),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && localStorage.getItem('token')) {
    next();
  } else if (to.matched.some(record => record.meta.requiresAuth) && localStorage.getItem('token') == null) {
    next('/');
  } else {
    next();
  }
});

export default router;
