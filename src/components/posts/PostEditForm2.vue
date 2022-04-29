<template>
  <div class="main list-container contents">
    <h1 class="page-header">Edit Post</h1>
    <v-card class="ma-7">
      <v-form ref="form" v-model="valid" lazy-validation class="pa-7">
        <v-text-field
          v-model="author"
          label="Author"
          required
          disabled
          solo
        ></v-text-field>

        <v-text-field
          v-model="title"
          :counter="10"
          :rules="titleRules"
          label="Title"
          required
        ></v-text-field>

        <v-textarea
          v-model="content"
          clearable
          clear-icon="mdi-close-circle"
          :counter="300"
          :rules="contentRules"
          label="Content"
          required
        ></v-textarea>

        <v-select
          v-model="select"
          :items="items"
          :rules="[v => !!v || 'Item is required']"
          label="Item"
          required
        ></v-select>

        <v-checkbox
          v-model="checkbox"
          :rules="[v => !!v || 'You must agree to continue!']"
          label="Secret Mode"
          required
        ></v-checkbox>

        <v-btn
          :disabled="!isCreateValid"
          color="success"
          class="mr-4"
          @click="submitForm"
        >
          Edit
        </v-btn>

        <v-btn
          :disabled="!isCreateValid"
          color="success"
          class="mr-4"
          @click="validate"
        >
          Validate
        </v-btn>

        <v-btn color="error" class="mr-4" @click="reset">
          Reset Form
        </v-btn>

        <v-btn color="warning" @click="resetValidation">
          Reset Validation
        </v-btn>
      </v-form>
      <p class="log">
        {{ logMessage }}
      </p>
    </v-card>
  </div>
</template>

<script>
import { editPost } from '@/api/post';

export default {
  props: {
    postItem: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      author: this.$store.state.username,
      title: this.postItem.title,
      content: this.postItem.content,
      logMessage: '',
      valid: true,
      titleRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Title must be less than 10 characters',
      ],
      contentRules: [
        v => !!v || 'Content is required',
        v =>
          (v && v.length <= 300) || 'Content must be less than 300 characters',
      ],
      select: null,
      items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
      checkbox: false,
    };
  },
  computed: {
    isCreateValid() {
      if (this.author == '' || this.title == '' || this.content == '') {
        return false;
      }

      return this.valid;
    },
  },
  methods: {
    async submitForm() {
      try {
        const boardName = this.$route.params.boardName;
        const postId = this.$route.params.postId;
        const response = await editPost(boardName, postId, {
          author: this.author,
          title: this.title,
          content: this.content,
        });
        this.logMessage = response.data.msg;
        this.$router.push(`/board/${boardName}/post/${postId}`);
        console.log(response);
      } catch (error) {
        console.log(error.response.data.msg);
        this.logMessage = error.response.data.msg;
      }
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>

<style></style>
