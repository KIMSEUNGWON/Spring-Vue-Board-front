<template>
  <v-main>
    <h1 class="page-header">회원 가입</h1>
    <SignupForm></SignupForm>
  </v-main>
</template>

<script>
import SignupForm from '@/components/signInUp/SignupForm.vue';

export default {
  components: {
    SignupForm,
  },
};
</script>

<style></style>
