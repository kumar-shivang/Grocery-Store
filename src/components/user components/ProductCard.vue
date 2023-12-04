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
      }
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
      <div id="rate">
        <h2 class="d-inline-block">{{ product.rate }}</h2>
        <h4 class="d-inline-block">Rs</h4>
        Per {{ product.unit }}
      </div>
      <div id="stock">
        <h4 class="d-inline-block me-2">Stock:</h4>
        <h4 class="d-inline-block">{{ product.current_stock }} {{ product.unit }}</h4>
      </div>
      <div class="card-footer">
        <div id="adjust">
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

        <button id="addToCart" class="btn btn-success">
          Buy <i class="bi bi-cart" @click="toCart" />
        </button>
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
  padding: 0;
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
</style>
