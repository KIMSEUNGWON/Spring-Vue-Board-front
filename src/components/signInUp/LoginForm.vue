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

        <p class="log">{{ logMessage }}</p>

        <v-btn :disabled="!valid" color="success" class="mr-4" type="submit">
          로그인
        </v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // form values
      email: '',
      password: '',
      // log
      logMessage: '',
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
    };
  },
  methods: {
    async submitForm() {
      try {
        // 비즈니스 로직
        const userData = {
          email: this.email,
          password: this.password,
        };
        await this.$store.dispatch('LOGIN', userData);
        this.$router.push('/main');
      } catch (error) {
        // 에러 핸들링할 코드
        console.log(error.response.data);
        this.logMessage = error.response.data.msg;
      } finally {
        this.resetForm();
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
