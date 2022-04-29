<template>
  <div>
    <v-container fluid>
      <v-form @submit="submitEditComment">
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
          <v-btn class="green--text" text depressed @click="clickCancel">
            취소
          </v-btn>
          <v-btn
            class="white--text"
            color="green accent-4"
            depressed
            type="submit"
          >
            댓글 수정
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import { editComment } from '@/api/comment';

export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      content: this.comment.content,
      isSecret: this.comment.isSecret,
    };
  },
  methods: {
    async submitEditComment() {
      const commentId = this.comment.id;
      try {
        await editComment(commentId, {
          content: this.content,
          isSecret: this.isSecret,
        });
      } catch (error) {
        console.log(error);
        this.logMessage = error;
      }
    },
    clickCancel() {
      this.$emit('editCancel');
    },
  },
};
</script>

<style></style>
