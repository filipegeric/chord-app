<template>
  <div class="field">
    <label class="label">{{ label }}</label>
    <div class="control">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<style>

</style>
