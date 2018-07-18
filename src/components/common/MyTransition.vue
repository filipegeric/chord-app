<template>
  <transition :mode="mode" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
    <slot></slot>
  </transition>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<style>

</style>
