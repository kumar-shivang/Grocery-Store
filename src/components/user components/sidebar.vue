<script>
import { useUserStore } from '@/stores/userStore'
import { useBaseStore } from '@/stores/baseStore'
import order from '@/components/user components/order.vue'

export default {
  name: 'sidebar',
  setup() {
    const userStore = useUserStore()
    const baseStore = useBaseStore()
    return { userStore, baseStore }
  },
  data() {
    return {
      user: {
        id: null,
        username: '',
        email: ''
      }
    }
  },
  components: {
    order
  },
  computed: {
    access_token() {
      return this.userStore.getAccessToken
    },
    loggedIn() {
      return this.userStore.getIsLogged
    },
    confirmed() {
      return this.userStore.getConfirmed
    },
    unconfirmed() {
      return this.userStore.getUnconfirmed
    },
    totalOrderValue() {
      return this.userStore.getTotalOrderValue
    }
  },
  methods: {
    async getUser() {
      if (this.access_token) {
        const response = await fetch('http://localhost:5000/api/user/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.access_token
          }
        })
        const data = await response.json()
        if (response.ok) {
          this.user.id = data.id
          this.user.username = data.username
          this.user.email = data.email
        }
      }
    },
    async confirmAll() {
      const response = await fetch('http://localhost:5000/api/order/confirm_all', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.access_token
        }
      })
      const data = await response.json()
      if (response.ok) {
        this.baseStore.showNotification('All orders confirmed successfully', 'success')
        await this.userStore.fetchUnconfirmedOrders()
        await this.userStore.fetchConfirmedOrders()
      } else {
        this.baseStore.showNotification(data.message, 'danger')
      }
    }
  },
  beforeMount() {
    if (this.loggedIn) {
      this.getUser()
      this.userStore.fetchUnconfirmedOrders()
      this.userStore.fetchConfirmedOrders()
    }
  }
}
</script>

<template>
  <div id="sidebar" class="d-flex flex-column justify-content-around">
    <div id="sidebarMain" class="d-flex flex-column justify-content-between">
      <div id="brand" class="d-flex flex-column justify-content-center align-items-center h-25">
        <img id="brandLogo" src="@/assets/logo.svg" alt="logo" />
        <h2>Grocery Store</h2>
      </div>
      <div id="userDetails" class="d-flex flex-column align-items-center shadow-sm" v-if="loggedIn">
        <div class="d-flex flex-column align-items-center">
          <h3>{{ user.username }}</h3>
        </div>
        <div class="d-flex flex-column align-items-center">
          <h4>{{ user.email }}</h4>
        </div>
      </div>
      <div id="cart" class="shadow-sm d-flex flex-column justify-content-between" v-if="loggedIn">
        <div id="cartWithoutButton" class="d-flex flex-column align-items-center">
          <h3 class="text-center">Cart</h3>
          <div id="cartTable" class="w-100">
            <table class="table table-responsive table-bordered w-100">
              <tr id="tableHeading">
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th colspan="2">Action</th>
              </tr>
              <order :id="order.id" v-for="order in unconfirmed" :key="order.id" />
            </table>
          </div>
        </div>
        <button
          class="btn btn-success w-100"
          data-bs-toggle="modal"
          data-bs-target="#confirmAllModal"
        >
          Confirm All
        </button>
      </div>
    </div>
    <div id="buttons">
      <button v-if="!loggedIn" class="btn btn-outline-dark" @click="this.$router.push('/login')">
        Login
      </button>
      <button v-if="loggedIn" class="btn btn-outline-dark" @click="this.baseStore.logout()">
        Logout
      </button>
    </div>
  </div>
  <div id="confirmAllModal" class="modal fade">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-cream">
          <h3 class="modal-title">Confirm All</h3>
          <button class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <h4>Are you sure you want to confirm all orders?</h4>
          <h5>It will cost you Rs. {{ totalOrderValue }}</h5>
        </div>
        <div class="modal-footer bg-cream">
          <button class="btn btn-success" data-bs-dismiss="modal" @click="confirmAll">Yes</button>
          <button class="btn btn-danger" data-bs-dismiss="modal">No</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#sidebar {
  height: var(--main-height) !important;
}
img {
  width: 20vh;
  height: 20vh;
}

#sidebarMain {
  height: 95%;
}
#cart {
  height: 50%;
}
#cartWithoutButton {
  height: 90%;
}
#cartTable {
  height: 90%;
  overflow-y: scroll;
}
#buttons {
  height: 5%;
}
#brand {
  height: 25%;
  margin-bottom: 1rem;
}
#brandLogo {
  width: 10rem;
  height: 10rem;
}
.btn {
  width: 100%;
}
table {
  width: 90%;
}
#tableHeading {
  position: sticky;
  top: 0;
  background-color: white;
}
th {
  text-align: center;
}
</style>
