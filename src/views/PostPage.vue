<template>
  <div class="main list-container contents">
    <h1 class="page-header">{{ boardName }} Board</h1>
    <LoadingSpinner v-if="isLoading"></LoadingSpinner>
    <PostItem v-else :postItem="postItem"></PostItem>
    <p>{{ logMessage }}</p>
  </div>
</template>

<script>
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import { fetchPost } from '@/api/post';
import PostItem from '@/components/posts/PostItem';

export default {
  components: {
    PostItem,
    LoadingSpinner,
  },
  data() {
    return {
      postItem: {},
      isLoading: false,
      logMessage: '',
      boardName: this.$route.params.boardName,
      postId: this.$route.params.postId,
    };
  },
  methods: {
    async fetchData() {
      this.isLoading = true;
      try {
        const { data } = await fetchPost(this.boardName, this.postId);
        this.isLoading = false;
        this.postItem = data.data;
      } catch (error) {
        console.log(error.response.data.msg);
        this.logMessage = error.response.data.msg;
      }
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style></style>
