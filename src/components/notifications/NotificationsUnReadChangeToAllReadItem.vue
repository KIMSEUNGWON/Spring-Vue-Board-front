<template>
  <div class="ma-7">
    <v-alert color="grey lighten-4" elevation="2">
      <v-row align="center">
        <v-col class="grow">
          <span>읽지 않은 알림</span>
          <span class="font-weight-black green--text">
            {{ amountNotification }}
          </span>
          <span>개</span>
        </v-col>
        <v-col class="shrink">
          <v-form @submit.prevent="readAllNotifications">
            <v-btn depressed plain type="submit">
              <v-icon small>mdi-check-circle-outline</v-icon>
              <span>모두 읽음 표시</span>
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-alert>

    <p>{{ logMessage }}</p>
  </div>
</template>

<script>
import { readAllNotifications } from '@/api/notifications';

export default {
  data() {
    return {
      isLoading: false,
      isUserNotValid: false,
      logCode: Number,
      logMessage: '',
    };
  },
  computed: {
    amountNotification() {
      return this.$store.state.notifications.length;
    },
    unReadNotificationIds() {
      const notifications = this.$store.state.notifications;
      let unReadNotificationIds = [];
      notifications.forEach(notification => {
        if (!notification.isRead) {
          unReadNotificationIds.push(notification.notificationId);
        }
      });

      return unReadNotificationIds;
    },
  },
  methods: {
    async readAllNotifications() {
      try {
        const notificationIdsDto = {
          notificationIds: this.unReadNotificationIds,
        };
        const response = await readAllNotifications(notificationIdsDto);
        console.log('unReadNotificationIds', this.unReadNotificationIds);
        console.log(response.data.data);
      } catch (error) {
        console.log(error);
        this.logMessage = error.data;
      }
    },
  },
  created() {},
};
</script>
