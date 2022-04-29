<template>
  <v-dialog v-model="dialog" persistent transition="dialog-bottom-transition">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text x-small plain ripple v-bind="attrs" v-on="on">
        delete
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="text-h5">
        댓글 삭제
      </v-card-title>
      <v-card-text>
        댓글을 정말로 삭제하시겠습니까?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="green--text" text @click="dialog = false">
          cancel
        </v-btn>
        <v-form @submit="deleteComment">
          <v-btn
            class="white--text"
            color="green accent-4"
            depressed
            type="submit"
          >
            Okay
          </v-btn>
        </v-form>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { deleteComment } from '@/api/comment';

export default {
  props: {
    commentId: {
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    async deleteComment() {
      try {
        await deleteComment(this.commentId);
      } catch (error) {
        console.log(error);
        this.logMessage = error;
      }
    },
  },
};
</script>

<style></style>
