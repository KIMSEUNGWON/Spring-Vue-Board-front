<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">Create Board</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="Board Name"
              required
              v-model="boardName"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="Legal middle name"
              hint="example of helper text only on focus"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="Legal last name*"
              hint="example of persistent helper text"
              persistent-hint
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field label="Email*" required></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Password*"
              type="password"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              :items="['0-17', '18-29', '30-54', '54+']"
              label="Age*"
              required
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6">
            <v-autocomplete
              :items="[
                'Skiing',
                'Ice hockey',
                'Soccer',
                'Basketball',
                'Hockey',
                'Reading',
                'Writing',
                'Coding',
                'Basejump',
              ]"
              label="Interests"
              multiple
            ></v-autocomplete>
          </v-col>
        </v-row>
      </v-container>
      <small>*indicates required field</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="clickClose">
        Close
      </v-btn>
      <v-btn color="blue darken-1" text @click="clickSave">
        Save
      </v-btn>
    </v-card-actions>
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ logMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script>
import { createBoard } from '@/api/board';

export default {
  data() {
    return {
      dialog: false,
      boardName: '',
      snackbar: false,
      timeout: 2000,
      logMessage: '',
    };
  },
  methods: {
    clickClose() {
      (this.dialog = false), this.$emit('clickClose', this.dialog);
    },
    async clickSave() {
      try {
        const response = await createBoard({
          boardName: this.boardName,
        });
        console.log(response);
        (this.dialog = false), this.$emit('clickSave', this.dialog);
      } catch (error) {
        console.log(error.response.data.msg);
        this.snackbar = true;
        this.logMessage = error.response.data.msg;
      }
    },
  },
};
</script>

<style></style>
