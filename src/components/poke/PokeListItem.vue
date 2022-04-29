<template>
  <v-row class="ma-7">
    <v-container fluid>
      <v-data-iterator
        :items="pokeItems"
        :items-per-page.sync="itemsPerPage"
        :page.sync="page"
        :search="search"
        :sort-by="sortBy.toLowerCase()"
        :sort-desc="sortDesc"
        hide-default-footer
        no-results-text="결과가 존재하지 않습니다."
        no-data-text="데이터가 존재하지 않습니다."
      >
        <template v-slot:header>
          <v-toolbar dark color="darken-3" class="mb-5">
            <v-text-field
              v-model="search"
              clearable
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="mdi-magnify"
              label="Search"
            ></v-text-field>
            <template v-if="$vuetify.breakpoint.smAndUp">
              <v-spacer></v-spacer>
              <v-select
                v-model="sortBy"
                flat
                solo-inverted
                hide-details
                :items="keys"
                prepend-inner-icon="mdi-magnify"
                label="Sort by"
              ></v-select>
              <v-spacer></v-spacer>
              <v-btn-toggle v-model="sortDesc" mandatory>
                <v-btn large depressed color="blue" :value="false">
                  <v-icon>mdi-arrow-up</v-icon>
                </v-btn>
                <v-btn large depressed color="blue" :value="true">
                  <v-icon>mdi-arrow-down</v-icon>
                </v-btn>
              </v-btn-toggle>
            </template>
          </v-toolbar>
        </template>

        <template v-slot:default="props">
          <v-row>
            <v-col
              v-for="item in props.items"
              :key="item.name"
              cols="12"
              sm="4"
              md="3"
              lg="2"
            >
              <PokeItem :item="item"></PokeItem>
            </v-col>
          </v-row>

          <infinite-loading
            @infinite="fetchDataScroll"
            spinner="waveDots"
          ></infinite-loading>
        </template>
      </v-data-iterator>
    </v-container>
  </v-row>
</template>

<script>
import { fetchPokemons } from '@/api/poke';
import PokeItem from '@/components/poke/PokeItem';
import InfiniteLoading from 'vue-infinite-loading';

export default {
  components: {
    PokeItem,
    InfiniteLoading,
  },
  data() {
    return {
      isLoading: false,
      pokeItems: [],
      limit: 15,
      offset: 0,
      itemsPerPageArray: [15, 30, 60],
      search: '',
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 15,
      sortBy: 'id',
      keys: ['Id', 'Name'],
    };
  },
  methods: {
    async fetchData() {
      this.isLoading = true;
      try {
        const { data } = Object.freeze(
          await fetchPokemons(this.limit, this.offset),
        );
        this.offset += this.limit;
        console.log(data.results);
        this.isLoading = false;
        this.pokeItems = this.getPokeIdFromUrl(data.results);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchDataScroll($state) {
      this.isLoading = true;
      try {
        const { data } = Object.freeze(
          await fetchPokemons(this.limit, this.offset),
        );
        this.isLoading = false;
        setTimeout(() => {
          if (data.results.length) {
            this.pokeItems = this.pokeItems.concat(
              this.getPokeIdFromUrl(data.results),
            );
            $state.loaded();
            this.offset += this.limit;
            if (this.pokeItems.length / 15 == 0) {
              $state.complete();
            }
            this.itemsPerPage += this.offset;
          } else {
            $state.complete();
          }
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    },
    getPokeIdFromUrl(results) {
      results.forEach(poke => {
        const pokeSplit = poke.url.split('/');
        poke.id = pokeSplit[pokeSplit.length - 2];
      });
      return results;
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style></style>
