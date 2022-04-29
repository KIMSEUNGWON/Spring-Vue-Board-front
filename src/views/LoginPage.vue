<template>
  <v-main>
    <h1 class="page-header">로그인</h1>
    <LoginForm></LoginForm>
  </v-main>
</template>

<script>
import LoginForm from '@/components/signInUp/LoginForm.vue';

export default {
  components: {
    LoginForm,
  },
};
</script>

<style></style>
