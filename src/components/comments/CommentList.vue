<template>
  <div>
    <CommentListHeader :numOfComments="numOfComments" />

    <CommentInputItem />

    <CommentListItem :commentItems="commentItems" :postId="postId" />
  </div>
</template>

<script>
import CommentListHeader from '@/components/comments/CommentListHeader';
import CommentInputItem from '@/components/comments/form/CommentInputForm';
import CommentListItem from '@/components/comments/CommentListItem';
import { fetchComment } from '@/api/comment';

export default {
  components: {
    CommentListHeader,
    CommentInputItem,
    CommentListItem,
  },
  data() {
    return {
      loading: false,
      postId: this.$route.params.postId,
      numOfComments: 0,
      commentItems: [],
    };
  },
  methods: {
    async fetchData() {
      this.isLoading = true;
      try {
        const { data } = await fetchComment(this.postId);
        console.log(data);
        this.isLoading = false;
        this.commentItems = data.data;
        this.$store.state.comments = data.data;
        this.numOfComments = data.data.length;
      } catch (error) {
        this.isUserNotValid = true;
        console.log(error.response.data.code);
        this.logCode = error.response.data.code;
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
