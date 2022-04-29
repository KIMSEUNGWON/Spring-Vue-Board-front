<template>
  <div class="app">
    <v-app>
      <AppBar />

      <Drawer />

      <CommonView />
    </v-app>
  </div>
</template>

<script>
import AppBar from '@/components/common/AppBar';
import Drawer from '@/components/common/Drawer';
import CommonView from '@/components/common/CommonView';

export default {
  name: 'DefaultLayout',
  components: {
    AppBar,
    Drawer,
    CommonView,
  },
};
</script>

<style>
@import './css/reset.css';
@import './css/common.css';
</style>
