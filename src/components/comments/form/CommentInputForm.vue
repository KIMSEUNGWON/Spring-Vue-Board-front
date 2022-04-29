<template>
  <div>
    <v-container fluid>
      <v-form ref="form" lazy-validation @submit="submitComment">
        <v-textarea
          solo
          auto-grow
          v-model="content"
          label="Comment here"
        ></v-textarea>
        <v-switch
          inset
          color="success"
          v-model="isSecret"
          label="Secret Mode"
        ></v-switch>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="white--text"
            color="green accent-4"
            depressed
            type="submit"
          >
            댓글 작성
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import { createComment } from '@/api/comment';

export default {
  data() {
    return {
      content: '',
      isSecret: false,
    };
  },
  methods: {
    async submitComment() {
      const postId = this.$route.params.postId;
      try {
        await createComment(postId, {
          content: this.content,
          isSecret: this.isSecret,
        });
      } catch (error) {
        console.log(error);
        this.logMessage = error;
      }
    },
  },
};
</script>

<style></style>
