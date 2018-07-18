<template>
  <spinner class="loading-spinner" :size="size" :lineSize="lineSize" line-fg-color="#41b883"/>
</template>

<script>
import Spinner from 'vue-simple-spinner';

export default {
  props: {
    size: {
      type: Number,
      required: false,
      default: 90
    },
    lineSize: {
      type: Number,
      required: false,
      default: 9
    }
  },
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
