<template>
  <div class="main list-container contents">
    <h1 class="page-header" id="page-header">Board List</h1>
    <LoadingSpinner v-if="isLoading" />
    <div v-else class="ma-7">
      <v-fab-transition>
        <v-card class="d-flex justify-end">
          <v-dialog v-model="dialog" persistent>
            <template v-slot:activator="{ on, attrs }">
              <v-btn bottom left fixed fab large dark v-bind="attrs" v-on="on">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <BoardCreateForm @clickClose="clickClose" @clickSave="clickSave" />
          </v-dialog>
        </v-card>
      </v-fab-transition>
      <BoardListItem
        v-for="(boardItem, index) in boardItems"
        :key="index"
        :boardItem="boardItem"
        @refresh="fetchData"
      />
    </div>
    <v-fab-transition>
      <v-btn
        bottom
        right
        fixed
        fab
        dark
        large
        v-show="btnShow"
        @click="$vuetify.goTo('#page-header')"
      >
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
    </v-fab-transition>
    <v-snackbar v-model="snackbar" :timeout="timeout">
      <p>{{ logMessage }}</p>
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import BoardListItem from '@/components/boards/BoardListItem';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import { fetchBoards } from '@/api/board';
import BoardCreateForm from '@/components/boards/BoardCreateForm';

export default {
  components: {
    BoardListItem,
    LoadingSpinner,
    BoardCreateForm,
  },
  data() {
    return {
      boardItems: [],
      isLoading: false,
      btnShow: false,
      dialog: false,
      logMessage: '',
      snackbar: false,
      timeout: 2000,
    };
  },
  methods: {
    async fetchData() {
      this.isLoading = true;
      try {
        const { data } = await fetchBoards();
        console.log(data);
        this.isLoading = false;
        this.boardItems = data.data;
      } catch (error) {
        console.log(error.response.data.code);
        this.snackbar = true;
        this.logMessage = error.response.data.msg;
      }
    },
    handleScroll() {
      this.btnShow = window.scrollY > 400;
    },
    clickClose() {
      this.dialog = false;
    },
    clickSave() {
      this.dialog = false;
      this.fetchData();
    },
  },
  created() {
    this.fetchData();
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<style></style>
