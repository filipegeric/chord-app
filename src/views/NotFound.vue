<template>
  <div class="flex-center position-ref full-height">
    <div class="content">
        <div class="title">Sorry, the page you are looking for could not be found.</div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.full-height {
  height: 90vh;
}

.flex-center {
  align-items: center;
  display: flex;
  justify-content: center;
}

.position-ref {
  position: relative;
}

.content {
  text-align: center;
}

.title {
  font-size: 36px;
  padding: 20px;
  color: #636b6f;
}
</style>
