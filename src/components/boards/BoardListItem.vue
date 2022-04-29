<template>
  <v-card class="mb-12">
    <v-card-title class="text-overline mb-4">
      {{ boardItem.name }}
    </v-card-title>
    <v-card-text class="text-h5">
      {{ boardItem.boardId }}
    </v-card-text>
    <v-card-actions>
      <v-btn color="orange lighten-2 text" @click="boardLink">
        Go to {{ boardItem.name }}
      </v-btn>
    </v-card-actions>
    <v-card-text class="d-flex justify-end">
      {{ boardItem.createdAt | formatDate }}
      <i class="icon ion-md-create" @click="routeEditPage"></i>
      <i class="icon ion-md-trash" @click="deleteItem"></i>
    </v-card-text>
  </v-card>
</template>

<script>
import { deletePost } from '@/api/posts';

export default {
  props: {
    boardItem: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async deleteItem() {
      if (confirm('You want to delete it?')) {
        await deletePost(this.boardItem.id);
        this.$emit('refresh');
      }
    },
    routeEditPage() {
      const id = this.boardItem.id;
      this.$router.push(`/post/${id}`);
    },
    boardLink() {
      const boardName = this.boardItem.name;
      this.$router.push(`/board/${boardName}`);
    },
  },
  computed: {
    logoLink() {
      return this.$store.getters.isLogin ? '/main' : '/login';
    },
  },
};
</script>

<style></style>
