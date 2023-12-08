<script>
import { useBaseStore } from '@/stores/baseStore'
import { useUserStore } from '@/stores/userStore'
export default {
  name: 'ProductCard',
  data() {
    return {
      quantity: 1
    }
  },
  setup() {
    const baseStore = useBaseStore()
    const userStore = useUserStore()
    return { baseStore, userStore }
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    access_token() {
      return this.baseStore.getAccessToken
    },
    loggedIn() {
      return this.baseStore.getIsLogged
    },
    outOfStock() {
      return this.product.current_stock === 0
    }
  },
  methods: {
    toURL(string) {
      return 'http://localhost:5000/' + string
    },
    async toCart() {
      if (!this.loggedIn) {
        this.baseStore.showNotification('Please login to continue', 'danger')
        setTimeout(() => {
          this.$router.push('/login')
        }, 3000)
      } else {
        const response = await fetch('http://localhost:5000/api/order/place_order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.access_token
          },
          body: JSON.stringify({
            product_id: this.product.id,
            quantity: this.quantity
          })
        })
        const data = await response.json()
        if (response.ok) {
          this.baseStore.showNotification('Order placed successfully', 'success')
          await this.userStore.fetchProducts()
        } else {
          this.baseStore.showNotification(data.message, 'danger')
        }
        await this.userStore.fetchUnconfirmedOrders()
        await this.userStore.fetchConfirmedOrders()
      }
    }
  }
}
</script>

<template>
  <div class="card shadow-sm" :class="{ 'bg-danger-subtle': outOfStock }">
    <div class="card-header bg-cream d-flex flex-row justify-content-between">
      {{ product.category.category_name }}
      <div v-if="!outOfStock" class="card-header-pills">
        Stock Left: {{ product.current_stock }} {{ product.unit }}
      </div>
      <div v-else class="card-header-pills text-danger">Out of Stock</div>
    </div>
    <div class="card-img-top">
      <img :src="toURL(product.image.image_path)" alt="product image" />
    </div>
    <div class="card-body">
      <div class="card-title">
        <h3>{{ product.name }}</h3>
      </div>
      <div class="card-text">
        <p>{{ product.description }}</p>
      </div>
      <div id="rate">
        <h2 class="d-inline-block">{{ product.rate }}</h2>
        <h4 class="d-inline-block">Rs</h4>
        Per {{ product.unit }}
      </div>
      {{ product.expiry_date }}
    </div>
    <div class="card-footer d-flex flex-row bg-cream">
      <div id="adjust" class="w-75 d-flex flex-row justify-content-between align-content-center">
        <i
          class="bi bi-plus"
          @click="quantity = quantity < product.current_stock ? quantity + 1 : quantity"
        ></i>
        <span id="quantity-unit" class="d-inline-block">
          <span id="quantity">{{ quantity }}</span
          ><span id="unit">{{ product.unit }}</span>
        </span>
        <i class="bi bi-dash" @click="quantity = quantity > 1 ? quantity - 1 : quantity"></i>
      </div>

      <i class="bi bi-cart" @click="toCart" />
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 15rem;
  height: 32rem;
  margin: 1rem;
}
img {
  width: 100%;
  height: 12rem;
}
.card-footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
#quantity {
  margin: 0;
  font-size: 1.5rem;
}
#quantity-unit {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0.1rem;
}
#addToCart {
  height: 50%;
  width: 30%;
  font-size: 0.9rem;
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
.bi {
  font-size: 1.5rem;
}
#adjust {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 70%;
}
.bi-cart {
  font-size: 2rem;
  color: green;
}
.bi-cart:hover {
  color: white;
  background-color: green;
}
.card-title {
  text-transform: capitalize;
}
.card-header {
  text-transform: capitalize;
}
.bg-cream {
  background-color: mintcream;
}
</style>
