<template>
  <v-card class="ma-7">
    <v-list>
      <v-list-item-group>
        <template v-for="(notification, index, idx) in allNotifications">
          <v-list-item :key="idx" :disabled="notification.isRead">
            <v-list-item-content
              @click="
                readNotifications(
                  notification.notificationId,
                  notification.boardName,
                  notification.postId,
                  notification.url,
                )
              "
            >
              <v-list-item-title>
                <template v-if="notification.isRead">
                  <v-icon>mdi-circle-small</v-icon>
                </template>
                <template v-else>
                  <v-icon color="orange">mdi-circle-small</v-icon>
                </template>
                {{ notification.message }}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-group>
              <v-list-item-subtitle>
                {{ notification.nowMinusCreatedAt }}
              </v-list-item-subtitle>
            </v-list-item-group>
          </v-list-item>
          <v-divider
            v-if="index < $store.state.notifications.length - 1"
            :key="index"
          ></v-divider>
        </template>
      </v-list-item-group>
    </v-list>

    <p>{{ logMessage }}</p>
  </v-card>
</template>

<script>
import {
  getNotifications,
  getUnReadNotifications,
  readNotifications,
} from '@/api/notifications';

export default {
  data() {
    return {
      isLoading: false,
      isUserNotValid: false,
      logCode: Number,
      logMessage: '',
      allNotifications: [],
    };
  },
  methods: {
    async getAllNotifications() {
      try {
        const response = await getNotifications();
        console.log(response.data.data);
        this.allNotifications = response.data.data;
      } catch (error) {
        console.log(error);
        this.logMessage = error.data;
      }
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
    async readNotifications(notificationId, boardName, postId, url) {
      try {
        const response = await readNotifications(notificationId);
        console.log(response.data.data);
        // this.$store.commit('setNotifications', response.data.data);
        this.goToNotificationsDetail(url);
      } catch (error) {
        console.log(error);
        this.logMessage = error.data;
      }
      // this.$router.go();
    },
    goToNotificationsDetail(url) {
      console.log(url);
      this.$router.push(url);
    },
  },
  created() {
    this.getAllNotifications();
    this.getUnReadNotifications();
  },
};
</script>
