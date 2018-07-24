<template>
  <div class="pagination">
    <a @click.prevent="handlePrevious">&laquo;</a>
    <a v-for="n in pages" :class="{active: n == currentPage}" :key="n" @click.prevent="handleGoTo(n)" >{{ n }}</a>
    <a @click.prevent="handleNext">&raquo;</a>
  </div>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: false,
      default: 5
    }
  },
  data() {
    return {
      currentPage: 1,
    }
  },
  computed: {
    pages() {
      return Math.ceil(this.count/this.perPage);
    }
  },
  methods: {
    handlePrevious() {
      if(this.currentPage != 1) {
        this.currentPage--;
        this.$emit('previous');
      }
    },
    handleNext() {
      if(this.currentPage != this.pages) {
        this.currentPage++;
        this.$emit('next');
      }
    },
    handleGoTo(n) {
      if(this.currentPage != n) {
        this.currentPage = n;
        this.$emit('go-to', n);
      }
    }
  }
}
</script>

<style scoped>
.pagination {
  display: inline-block;
}

.pagination a {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  border: 1px solid #ddd;
}

.pagination a.active {
  background-color: #41b883;
  color: white;
  border: 1px solid #41b883;
}

.pagination a:hover:not(.active) {
  background-color: #ddd;
}

.pagination a:first-child {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.pagination a:last-child {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>
