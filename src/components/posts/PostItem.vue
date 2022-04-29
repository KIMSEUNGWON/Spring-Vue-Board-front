<template>
  <v-card class="ma-7">
    <v-progress-linear
      color="deep-purple"
      height="10"
      :active="loading"
      :indeterminate="loading"
    ></v-progress-linear>
    <v-img
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>

    <v-card-title>{{ post.title }}</v-card-title>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ms-4">
          4.5 (413)
          <template v-if="post.modifiedAt">
            Edited At {{ post.modifiedAt | formatDate }}
          </template>
          <template v-else>
            {{ post.createdAt | formatDate }}
          </template>
        </div>
      </v-row>

      <div class="my-4 text-subtitle-1">
        {{ post.author }}
      </div>

      <div>
        {{ post.content }}
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Tonight's availability</v-card-title>

    <v-card-text>
      <v-chip-group
        v-model="selection"
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip>5:30PM</v-chip>

        <v-chip>7:30PM</v-chip>

        <v-chip>8:00PM</v-chip>

        <v-chip>9:00PM</v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-btn color="deep-purple lighten-2" text @click="reserve">
        Reserve
      </v-btn>
    </v-card-actions>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn class="mx-2" fab dark small color="pink" @click="likePost">
        <v-icon dark>
          mdi-heart
        </v-icon>
      </v-btn>
    </v-card-actions>

    <div v-if="this.post.isOwner">
      <v-divider class="mx-4"></v-divider>

      <v-card-actions class="text-center">
        <v-spacer></v-spacer>
        <v-btn class="ma-2" color="secondary" @click="modifyPost">
          수정
        </v-btn>
        <v-btn color="blue-grey" class="ma-2 white--text" @click="deletePost">
          삭제
          <v-icon right dark>
            mdi-cloud-upload
          </v-icon>
        </v-btn>
      </v-card-actions>
    </div>

    <CommentList />
  </v-card>
</template>

<script>
import { deletePost } from '@/api/post';
import CommentList from '@/components/comments/CommentList';

export default {
  props: {
    postItem: {
      type: Object,
      required: true,
    },
  },
  components: {
    CommentList,
  },
  data() {
    return {
      loading: false,
      selection: 1,
      post: {
        title: this.postItem.title,
        author: this.postItem.author,
        content: this.postItem.content,
        isOwner: this.postItem.owner,
        createdAt: this.postItem.createdAt,
        modifiedAt: this.postItem.modifiedAt,
        boardName: this.$route.params.boardName,
        postId: this.$route.params.postId,
      },
    };
  },
  methods: {
    reserve() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
    isPostOwner() {
      console.log('owner');
    },
    likePost() {
      console.log('like');
    },
    modifyPost() {
      console.log('modify', this.post.boardName, this.post.postId);
      // this.$router.push(`/board/${this.boardName}/post/${this.postId}/modify`);
      this.$router.push({
        // location: `/board/${this.post.boardName}/post/${this.post.postId}/modify`,
        name: 'postModify',
        params: {
          post: this.post,
        },
      });
    },
    async deletePost() {
      if (confirm('You want to delete it?')) {
        try {
          const boardName = this.$route.params.boardName;
          const postId = this.$route.params.postId;
          const response = await deletePost(boardName, postId);
          this.logMessage = response.data.msg;
          this.$router.push(`/board/${boardName}`);
          console.log(response);
        } catch (error) {
          console.log(error.response.data.msg);
          this.logMessage = error.response.data.msg;
        }
      }
    },
  },
};
</script>

<style></style>
