<template>
  <div class="main list-container contents">
    <h1 class="page-header" id="page-header">채팅방 목록</h1>
    <ChatListItem></ChatListItem>
    <ChatRoomCreateForm></ChatRoomCreateForm>
  </div>
</template>

<script>
import ChatListItem from '@/components/chat/ChatListItem';
import ChatRoomCreateForm from '@/components/chat/ChatRoomCreateForm';

export default {
  components: {
    ChatListItem,
    ChatRoomCreateForm,
  },
};
</script>

<style></style>
