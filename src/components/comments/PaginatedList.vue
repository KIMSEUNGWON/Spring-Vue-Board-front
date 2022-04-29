<template>
  <v-card :color="selectColor(item.commentOrderInGroup)" class="mt-5">
    <CommentListItemHeader :item="item" />

    <CommentListItemBody :item="item" :edit="edit" @editCancel="editCancel" />

    <CommentListItemFooter
      :item="item"
      :show="show"
      :edit="edit"
      @replyShow="replyShow"
      @editCancel="editCancel"
    />
    <!--    todo 좋아요 기능 만들기-->

    <v-expand-transition>
      <div v-if="show">
        <v-divider></v-divider>

        <template
          v-if="Array.isArray(item.children) && item.children.length === 0"
          class="showReplyInputForm"
        >
          <ReplyInputForm
            :parentCommentId="item.commentId"
            @replyCancel="replyCancel"
          />
        </template>
        <template v-else class="showChildReplies">
          <v-card-text>
            <!--https://www.digitalocean.com/community/tutorials/vuejs-recursive-components-->
            <!--https://leestrument.tistory.com/entry/Dropdown-%EB%A9%94%EB%89%B4-%EB%A7%8C%EB%93%A4%EA%B8%B0-recursion-%EA%B3%BC-tree-->
            <PaginatedList
              v-for="(children, index) in item.children"
              :item="children"
              :key="index"
            />
            <div class="mt-5">
              <template v-if="showReplyForm">
                <ReplyInputForm
                  :parentCommentId="item.commentId"
                  @replyCancel="replyChildCancel()"
                />
              </template>
              <template v-else>
                <v-btn
                  block
                  class="green--text"
                  outlined
                  depressed
                  @click="showReplyForm = !showReplyForm"
                >
                  답글 작성하기
                </v-btn>
              </template>
            </div>
          </v-card-text>
        </template>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import ReplyInputForm from '@/components/comments/form/ReplyInputForm';
import { deleteComment } from '@/api/comment';
import CommentListItemHeader from '@/components/comments/commentListItem/CommentListItemHeader';
import CommentListItemBody from '@/components/comments/commentListItem/CommentListItemBody';
import CommentListItemFooter from '@/components/comments/commentListItem/CommentListItemFooter';

export default {
  name: 'PaginatedList',
  components: {
    CommentListItemHeader,
    CommentListItemBody,
    CommentListItemFooter,
    ReplyInputForm,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      show: false,
      showReplyForm: false,
      edit: false,
    };
  },
  methods: {
    selectColor(commentOrderInGroup) {
      switch (commentOrderInGroup) {
        case 1:
          return 'white';
        case 2:
          return 'grey lighten-5';
        case 3:
          return 'grey lighten-4';
        case 4:
          return 'grey lighten-3';
        case 5:
          return 'grey lighten-2';
        default:
          return 'grey lighten-1';
      }
    },
    replyCancel() {
      this.show = !this.show;
    },
    replyChildCancel() {
      this.showReplyForm = !this.showReplyForm;
    },
    editCancel() {
      this.edit = !this.edit;
    },
    async deleteComment() {
      if (confirm('You want to delete it?')) {
        const commentId = this.item.commentId;
        try {
          await deleteComment(commentId);
        } catch (error) {
          console.log(error);
          this.logMessage = error;
        }
      }
    },
    replyShow() {
      this.show = !this.show;
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
table th {
  font-size: 1.2rem;
}
table tr {
  height: 2rem;
  text-align: center;
  border-bottom: 1px solid #505050;
}
table tr:first-of-type {
  border-top: 2px solid #404040;
}
table tr td {
  padding: 1rem 0;
  font-size: 1.1rem;
}
.btn-cover {
  margin-top: 1.5rem;
  text-align: center;
}
.btn-cover .page-btn {
  width: 5rem;
  height: 2rem;
  letter-spacing: 0.5px;
}
.btn-cover .page-count {
  padding: 0 1rem;
}
</style>
