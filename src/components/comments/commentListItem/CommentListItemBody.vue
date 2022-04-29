<template>
  <v-card-text>
    <div class="text--primary text-h6 font-weight-light">
      <template v-if="!edit">
        <p
          :class="{
            'font-italic': item.isDeleted,
            'font-weight-medium': item.isSecret,
          }"
        >
          content: {{ formatContent }}
        </p>
      </template>
      <template v-else>
        <CommentEditForm
          :comment="{
            id: item.commentId,
            content: item.content,
            isSecret: item.isSecret,
          }"
          @editCancel="editCancel"
        />
      </template>
    </div>
  </v-card-text>
</template>

<script>
import CommentEditForm from '@/components/comments/form/CommentEditForm';
import {
  commentUserEmailMatchLoginUserEmail,
  postUserEmailMatchLoginUserEmail,
} from '@/components/comments/commentListItem/util/chekcEmail';

export default {
  name: 'CommentListItemBody',
  components: {
    CommentEditForm,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    edit: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    editCancel() {
      this.$emit('editCancel');
    },
  },
  computed: {
    formatContent() {
      let content = this.item.content;
      if (this.item.isSecret) {
        content = 'secret comment';
        if (this.isCommentOwner || this.isPostOwner) {
          content = this.item.content;
        }
      }
      return content;
    },
    isCommentOwner() {
      return commentUserEmailMatchLoginUserEmail(
        this.item.email,
        this.$store.state.username,
      );
    },
    isPostOwner() {
      return postUserEmailMatchLoginUserEmail(
        this.item.postUserEmail,
        this.$store.state.username,
      );
    },
  },
};
</script>

<style scoped></style>
