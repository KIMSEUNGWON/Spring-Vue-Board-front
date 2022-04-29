<template>
  <v-app-bar dark app>
    <v-app-bar-nav-icon
      v-if="isUserLogin"
      @click="$store.state.drawer = !$store.state.drawer"
    ></v-app-bar-nav-icon>

    <v-toolbar-title>
      <v-btn link :to="logoLink" class="py-1">TIL</v-btn>
      <template v-if="isUserLogin">
        <span>by {{ $store.state.username }}</span>
      </template>
    </v-toolbar-title>

    <v-spacer />

    <template v-if="isUserLogin">
      <v-btn class="mx-2" fab small link :to="goToNotificationsList">
        <v-badge
          :content="amountNotification"
          :value="amountNotification"
          color="error"
          overlap
        >
          <v-icon>mdi-bell</v-icon>
        </v-badge>
      </v-btn>
      <v-btn @click="logoutUser">Logout</v-btn>
    </template>
    <template v-else>
      <v-btn link to="/login" class="py-1" active-class="primary white--text">
        로그인
      </v-btn>
      <v-btn link to="/signup" class="py-1" active-class="primary white--text">
        회원가입
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script>
import { deleteCookie } from '@/utils/cookies';
import { getUnReadNotifications } from '@/api/notifications';

export default {
  name: 'AppBar',
  computed: {
    isUserLogin() {
      return this.$store.getters.isLogin;
    },
    logoLink() {
      return this.$store.getters.isLogin ? '/main' : '/login';
    },
    goToNotificationsList() {
      return '/notifications';
    },
    amountNotification() {
      return this.$store.state.notifications.length;
    },
  },
  methods: {
    logoutUser() {
      this.$store.commit('clearUsername');
      this.$store.commit('clearToken');
      deleteCookie('til_auth');
      deleteCookie('til_user');
      this.$router.push('/login');
    },
    async getUnReadNotifications() {
      try {
        const response = await getUnReadNotifications();
        console.log(response.data.data);
        this.$store.commit('setNotifications', response.data.data);
      } catch (error) {
        console.log(error);
        this.logMessage = error.data;
      }
    },
  },
  created() {
    this.getUnReadNotifications();
    console.log(this.amountNotification);
  },
};
</script>

<style>
span {
  font-size: 14px;
  font-weight: normal;
}
</style>
