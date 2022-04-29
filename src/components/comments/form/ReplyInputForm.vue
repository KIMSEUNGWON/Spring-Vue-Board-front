<template>
  <div>
    <v-container fluid>
      <v-form ref="form" lazy-validation @submit="submitReply">
        <v-textarea
          solo
          auto-grow
          v-model="content"
          label="Reply here"
        ></v-textarea>
        <v-switch
          inset
          color="success"
          v-model="isSecret"
          label="Secret Mode"
        ></v-switch>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="green--text" text depressed @click="clickCancel">
            취소
          </v-btn>
          <v-btn
            class="white--text"
            color="green accent-4"
            depressed
            type="submit"
          >
            답글 작성
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import { createReply } from '@/api/comment';

export default {
  props: {
    parentCommentId: {
      required: true,
    },
  },
  data() {
    return {
      content: '',
      isSecret: false,
    };
  },
  methods: {
    async submitReply() {
      const commentId = this.parentCommentId;
      try {
        await createReply(commentId, {
          content: this.content,
          isSecret: this.isSecret,
        });
      } catch (error) {
        console.log(error);
        this.logMessage = error;
      }
    },
    clickCancel() {
      this.$emit('replyCancel');
    },
  },
};
</script>

<style></style>
