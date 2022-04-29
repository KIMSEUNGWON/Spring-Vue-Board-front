<template>
  <v-card>
    <v-img :src="`${img}${id}.png`"></v-img>

    <v-card-title>
      {{ name }}
    </v-card-title>

    <v-card-subtitle> No.{{ no }} </v-card-subtitle>

    <v-row align="end">
      <v-col v-for="(type, index) in types" :key="index">
        <v-card class="outlined tile" :class="type.type.name">
          <p class="caption text-center white--text">{{ type.type.name }}</p>
        </v-card>
      </v-col>
    </v-row>

    <v-card-actions>
      <v-btn color="orange lighten-2" text @click="goDetail">
        Detail
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          I'm a thing. But, like most politicians, he promised more than he
          could deliver. You won't have time for sleeping, soldier, not with all
          the bed making you'll be doing. Then we'll go with that data file!
          Hey, you add a one and two zeros to that or we walk! You're going to
          do his laundry? I've got to find a way to escape.
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import { fetchPokemonTypes } from '@/api/poke';
import { fillZero } from '@/utils/validation';

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      show: false,
      no: '',
      id: this.item.id,
      name: this.item.name,
      img:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/',
      types: [],
    };
  },
  methods: {
    async getTypes() {
      try {
        const { data } = Object.freeze(await fetchPokemonTypes(this.id));
        this.types = data.types;
      } catch (error) {
        console.log(error);
      }
    },
    goDetail() {
      const pokeId = this.id;
      this.$router.push(`/encyclopedia/view/${pokeId}`);
    },
  },
  created() {
    this.no = fillZero(3, this.id);
    this.getTypes();
  },
};
</script>

<style scoped>
.grass {
  background: #69db7c !important;
}
.poison {
  background: #be4bdb !important;
}
.water {
  background: #339af0 !important;
}
.dragon {
  background: #6741d9 !important;
}
.ice {
  background: #91a7ff !important;
}
.flying {
  background: #74c0fc !important;
}
.fire {
  background: #fd7e14 !important;
}
.ghost {
  background: #862e9c !important;
}
.fighting {
  background: #c92a2a !important;
}
.normal {
  background: #adb5bd !important;
}
.psychic {
  background: #d6336c !important;
}
.bug {
  background: #66a80f !important;
}
.dark {
  background: #343a40 !important;
}
.steel {
  background: #868e96 !important;
}
.fairy {
  background: #faa2c1 !important;
}
.electric {
  background: #fab005 !important;
}
.rock {
  background: #adb5bd !important;
}
.ground {
  background: #e67700 !important;
}
</style>
