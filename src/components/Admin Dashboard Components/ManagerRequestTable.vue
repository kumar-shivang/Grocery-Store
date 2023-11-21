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
      <!--      <td>-->
      <!--        <button-->
      <!--          class="btn btn-success"-->
      <!--          @click="adminStore.approveManagerRequest(mr.id)"-->
      <!--        >-->
      <!--          Approve-->
      <!--        </button>-->
      <!--      </td>-->
      <!--      <td>-->
      <!--        <button-->
      <!--          class="btn btn-danger"-->
      <!--          @click="adminStore.rejectManagerRequest(mr.id)"-->
      <!--        >-->
      <!--          Reject-->
      <!--        </button>-->
      <!--      </td>-->
    </tr>
  </table>
</template>

<style scoped></style>
