<template>
  <div id="create-song">
    <div id="form">
      <input-field label="Song title">
        <input v-model="form.title" class="input" type="text">
      </input-field>
      <input-field label="Key">
        <input v-model="form.key" class="input" type="text">
      </input-field>
      <input-field label="Description">
        <input v-model="form.description" class="input" type="text">
      </input-field>  
      <div id="pick-artists">
        <label class="label">Artist(s):</label>
        <input-field v-for="n in numberOfArtists" :key="n">
          <span class="select">
            <select v-model="form.artists[n-1]">
              <option :value="-1"></option>
              <option v-for="artist in artists" :value="artist.id" :key="artist.id">{{ artist.name }}</option>
            </select>
          </span>
          <img @click="openCreateArtistModal" title="Add new artist" class="add-button is-pulled-right" src="../assets/rounded-add-button.svg" alt="add">
        </input-field>
        <a style="font-size: 0.9rem;" @click.prevent="numberOfArtists++">Add one more artist</a>
      </div>
      <div id="textarea">
        <label class="label">Lyrics and chords:</label>
        <div id="instructions">
          <h2><em>Instructions:</em></h2>
          <p>Put backquotes around chords: `Em7` => <code>Em7</code></p>
          <p>Use brackets to separate song in parts => [Intro], [Verse 1], [Chorus]...</p>
          <p>Click on preview to see the final look</p>
        </div>
        <textarea spellcheck="false" ref="textarea" class="textarea"></textarea>
      </div>
    </div>
    <div id="submit-div" class="control">
      <button id="preview-button" @click.prevent="compile" class="button is-link">Preview</button>
      <div>
        <my-spinner v-if="submitSpinner" id="submit-spinner" :size="30" :lineSize="4" />
        <button id="submit-button" @click.prevent="submitForm" class="button is-link">Submit</button>
      </div>
    </div>
    <div id="preview-container">
      <label class="label">Preview:</label>
      <div id="preview" v-html="compiledInput"></div>
    </div>
    <create-artist-modal ref="createArtistModal" :addArtistToArray="addArtistToArray" />
    <my-transition>
      <confirmation-modal :to="`/songs/${newId}`" v-if="confirmationModal" />
    </my-transition>
  </div>
</template>

<script>
import axios from 'axios';
import CreateArtistModal from '../components/CreateSong/CreateArtistModal';
import ConfirmationModal from '../components/CreateSong/ConfirmationModal';
import InputField from '../components/common/InputField';

export default {
  components: {
    CreateArtistModal,
    InputField,
    ConfirmationModal
  },
  data () {
    return {
      confirmationModal: false,
      submitSpinner: false,
      newId: -1,
      numberOfArtists: 1,
      compiledInput: '',
      artists: [],
      form: {
        title: '',
        key: '',
        description: '',
        artists: [],
        body: '',
      }
    }
  },
  created() {
    axios.get('/artists').then(response => {
      this.artists = response.data;
    }).catch(err => {
      console.log(err);
    })
  },
  methods: {
    submitForm () {
      this.submitSpinner = true;
      this.compile();
      this.form.body = this.compiledInput;
      axios.post('/songs/create', { form : this.form }).then(response => {
        console.log(response);
        // confirmation modal... TODO
        // treba da se pomeri glupi spiner pored submit dugmeta
        this.newId = response.data.id;
        this.confirmationModal = true;
        //this.$router.push({ path: `/songs/${response.data.id}` });
      }).catch(err => {
        console.log(err);
      })
    },
    openCreateArtistModal () {
      this.$refs.createArtistModal.isActive = true;
    },
    addArtistToArray (artist) {
      this.artists.push(artist);
      this.form.artists[this.numberOfArtists - 1] = artist.id;
    },
    compile() {
      let a = this.$refs.textarea.value.replace(/`[A-Za-z0-9#/-]+`/g, (match) => {
        return `<code>${match.replace(/`/g, '')}</code>`;
      });
      a = a.replace(/\n/g, '<br>');
      a = a.replace(/ /g, '&nbsp;');
      this.compiledInput = a;
    }
  }
}
</script>

<style scoped>
#preview {
  text-align: left;
  border: solid 2px #41b883;
  border-radius: 0.5em;
  padding: 0.625em;
}

#preview-container {
  margin-left: 1em;
  margin-right: 1em;
  padding-bottom: 1em;
  text-align: left;
}

#submit-spinner {
  margin-left: 0;
  margin-right: 0;
  padding-top: 0;
  float: right;
  width: unset;
}

#pick-artists {
  width: 30%;
  margin-bottom: 0.75rem;
}

#submit-div {
  text-align: right;
  margin-left: 1em;
  margin-right: 1em;
}

#submit-button {
  background-color: #41b883;
}

#preview-button {
  background-color: rgb(255, 255, 255);
  border-color: #41b883;
  color: #41b883;
  transition: all 0.25s;
  float: left;
}

#preview-button:hover {
  background-color: #41b883;
  border-color: white;
  color: white;
}

.add-button {
  height: 2em;
  margin-left: auto;
  margin-top: 0.1em;
  transition: all 0.3s;
  cursor: pointer;
}

.add-button:hover {
  transform: scale(1.1);
}

.input {
  width: 30%;
}

.select {
  max-width: 85%;
}

.textarea {
  width: 100%;
  max-height: unset;
}

#form {
  text-align: left;
  margin: 1em;
}

@media (max-width: 640px) {
  .input, #pick-artists {
    width: 100%;
  }
}
</style>
