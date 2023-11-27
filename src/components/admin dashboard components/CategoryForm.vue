<script>
import { useAdminStore } from '@/stores/adminStore'
import { Form, Field, ErrorMessage } from 'vee-validate'
export default {
  name: 'CategoryForm',
  setup() {
    const adminStore = useAdminStore()
    return { adminStore }
  },
  data() {
    return {
      category_name: '',
      category_description: '',
      ok: false,
      message: ''
    }
  },
  components: {
    Form,
    Field,
    ErrorMessage
  },
  methods: {
    async createCategory() {
      const response = await fetch(`http://localhost:5000/api/admin/create_category`, {
        headers: {
          Authorization: `Bearer ${this.adminStore.access_token}`,
          'Content-Type': 'application/json'
        },
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
          category_name: this.category_name,
          category_description: this.category_description
        })
      })
      let data = await response.json()
      if (response.ok) {
        this.cleanJSON(data.message)
        this.ok = true
        this.category_name = ''
        this.category_description = ''
        await this.adminStore.fetchCategories()
      } else {
        this.cleanJSON(data.message)
        this.ok = false
      }
    },
    cleanJSON(string) {
      // write a fundtion that sets this.message to a string removing everything expect what is between '' in the string
      let start = string.indexOf('[')
      let end = string.indexOf(']')
      this.message = string.slice(start + 1, end)
    }
  }
}
</script>

<template>
  <h3 class="mx-auto">Create Category</h3>

  <Form class="form" @submit="createCategory">
    <div class="form-group">
      <label for="category_name">Category Name</label>
      <Field
        name="category_name"
        label="Category Name"
        v-model="category_name"
        type="text"
        class="form-control-sm"
      />
    </div>
    <div class="form-group">
      <label for="category_description">Category Description</label>
      <Field
        name="category_description"
        label="Category Description"
        v-model="category_description"
        class="form-control-sm"
        type="text"
      />
    </div>
    <div v-if="ok && message" class="text-success">
      {{ message }}
    </div>
    <div v-else-if="!ok && message" class="text-danger">
      {{ message }}
    </div>
    <button class="btn btn-primary mx-auto" type="submit">Create Category</button>
  </Form>
</template>

<style scoped>
.form {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: end;
}
.form-group {
  margin-right: 33%;
}
</style>
