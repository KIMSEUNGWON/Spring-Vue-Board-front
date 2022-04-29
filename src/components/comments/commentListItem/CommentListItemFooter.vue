<template>
  <v-card-actions>
    <div class="addCommentOrReply">
      <v-btn color="green lighten-2" text plain @click="replyShow">
        <template v-if="!show">
          <template
            v-if="Array.isArray(item.children) && item.children.length === 0"
          >
            <v-icon>
              mdi-plus-box-outline
            </v-icon>
            <span>답글 달기</span>
          </template>
          <template v-else>
            <v-icon>
              mdi-plus-box-outline
            </v-icon>
            <span>{{ item.children.length }}개의 답글</span>
          </template>
        </template>
        <template v-else>
          <v-icon>
            mdi-minus-box-outline
          </v-icon>
          <span>숨기기</span>
        </template>
      </v-btn>
    </div>

    <v-spacer />

    <div class="editAndDelete">
      <template v-if="!edit && !isCommentDeleted">
        <template v-if="isCommentOwner">
          <v-btn text x-small plain @click="editCancel">
            edit
          </v-btn>
        </template>
        <template v-if="isPostOwner || isCommentOwner">
          <CommentDeleteForm :commentId="item.commentId" />
        </template>
      </template>
    </div>
  </v-card-actions>
</template>

<script>
import CommentDeleteForm from '@/components/comments/form/CommentDeleteForm';
import {
  commentUserEmailMatchLoginUserEmail,
  postUserEmailMatchLoginUserEmail,
} from '@/components/comments/commentListItem/util/chekcEmail';

export default {
  name: 'CommentListItemFooter',
  components: {
    CommentDeleteForm,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    show: {
      type: Boolean,
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
    replyShow() {
      this.$emit('replyShow');
    },
    editCancel() {
      this.$emit('editCancel');
    },
  },
  computed: {
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
    isCommentDeleted() {
      return this.item.isDeleted;
    },
  },
};
</script>

<style scoped></style>
