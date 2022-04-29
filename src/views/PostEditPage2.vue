<template>
  <div class="form-container">
    <PostEditForm2 :postItem="this.$route.params.post"></PostEditForm2>
  </div>
</template>

<script>
import PostEditForm2 from '@/components/posts/PostEditForm2.vue';

export default {
  components: {
    PostEditForm2,
  },
};
</script>

<style></style>
