<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    toURL(string) {
      return 'http://localhost:5000/' + string
    }
  }
}
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class="card-header">
        {{ product.category.category_name }}
      </div>
      <div class="card-img">
        <img :src="toURL(product.image.image_path)" alt="product image" />
      </div>
      <div class="card-title">
        <h3>{{ product.name }}</h3>
      </div>
      <div class="card-text">
        <p>{{ product.description }}</p>
      </div>
      <div class="card-footer">
        <p>{{ product.price }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 15rem;
  height: 25rem;
  margin: 1rem;
  border: 1px solid black;
}
img {
  width: 12rem;
  height: 12rem;
}
</style>
