<template>
  <div class="ma-7">
    <v-form @submit="makeRoom" action="#">
      <v-text-field
        v-model="roomName"
        :counter="20"
        :rules="nameRules"
        label="roomName"
      />
      <v-btn :disabled="!valid" class="mr-4" type="submit">방 생성</v-btn>
    </v-form>
    <div>
      {{ logMessage }}
    </div>
  </div>
</template>

<script>
import { createRoom } from '@/api/chat';

export default {
  data() {
    return {
      logMessage: '',
      valid: true,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 20) || 'Name must be less than 10 characters',
      ],
      roomName: '',
    };
  },
  computed: {
    isCreateValid() {
      if (this.author == '' || this.title == '' || this.content == '') {
        return false;
      }

      return this.valid;
    },
  },
  methods: {
    async makeRoom() {
      if (this.roomName != null) {
        try {
          const response = await createRoom(this.roomName);
          console.log(response.data);
          this.roomName = '';
          // this.$router.push('/main');
        } catch (error) {
          console.log(error);
          this.logMessage = error.data;
        }
        //http://it-archives.com/222169372138/
        this.$router.go();
      } else {
        alert('Please write the name.');
      }
    },
  },
};
</script>

<style></style>
