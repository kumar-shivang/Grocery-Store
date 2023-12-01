<script>
import { useBaseStore } from '@/stores/baseStore'
export default {
  name: 'Notification',
  setup() {
    let store = useBaseStore()
    return { store }
  },
  props: {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true,
      validator: (value) => {
        return ['success', 'danger', 'info'].includes(value)
      },
      default: 'success'
    }
  },
  methods: {
    hide() {
      this.store.hideNotification()
    }
  }
}
</script>

<template>
  <div class="alert notification" :class="'alert-' + type">
    <h5 class="alert-heading" v-if="type === 'danger'">Warning</h5>
    <h5 class="alert-heading" v-else-if="type === 'success'">Success</h5>
    <h5 class="alert-heading" v-else-if="type === 'info'">Info</h5>
    {{ message }}
    <i class="bi bi-x-circle-fill text-danger" @click="hide" />
  </div>
</template>

<style scoped>
.notification {
  position: fixed;
  /* this should be displayed in bottom right corner*/
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  padding: 2rem;
}
.bi {
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
}
.alert-danger {
  border: 1px solid red;
}
.alert-success {
  border: 1px solid green;
}
</style>
