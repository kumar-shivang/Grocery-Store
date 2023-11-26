<script>
import { useAdminStore } from '@/stores/adminStore'
export default {
  name: 'ManagerRequestTable',
  setup() {
    const adminStore = useAdminStore()
    return { adminStore }
  },
  beforeMount() {
    this.adminStore.fetchManagerRequests()
  },
  computed: {
    managerRequests() {
      return this.adminStore.managerRequests
    }
  }
}
</script>

<template>
  <table class="table table-bordered">
    <tr>
      <th><strong>ID</strong></th>
      <th><strong>Name</strong></th>
      <th><strong>Email</strong></th>
      <th><strong>Approve</strong></th>
      <th><strong>Reject</strong></th>
    </tr>
    <tr v-for="mr in managerRequests">
      <td>{{ mr.id }}</td>
      <td>{{ mr.username }}</td>
      <td>{{ mr.email }}</td>
      <td>
        <button
          class="bi bi-check-circle-fill text-success"
          @click="adminStore.approveManagerRequest(mr.id)"
        />
      </td>
      <td>
        <button
          class="bi bi-x-circle-fill text-danger"
          @click="adminStore.rejectManagerRequest(mr.id)"
        />
      </td>
    </tr>
  </table>
</template>

<style scoped>
table {
  width: 100%;
}
th {
  text-align: center;
}
td {
  text-align: center;
}
button {
  width: 100%;
}
</style>
