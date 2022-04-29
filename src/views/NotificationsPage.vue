<template>
  <div class="main list-container contents">
    <h1 class="page-header" id="page-header">알림 목록</h1>
    <NotificationsUnReadChangeToAllReadItem></NotificationsUnReadChangeToAllReadItem>
    <NotificationsListItem></NotificationsListItem>
  </div>
</template>

<script>
import NotificationsUnReadChangeToAllReadItem from '@/components/notifications/NotificationsUnReadChangeToAllReadItem';
import NotificationsListItem from '@/components/notifications/NotificationsListItem';

export default {
  components: {
    NotificationsUnReadChangeToAllReadItem,
    NotificationsListItem,
  },
};
</script>

<style></style>
