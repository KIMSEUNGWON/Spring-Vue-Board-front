<template>
  <v-card class="ma-7">
    <v-list>
      <v-list-item-group>
        <template v-for="(room, index) in rooms">
          <v-list-item :key="room.roomId" link>
            <v-list-item-content @click="goToRoom(room.name, room.roomId)">
              <v-list-item-title> name: {{ room.name }} </v-list-item-title>
              <v-list-item-subtitle>
                roomId: {{ room.roomId }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider v-if="index < rooms.length - 1" :key="index"></v-divider>
        </template>
      </v-list-item-group>
    </v-list>

    <p>{{ logMessage }}</p>
  </v-card>
</template>

<script>
import { getRooms } from '@/api/chat';

export default {
  data() {
    return {
      isLoading: false,
      isUserNotValid: false,
      logCode: Number,
      logMessage: '',
      rooms: [],
    };
  },
  methods: {
    async getRooms() {
      try {
        const response = await getRooms();
        this.rooms = response.data;
      } catch (error) {
        console.log(error);
        this.logMessage = error.data;
      }
    },
    goToRoom(roomName, roomId) {
      this.$router.push({
        //https://any-ting.tistory.com/46
        name: 'ChatRoom',
        query: { roomName: roomName, roomId: roomId },
      });
    },
  },
  created() {
    this.getRooms();
  },
};
</script>
