<template>
  <v-card class="ma-7">
    <div class="pa-7">
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="submitForm"
      >
        <v-text-field
          v-model="currentPassword"
          :rules="currentPasswordRules"
          label="currentPassword"
          required
          clearable
        ></v-text-field>
        <v-text-field
          v-model="newPassword"
          :rules="newPasswordRules"
          label="newPassword"
          required
          clearable
        ></v-text-field>
        <v-text-field
          v-model="checkNewPassword"
          :rules="checkNewPasswordRules"
          label="checkNewPassword"
          required
          clearable
        ></v-text-field>

        <p class="log">{{ logMessage }}</p>

        <v-btn color="warning" class="mr-4" @click="goProfile">
          취소
        </v-btn>

        <v-btn color="error" class="mr-4" @click="resetForm">
          Reset Form
        </v-btn>

        <v-btn
          :disabled="isValid ? false : true"
          color="success"
          class="mr-4"
          type="submit"
        >
          비밀번호 수정
        </v-btn>
      </v-form>

      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="text-h5">
            {{ dialogTitle }}
          </v-card-title>
          <v-card-text>
            <p class="log">{{ logMessage }}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="goProfile">
              Go Profile
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-card>
</template>

<script>
import { changePassword } from '@/api/profile';

export default {
  data() {
    return {
      // form values
      currentPassword: '',
      newPassword: '',
      checkNewPassword: '',
      // log
      logMessage: '',
      // validation
      valid: true,
      currentPasswordRules: [
        v => !!v || '현재 비밀번호는 필수입니다.',
        v => (v && v.length <= 20) || '비밀번호는 20자 이내로 입력해야합니다.',
      ],
      newPasswordRules: [
        v => !!v || '새 비밀번호는 필수입니다.',
        v => (v && v.length <= 20) || '비밀번호는 20자 이내로 입력해야합니다.',
      ],
      checkNewPasswordRules: [
        v => !!v || '새 비밀번호 확인은 필수입니다.',
        v => (v && v.length <= 20) || '비밀번호는 20자 이내로 입력해야합니다.',
        v => v === this.newPassword || '새 비밀번호와 일치하지 않습니다.',
      ],
      dialog: false,
      dialogTitle: '',
    };
  },
  methods: {
    async submitForm() {
      try {
        const userData = {
          currentPassword: this.currentPassword,
          newPassword: this.newPassword,
          checkNewPassword: this.checkNewPassword,
        };
        const { data } = await changePassword(
          this.$store.state.username,
          userData,
        );
        console.log(data);
        this.logMessage = `비밀번호 변경을 ${data.msg}`;
        this.dialogTitle = data.msg;
        this.dialog = true;
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

    goProfile() {
      this.$router.push('/profile');
    },
  },
  computed: {
    isValid() {
      if (
        this.currentPassword == '' ||
        this.newPassword == '' ||
        this.checkNewPassword == '' ||
        this.currentPassword == null ||
        this.newPassword == null ||
        this.checkNewPassword == null ||
        this.valid == false
      ) {
        return false;
      }
      return true;
    },
  },
};
</script>

<style></style>
