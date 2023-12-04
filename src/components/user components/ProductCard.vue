<script>
export default {
  name: 'ProductCard',
  data() {
    return {
      quantity: 1
    }
  },
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
      <div>{{ product.rate }}Rs Per {{ product.unit }}</div>
      <div class="card-footer">
        <div id="adjust">
          <i class="bi bi-plus"></i>
          <span id="quantity">{{ quantity }}</span>
          <i class="bi bi-dash"></i>
        </div>

        <button id="addToCart" class="btn btn-outline-dark">Buy <i class="bi bi-cart" /></button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 15rem;
  height: max-content;
  margin: 1rem;
  border: 1px solid black;
}
img {
  width: 12rem;
  height: 12rem;
}
.card-footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
#quantity {
  margin: 0 1rem;
  font-size: 1.5rem;
}
#addToCart {
  height: 50%;
}
.bi-plus:hover {
  cursor: pointer;
  background-color: rgb(128, 128, 128);
  color: white;
}
.bi-dash:hover {
  cursor: pointer;
  background-color: rgb(128, 128, 128);
  color: white;
}
</style>
