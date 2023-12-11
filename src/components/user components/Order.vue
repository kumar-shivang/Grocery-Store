<script>
import { useUserStore } from '@/stores/userStore'
import { useBaseStore } from '@/stores/baseStore'

export default {
  name: 'order',
  setup() {
    const userStore = useUserStore()
    const baseStore = useBaseStore()
    return { userStore, baseStore }
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  computed: {
    access_token() {
      return this.userStore.getAccessToken
    }
  },
  data() {
    return {
      order: {
        id: null,
        product_id: null,
        quantity: null,
        confirmed: null,
        value: null,
        product: {
          name: '',
          unit: '',
          image: {
            id: null,
            path: ''
          }
        }
      }
    }
  },
  beforeMount() {
    this.getOrder()
  },
  methods: {
    async getOrder() {
      const response = await fetch('http://localhost:5000/api/order/get_order/' + this.id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.access_token
        }
      })
      const data = await response.json()
      if (response.ok) {
        let rawOrder = data.order
        this.order.id = rawOrder.id
        this.order.product_id = rawOrder.product_id
        this.order.quantity = rawOrder.quantity
        this.order.confirmed = rawOrder.confirmed
        this.order.value = rawOrder.value
        this.order.product.name = rawOrder.product.name
        this.order.product.unit = rawOrder.product.unit
        this.order.product.image.id = rawOrder.product.image.id
        this.order.product.image.path = 'http://localhost:5000/' + rawOrder.product.image.image_path
      }
    },
    async confirm(id) {
      const response = await fetch('http://localhost:5000/api/order/confirm_order/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.access_token
        }
      })
      const data = await response.json()
      if (response.ok) {
        this.baseStore.showNotification('Order confirmed successfully', 'success')
        await this.userStore.fetchUnconfirmedOrders()
        await this.userStore.fetchConfirmedOrders()
      } else {
        this.baseStore.showNotification(data.message, 'danger')
      }
    },
    async cancel() {
      const response = await fetch('http://localhost:5000/api/order/cancel_order/' + this.id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.access_token
        }
      })
      const data = await response.json()
      if (response.ok) {
        this.baseStore.showNotification('Order cancelled successfully', 'success')
        await this.userStore.fetchUnconfirmedOrders()
        await this.userStore.fetchConfirmedOrders()
        await this.userStore.fetchProducts()
      } else {
        this.baseStore.showNotification(data.message, 'danger')
      }
    }
  }
}
</script>

<template>
  <tr>
    <td>{{ order.product.name }}</td>
    <td>{{ order.quantity }} {{ order.product.unit }}</td>
    <td>{{ order.value }}₹</td>
    <td>
      <button
        class="bi bi-check2-square"
        data-bs-toggle="modal"
        data-bs-target="#productConfirmation"
        role="button"
        type="button"
      ></button>
    </td>
    <td>
      <i class="bi bi-x-square" @click="cancel"></i>
    </td>
  </tr>

  <!-- Modal -->
  <div class="modal fade" id="productConfirmation" aria-labelledby="exampleModalLabel">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Order Confirmation</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          Are you sure you want to confirm this order? It will cost you Rs.
          {{ order.value }}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button
            type="button"
            class="btn btn-success"
            data-bs-dismiss="modal"
            @click="confirm(order.id)"
          >
            Buy Anyway
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
td {
  vertical-align: middle !important;
  text-align: center !important;
}
img {
  width: 10px;
  height: 10px;
}
.bi {
  font-size: 1.5rem;
  background: transparent;
}
.bi-check2-square {
  color: green;
}
.bi-check2-square:hover {
  color: white;
  background-color: green;
}
.bi-x-square {
  color: red;
}
.bi-x-square:hover {
  color: white;
  background-color: red;
}
</style>
