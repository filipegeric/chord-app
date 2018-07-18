<template>
  <spinner class="loading-spinner" :size="90" :lineSize="9" line-fg-color="#41b883"/>
</template>

<script>
import Spinner from 'vue-simple-spinner';

export default {
  components: {
    Spinner
  }
}
</script>

<style>
.loading-spinner {
  margin-left: auto;
  margin-right: auto;
  width: 190px;
  display: block;
  position: absolute;
  z-index: -2;
  left: 0;
  right: 0;
  padding-top: 120px;
}
</style>
