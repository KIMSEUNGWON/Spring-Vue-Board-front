<template>
  <div>
    <div class="main list-container contents">
      <h1 class="page-header">Today I Learned</h1>
      <LoadingSpinner v-if="isLoading"></LoadingSpinner>
      <ul v-else>
        <PostListItem
          v-for="postItem in postItems"
          :key="postItem._id"
          :postItem="postItem"
          @refresh="fetchData"
        ></PostListItem>
      </ul>
      <v-dialog v-model="isUserNotValid" persistent max-width="290">
        <v-card>
          <v-card-title class="text-h5 red--text">
            ErrorCode: {{ logCode }}
          </v-card-title>
          <v-card-text>
            {{ logMessage }}
            다시 로그인 하세요.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="darken-1" text @click="goToLogin">
              Go to Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <router-link to="/add" class="create-button">
      <i class="ion-md-add"></i>
    </router-link>
  </div>
</template>

<script>
import PostListItem from '@/components/posts/PostListItem.vue';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import { fetchBoards } from '@/api/board';
import { deleteCookie } from '@/utils/cookies';
import { getUnReadNotifications } from '@/api/notifications';

export default {
  components: {
    PostListItem,
    LoadingSpinner,
  },
  data() {
    return {
      postItems: [],
      isLoading: false,
      isUserNotValid: false,
      logCode: Number,
      logMessage: '',
    };
  },
  methods: {
    async fetchData() {
      this.isLoading = true;
      try {
        const { data } = await fetchBoards();
        console.log(data);
        this.isLoading = false;
        this.postItems = data.data;
      } catch (error) {
        this.isUserNotValid = true;
        console.log(error.response.data.code);
        this.logCode = error.response.data.code;
        this.logMessage = error.response.data.msg;
      }
    },
    goToLogin() {
      this.$store.commit('clearUsername');
      this.$store.commit('clearToken');
      deleteCookie('til_auth');
      deleteCookie('til_user');
      this.$router.push('/login');
    },
    async getNotifications() {
      try {
        const response = await getUnReadNotifications();
        this.$store.commit('setNotifications', response.data.data);
      } catch (error) {
        console.log(error);
        this.logMessage = error.data;
      }
    },
  },
  created() {
    this.fetchData();
    this.getNotifications();
    // const eventSource = new EventSource(
    //   `http://localhost:8080/api/subscribe?uuid=${Math.random()}`,
    //   {
    //     withCredentials: true,
    //   },
    // );
    // this.eventSource.onopen = e => {
    //   console.log('onopen: ', e);
    // };
    //
    // eventSource.onerror = e => {
    //   console.log('onerror: ', e);
    // };
    // eventSource.onmessage = e => {
    //   console.log('onMessage: ', e);
    //   console.log('onMessage.data: ', e.data);
    //   console.log('onMessage.data: ', JSON.parse(e.data));
    // };
  },
};
</script>

<style></style>
