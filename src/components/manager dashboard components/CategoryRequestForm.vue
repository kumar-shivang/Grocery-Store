<script>
import { useManagerStore } from '@/stores/managerStore'
import { Form, ErrorMessage, Field } from 'vee-validate'

export default {
  name: 'CategoryRequestForm',
  setup() {
    const managerStore = useManagerStore()
    return { managerStore }
  },
  components: {
    Form,
    Field,
    ErrorMessage
  },
  data() {
    return {
      category_name: '',
      category_description: '',
      response_ok: false,
      response_message: ''
    }
  },
  methods: {
    async requestCategory() {
      const response = await fetch('http://localhost:8000/api/manager/request_category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.managerStore.access_token
        },
        body: JSON.stringify({
          category_name: this.category_name,
          category_description: this.category_description
        })
      })
      let data = await response.json()
      if (response.ok) {
        this.response_ok = true
        this.response_message =
          'Category request created successfully, please wait for admin approval'
      } else {
        this.response_ok = false
        this.response_message = data.message
      }
    },
    validateCategoryName(category_name) {
      if (!category_name) {
        return 'Category name is required'
      } else if (category_name.length < 4) {
        return 'Category name must be at least 4 characters long'
      } else if (category_name.length > 20) {
        return 'Category name must be at most 20 characters long'
      } else {
        return true
      }
    },
    validateCategoryDescription(category_description) {
      if (!category_description) {
        return 'Category description is required'
      } else if (category_description.length < 10) {
        return 'Category description must be at least 10 characters long'
      } else if (category_description.length > 20) {
        return 'Category description must be at most 20 characters long'
      } else {
        return true
      }
    }
  }
}
</script>

<template>
  <template class="d-flex flex-column">
    <h3 class="mx-auto" id="title">Request Category</h3>
    <Form class="form" @submit="requestCategory">
      <div class="form-group">
        <div class="inner-group">
          <label for="category_name">Category Name</label>
          <Field
            name="category_name"
            label="Category Name"
            v-model="category_name"
            type="text"
            class="form-control-sm"
            :rules="[validateCategoryName]"
          />
        </div>
        <ErrorMessage name="category_name" class="text-danger" />
      </div>
      <div class="form-group">
        <div class="inner-group">
          <label for="category_description">Category Description</label>
          <Field
            name="category_description"
            label="Category Description"
            v-model="category_description"
            class="form-control-sm"
            type="text"
            :rules="[validateCategoryDescription]"
          />
        </div>
        <ErrorMessage name="category_description" class="text-danger" />
      </div>
      <div class="alert alert-success" v-if="response_ok && response_message">
        {{ response_message }}
      </div>
      <div class="alert alert-danger" v-else-if="!response_ok && response_message">
        {{ response_message }}
      </div>
      <button class="btn btn-primary mx-auto" type="submit">Create Category</button>
    </Form>
  </template>
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
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}
label {
  margin-right: 1rem;
}
#title {
  margin-bottom: 1rem;
}
</style>
