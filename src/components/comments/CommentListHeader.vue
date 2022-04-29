<template>
  <v-app-bar flat color="rgba(0, 0, 0, 0)">
    <v-app-bar-nav-icon></v-app-bar-nav-icon>

    <v-toolbar-title class="text-h6 pl-0">
      {{ numOfComments }} Comment
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  props: {
    numOfComments: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style></style>
