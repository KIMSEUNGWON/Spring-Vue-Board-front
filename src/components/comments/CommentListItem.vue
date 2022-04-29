<template>
  <div>
    <v-container fluid>
      <PaginatedList
        v-for="(item, index) in paginatedData"
        :key="index"
        :item="item"
        :page-size="4"
        @refresh="fetchData"
      />

      <!--    vue 페이징 기능 https://pewww.tistory.com/5-->
      <div class="btn-cover">
        <button :disabled="pageNum === 0" @click="formerPage" class="page-btn">
          이전
        </button>
        <span class="page-count"
          >{{ pageNum + 1 }} / {{ pageCount }} 페이지</span
        >
        <button
          :disabled="pageNum >= pageCount - 1"
          @click="nextPage"
          class="page-btn"
        >
          다음
        </button>
      </div>

      <div class="text-center">
        <v-pagination
          v-model="page"
          :length="pageCount"
          :total-visible="7"
          @input="updateItemsPerPage(page - 1)"
        ></v-pagination>
      </div>
    </v-container>
  </div>
</template>

<script>
import PaginatedList from '@/components/comments/PaginatedList';
import { mapGetters } from 'vuex';

export default {
  components: {
    PaginatedList,
  },
  props: {
    commentItems: {
      type: Array,
      required: true,
    },
    postId: {
      required: true,
    },
  },
  data() {
    return {
      page: 1,
      pageNum: 0,
      pageSize: 4,
    };
  },
  methods: {
    fetchData() {
      console.log('fetched');
    },
    nextPage() {
      if (this.page + 1 <= this.pageCount) this.page += 1;
      this.pageNum += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
      this.pageNum -= 1;
    },
    updateItemsPerPage(number) {
      this.pageNum = number;
    },
  },
  computed: {
    pageCount() {
      let listLength = this.items.length,
        listSize = this.pageSize,
        page = Math.floor(listLength / listSize);
      if (listLength % listSize > 0) page += 1;

      /*
      아니면 page = Math.floor((listLeng - 1) / listSize) + 1;
      이런식으로 if 문 없이 고칠 수도 있다!
      */
      return page;
    },
    paginatedData() {
      const start = this.pageNum * this.pageSize,
        end = start + this.pageSize;
      return this.items.slice(start, end);
    },
    ...mapGetters({
      items: 'getComments',
    }),
  },
};
</script>

<style scoped>
h1 {
  color: #454545;
  text-align: center;
}
table {
  width: 100%;
  border-collapse: collapse;
}
table th {
  font-size: 1.2rem;
}
table tr {
  height: 2rem;
  text-align: center;
  border-bottom: 1px solid #505050;
}
table tr:first-of-type {
  border-top: 2px solid #404040;
}
table tr td {
  padding: 1rem 0;
  font-size: 1.1rem;
}
.btn-cover {
  margin-top: 1.5rem;
  text-align: center;
}
.btn-cover .page-btn {
  width: 5rem;
  height: 2rem;
  letter-spacing: 0.5px;
}
.btn-cover .page-count {
  padding: 0 1rem;
}
</style>
