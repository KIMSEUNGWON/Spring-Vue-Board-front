<template>
  <v-card class="ma-7">
    <div class="primary">
      <v-card-title>
        <v-btn dark icon @click="goBeforePage">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn dark icon class="mr-4" @click="goPasswordChangePage">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>

        <v-btn dark icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-card-title>
    </div>
    <v-list two-line>
      <div v-for="(user, index) in userData" :key="index">
        <v-list-item v-for="(detail, index) in user" :key="index">
          <v-list-item-icon>
            <v-icon color="indigo">
              {{ detail.icon }}
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ detail.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ detail.subTitle }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-icon>
            <v-icon>{{ detail.subIcon }}</v-icon>
          </v-list-item-icon>
        </v-list-item>
        <v-divider inset></v-divider>
      </div>
    </v-list>
  </v-card>
</template>

<script>
import { getUserProfile } from '@/api/profile';

export default {
  data() {
    return {
      userData: [],
    };
  },
  methods: {
    async fetchData() {
      try {
        const userEmail = this.$store.state.username;
        const { data } = await getUserProfile(userEmail);
        console.log(data.data);
        let arr = new Array();
        let user = {
          icon: 'mdi-phone',
          title: data.data.name,
          subTitle: 'Name',
          subIcon: 'mdi-message-text',
        };
        arr.push(user);
        user = {
          icon: 'mdi-phone',
          title: data.data.email,
          subTitle: 'EMail',
          subIcon: 'mdi-message-text',
        };
        arr.push(user);
        /**
         * 초기 데이터 세팅
         */
        user = {
          icon: 'mdi-phone',
          title: '(650) 555-1234',
          subTitle: 'Mobile',
          subIcon: 'mdi-message-text',
        };
        arr.push(user);
        user = {
          title: '(323) 555-6789',
          subTitle: 'Work',
          subIcon: 'mdi-message-text',
        };
        arr.push(user);
        this.userData.push(arr);

        arr = new Array();
        user = {
          icon: 'mdi-email',
          title: '(323) 555-6789',
          subTitle: 'Work',
          subIcon: 'mdi-message-text',
        };
        arr.push(user);
        this.userData.push(arr);

        arr = new Array();
        user = {
          icon: 'mdi-email',
          title: 'aliconnors@example.com',
          subTitle: 'Personal',
          subIcon: 'mdi-pencil',
        };
        arr.push(user);
        user = {
          title: 'ali_connors@example.com\n',
          subTitle: 'Personal',
        };
        arr.push(user);
        this.userData.push(arr);

        arr = new Array();
        user = {
          icon: 'mdi-map-marker',
          title: 'mdi-map-marker',
          subTitle: 'Orlando, FL 79938',
        };
        arr.push(user);
        this.userData.push(arr);
      } catch (error) {
        console.log(error.data);
      }
    },

    goPasswordChangePage() {
      this.$router.push('/profile/passwordChange');
    },

    //https://sunny921.github.io/posts/vuejs-router-03/
    goBeforePage() {
      this.$router.go(-1);
    },
  },
  created() {
    this.fetchData();
    console.log(this.userData);
  },
};
</script>

<style></style>
