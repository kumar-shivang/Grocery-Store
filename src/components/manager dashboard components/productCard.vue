<script>
export default {
  name: 'productCard',
  props: {
    product: {
      type: Object,
      required: true,
      validator(product) {
        console.log(product)
        let id = product.id
        let name = product.name
        let description = product.description
        let rate = product.rate
        let unit = product.unit
        let current_stock = product.current_stock
        let category = product.category
        let image = product.image
        if (id && name && description && rate && unit && current_stock && category && image) {
          return true
        } else {
          return false
        }
      }
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
    <img class="card-img-top img" :src="toURL(product.image.image_path)" />
    <div class="card-body">
      <h3 class="card-title">
        {{ product.name }}
      </h3>
      <div class="card-subtitle">
        {{ product.description }}
      </div>
      <div class="card-footer">
        <h3 style="display: inline">{{ product.rate }}Rs</h3>
        per {{ product.unit }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 15rem;
  margin: 1rem;
  border: 1px solid black;
  z-index: -1;
}
.card-img-top {
  width: 100%;
  height: 15rem;
  object-fit: cover;
}
</style>
