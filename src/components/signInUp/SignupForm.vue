<template>
  <div class="contents">
    <div class="form-wrapper form-wrapper-sm">
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="submitForm"
      >
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="email"
          required
          clearable
        ></v-text-field>
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="password"
          required
          clearable
        ></v-text-field>
        <v-text-field
          v-model="confirmPassword"
          :rules="confirmPasswordRules"
          label="confirmPassword"
          required
          clearable
        ></v-text-field>
        <v-text-field
          v-model="name"
          :counter="10"
          :rules="nameRules"
          label="name"
          required
          clearable
        ></v-text-field>

        <p class="log">{{ logMessage }}</p>

        <v-btn color="error" class="mr-4" @click="resetForm">
          Reset Form
        </v-btn>

        <v-btn :disabled="!valid" color="success" class="mr-4" type="submit">
          회원 가입
        </v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
import { registerUser } from '@/api/auth';

export default {
  data() {
    return {
      // form values
      email: '',
      password: '',
      name: '',
      // log
      logMessage: '',
      confirmPassword: '',
      // validation
      valid: true,
      emailRules: [
        v => !!v || 'Email은 필수입니다.',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        v => !!v || '비밀번호는 필수입니다.',
        v => (v && v.length <= 20) || '비밀번호는 20자 이내로 입력해야합니다.',
      ],
      confirmPasswordRules: [
        v => !!v || '비밀번호 확인은 필수입니다.',
        v => (v && v.length <= 20) || '비밀번호는 20자 이내로 입력해야합니다.',
        v => v === this.password || '비밀번호가 일치하지 않습니다.',
      ],
      nameRules: [
        v => !!v || '이름은 필수입니다.',
        v => (v && v.length <= 10) || '이름은 10자 이내로 입력해야합니다.',
      ],
    };
  },
  methods: {
    async submitForm() {
      try {
        const userData = {
          email: this.email,
          password: this.password,
          name: this.name,
        };
        const { data } = await registerUser(userData);
        console.log(data.data.email);
        this.logMessage = `${data.data.email} 님이 가입되었습니다`;
        this.resetForm();
      } catch (error) {
        // https://yamoo9.github.io/axios/guide/error-handling.html
        console.log(error.response.data);
        this.logMessage = error.response.data.msg;
      }
    },
    validate() {
      this.$refs.form.validate();
    },
    resetForm() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style></style>
