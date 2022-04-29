<template>
  <v-list-item class="grow">
    <v-list-item-avatar color="grey darken-3">
      <v-img class="elevation-6" alt="" :src="formatImg"></v-img>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>
        {{ formatName }}
      </v-list-item-title>
      <v-list-item-subtitle>
        {{ formatDate }}
      </v-list-item-subtitle>
    </v-list-item-content>

    <v-row align="center" justify="end">
      <v-btn icon @click="like">
        <v-icon class="mr-1">
          mdi-heart
        </v-icon>
      </v-btn>
      <span class="subheading mr-2">256</span>

      <v-btn icon>
        <v-icon class="mr-1">
          mdi-share-variant
        </v-icon>
      </v-btn>
      <span class="subheading">45</span>
    </v-row>
  </v-list-item>
</template>

<script>
export default {
  name: 'CommentListItemHeader',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      img:
        'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light',
    };
  },
  //todo 좋아요 기능 만들기
  methods: {
    like() {
      console.log('like');
    },
  },
  computed: {
    formatDate() {
      const formatDate = new Date(this.item.createdDate);
      const year = formatDate.getFullYear();
      const month = formatDate.getMonth() + 1;
      const date = formatDate.getDate();
      return year + '년 ' + month + '월 ' + date + '일';
    },
    formatName() {
      let name = this.item.username;
      if (this.item.isDeleted) {
        name = 'UnKnown';
      }
      return name;
    },
    formatImg() {
      let img = this.img;
      if (this.item.isDeleted) {
        img = '';
      }
      return img;
    },
  },
};
</script>

<style scoped></style>
