<template>
  <div class="ma-7">
    <v-data-table
      :headers="headers"
      :items="postItems"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      class="elevation-1 pa-3"
      @page-count="pageCount = $event"
      :search="search"
      @click:row="goDetailPost"
      no-results-text="결과가 없습니다."
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          >
          </v-text-field>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn dark class="mb-2" @click="newPost">
            New Post
          </v-btn>
        </v-toolbar>
      </template>

      <template v-slot:footer>
        <v-row class="mt-7" align="center" justify="center">
          <span class="grey--text ml-3">Items per page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn dark text color="primary" v-bind="attrs" v-on="on">
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span
            class="mr-4
            grey--text"
          >
            Page {{ page }} of {{ numberOfPages }}
          </span>
        </v-row>
      </template>
    </v-data-table>

    <div class="text-center pt-3">
      <v-pagination
        v-model="page"
        :length="pageCount"
        color="black"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    postItems: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      search: '',
      headers: [
        {
          text: 'PostId',
          align: 'start',
          sortable: false,
          value: 'postId',
        },
        { text: 'Title', value: 'title' },
        { text: 'Content', value: 'content' },
        { text: 'Author', value: 'author' },
        { text: 'CreatedAt', value: 'createdAt' },
        { text: 'ModifiedAt', value: 'modifiedAt' },
      ],
      itemsPerPageArray: [5, 10, 15, 20],
    };
  },
  methods: {
    goDetailPost(item) {
      const boardName = this.$route.params.boardName;
      const postId = item.postId;
      this.$router.push(`/board/${boardName}/post/${postId}`);
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
    newPost() {
      const boardName = this.$route.params.boardName;
      this.$router.push(`/board/${boardName}/post`);
    },
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.postItems.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter(key => key !== 'Name');
    },
  },
};
</script>

<style></style>
