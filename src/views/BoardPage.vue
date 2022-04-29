<template>
  <div class="main list-container contents">
    <h1 class="page-header">{{ boardName }} Board</h1>
    <LoadingSpinner v-if="isLoading"></LoadingSpinner>
    <PostListItem2 v-else :postItems="postItems"> </PostListItem2>
    <p>{{ logMessage }}</p>
  </div>
</template>

<script>
import PostListItem2 from '@/components/posts/PostListItem2.vue';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import { fetchPosts } from '@/api/post';

export default {
  components: {
    PostListItem2,
    LoadingSpinner,
  },
  data() {
    return {
      postItems: [],
      isLoading: false,
      logMessage: '',
      boardName: this.$route.params.boardName,
    };
  },
  methods: {
    async fetchData() {
      this.isLoading = true;
      try {
        const { data } = await fetchPosts(this.boardName);
        this.isLoading = false;
        this.postItems = data.data;
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
