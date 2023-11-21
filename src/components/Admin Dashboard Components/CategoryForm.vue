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
      category_description: ''
    }
  },
  components: {
    Form,
    Field,
    ErrorMessage
  },
  methods: {
    createCategory() {
      this.adminStore.createCategory(this.category_name, this.category_description)
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
