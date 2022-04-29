<template>
  <v-navigation-drawer v-model="$store.state.drawer" v-bind="$attrs" dark app>
    <template #img="props">
      <v-img :gradient="gradient" v-bind="props"></v-img>
    </template>

    <v-divider></v-divider>

    <DrawerList :items="items"></DrawerList>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex';
import DrawerList from '@/components/common/DrawerList';

export default {
  name: 'Drawer',
  components: {
    DrawerList,
  },
  computed: {
    ...mapState({
      gradient: 'gradient',
      items: 'items',
    }),
  },
};
</script>

<style></style>
