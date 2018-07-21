<template>
  <div id="song-view">

    <my-transition>
      <my-spinner v-if="loading" />
    </my-transition>

    <my-transition>
      <div id="song" v-if="!loading" class="columns">
        <sidebar :artist="song.artist[0]"/>
        <div id="song-column" class="column">
          <div id="song-container">
            <h1>{{ song.title }} - 
              <span v-for="(artist, i) in song.artist" :key="artist.id">
                {{ artist.name }}{{ i != song.artist.length - 1 ? ', ' : '' }}
              </span>
            </h1>
            <h3>Key: <code>{{ song.key }}</code></h3>
            <h3>Description: {{ song.description }}</h3>
            <hr>
            <div id="compiled-view" v-html="song.body"></div>
          </div>
        </div>
      </div>
    </my-transition>

  </div>
</template>

<script>
import Sidebar from "../components/Song/Sidebar";

export default {
  data() {
    return {
      loading: true,
      song: null
    }
  },
  components: {
    Sidebar
  },
  created () {
    this.axios.get(`/songs/${this.$route.params.id}/`).then(response => {
      console.log(response.data);
      this.song = response.data;
      this.loading = false;
    }).catch(err => {
      console.log(err)
    })
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/style-variables.scss";

#song-view {
  min-height: calc(100% - #{$nav-height - 12px});
  height: calc(100% - #{$nav-height - 12px});
}

#song {
  display: flex;
  margin-left: 0;
  margin-right: 0;
  min-height: 100%;
  height: 100%;
}

#song-column {
  margin-top: 0.5em;
  padding: 0.15rem;
}

#song-container {
  margin-top: 5px; 
  margin-right: 5px; 
  border-radius: 0.5em; 
  padding: 0.8em; 
  border: solid 2px #41b883;
  text-align: left;
}

h1 {
  font-size: 2rem;
}

hr {
  border: solid 1px darkcyan;
}

@media (max-width: 768px) {
  .columns {
    flex-direction: column-reverse;
    height: auto;
  }

  #song-container {
    margin-right: 0;
  }

  #compiled-view {
    word-wrap: break-word;
  }
}
</style>