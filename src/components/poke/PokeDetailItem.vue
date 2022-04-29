<template>
  <v-card class="ma-7">
    <v-row>
      <v-col class="d-flex child-flex">
        <v-img contain aspect-ratio="3" :src="`${frontImg}${id}.gif`"> </v-img>
        <v-img contain aspect-ratio="3" :src="`${backImg}${id}.gif`"> </v-img>
      </v-col>
    </v-row>

    <v-card-title class="justify-center">
      {{ pokeName }}
    </v-card-title>

    <v-card-subtitle>
      <p class="text-center">No.{{ pokeNum }}</p>
    </v-card-subtitle>

    <v-item-group class="pb-3">
      <v-container>
        <v-row>
          <v-col
            v-for="(flavor_text_entry, index) in this.flavor_text_entries"
            :key="index"
            cols="6"
          >
            <v-item v-slot="{ active, toggle }">
              <div>
                <v-btn
                  block
                  rounded
                  :color="active ? 'primary' : ''"
                  class="d-flex align-center"
                  @click="toggle"
                >
                  <v-icon v-if="active" left>mdi-checkbox-marked-circle</v-icon>
                  <v-icon v-else left>mdi-check-circle-outline</v-icon>
                  <span>{{ flavor_text_entry.flavorTextVersion }}</span>
                </v-btn>
                <v-expand-transition>
                  <div v-show="active">
                    <v-card-text>
                      {{ flavor_text_entry.flavorText }}
                    </v-card-text>
                  </div>
                </v-expand-transition>
              </div>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>

    <div class="pb-5">
      <v-card class="ma-5" shaped>
        <v-row>
          <v-col cols="4" v-for="(data, index) in detailData" :key="index">
            <v-card-subtitle>
              {{ data.text }}
            </v-card-subtitle>

            <v-card-text v-if="typeof data.value === 'object'">
              <span v-for="(type, index) in data.value" :key="index">
                {{ type }}
              </span>
            </v-card-text>
            <v-card-text v-else>
              <span v-if="data.text === '특성'">
                {{ data.value }}

                <v-dialog
                  transition="dialog-top-transition"
                  persistent
                  max-width="600"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      text
                      icon
                      small
                      v-bind="attrs"
                      v-on="on"
                      @click="getAbilityDetailInfo"
                    >
                      <v-icon small>mdi-help-circle</v-icon>
                    </v-btn>
                  </template>
                  <template v-slot:default="dialog">
                    <v-card>
                      <v-toolbar dark>
                        <span> {{ data.value }}</span>
                        <v-spacer></v-spacer>
                        <v-card-actions>
                          <v-btn text icon small @click="dialog.value = false">
                            <v-icon>mdi-close</v-icon>
                          </v-btn>
                        </v-card-actions>
                      </v-toolbar>
                      <v-card-text>
                        <div class="text-h6 pa-12">
                          {{ abilityKorean }}
                        </div>
                      </v-card-text>
                    </v-card>
                  </template>
                </v-dialog>
              </span>
              <span v-else>
                {{ data.value }}
              </span>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </div>

    <!--    v-card 안에서 정렬 방법 https://stackoverflow.com/questions/55574599/how-to-align-the-contents-to-the-center-of-the-v-card-component-in-vuetify-->
    <v-card-actions class="justify-center">
      <v-btn text @click="goEncyclopedia">
        <v-icon>mdi-menu</v-icon>
        <span>목록</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {
  fetchPokemon,
  fetchPokemonAbilityInfo,
  fetchPokemonSpecies,
} from '@/api/poke';
import { fillZero } from '@/utils/validation';

export default {
  data() {
    return {
      id: this.$route.params.pokeId,
      pokeName: '',
      pokeNum: '',
      frontImg:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/',
      backImg:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/',
      flavor_text_entries: [],
      detailData: [],
      abilityId: '',
      abilityKorean: '',
    };
  },
  methods: {
    async getPokeSpecies() {
      try {
        const { data } = await fetchPokemonSpecies(this.id);
        // console.log(data);

        this.getFlavorTextFromSpecies(data);
        this.getKoreanNameFromSpecies(data);
        await this.getPokeDetail();
        this.getKoreanGenusFromSpecies(data);
      } catch (error) {
        console.log(error);
      }
    },

    getFlavorTextFromSpecies(data) {
      let koreanFlavorText = new Array();
      data.flavor_text_entries.forEach(value => {
        if (value.language.name == 'ko') {
          koreanFlavorText.push({
            flavorTextVersion: value.version.name,
            flavorText: value.flavor_text,
          });
        }
      });
      this.flavor_text_entries.push(
        koreanFlavorText[koreanFlavorText.length - 2],
      );
      this.flavor_text_entries.push(
        koreanFlavorText[koreanFlavorText.length - 1],
      );
      // console.log(this.flavor_text_entries);
    },

    async getPokeDetail() {
      try {
        const { data } = Object.freeze(await fetchPokemon(this.id));
        this.getTypes(data);
        this.getHeightAndWeight(data);
        this.getAbility(data);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    },

    getTypes(data) {
      let types = new Array();
      data.types.forEach(value => {
        types.push(value.type.name);
      });
      this.detailData.push({
        text: '타입',
        value: types,
      });
    },

    getHeightAndWeight(data) {
      this.detailData.push({
        text: '키',
        value: this.divideByTenAndAddUnitString(data.height, 'height'),
      });
      this.detailData.push({
        text: '몸무게',
        value: this.divideByTenAndAddUnitString(data.weight, 'weight'),
      });
    },

    divideByTenAndAddUnitString(data, unitType) {
      data /= 10;
      if (unitType == 'height') {
        return data + 'm';
      }
      if (unitType == 'weight') {
        return data + 'kg';
      }
    },

    getAbility(data) {
      let ability = '';
      console.log(data.abilities);
      data.abilities.forEach(value => {
        if (value.is_hidden == false) {
          ability = value.ability.name;
          this.abilityId = this.getAbilityIdFromUrl(value.ability.url);
        }
      });
      this.detailData.push({
        text: '특성',
        value: ability,
      });
    },

    getAbilityIdFromUrl(url) {
      const urlSplit = url.split('/');
      return urlSplit[urlSplit.length - 2];
    },

    getKoreanNameFromSpecies(data) {
      data.names.forEach(value => {
        if (value.language.name == 'ko') {
          this.pokeName = value.name;
        }
      });
    },

    getKoreanGenusFromSpecies(data) {
      data.genera.forEach(value => {
        if (value.language.name == 'ko') {
          this.detailData.push({
            text: '분류',
            value: value.genus,
          });
        }
      });
    },

    async getAbilityDetailInfo() {
      try {
        const { data } = Object.freeze(
          await fetchPokemonAbilityInfo(this.abilityId),
        );
        const koreanText = data.flavor_text_entries.find(this.isKorean);
        this.abilityKorean = koreanText.flavor_text;
        console.log(koreanText);
      } catch (error) {
        console.log(error);
      }
    },
    isKorean(element) {
      if (element.language.name == 'ko') {
        return true;
      }
    },

    goEncyclopedia() {
      this.$router.push('/encyclopedia');
    },
  },

  created() {
    this.pokeNum = fillZero(3, this.id);
    this.getPokeSpecies();
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
