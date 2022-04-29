// 포켓몬 조작과 관련된 CRUD API 함수 파일
import { pokemon } from './index';

// 포켓몬 데이터 목록을 조회하는 API
function fetchPokemons(limit, offset) {
  //https://ayoteralab.tistory.com/entry/Vuejs-09-use-axios-get-params-%EC%B6%94%EA%B0%80
  return pokemon.get(`pokemon`, {
    params: {
      limit: limit,
      offset: offset,
    },
  });
}

// 특정 포켓몬을 조회하는 API
function fetchPokemon(pokemonNameOrId) {
  return pokemon.get(`pokemon/${pokemonNameOrId}`);
}

// 포켓몬 종을 조회하는 API
function fetchPokemonSpecies(pokemonId) {
  return pokemon.get(`pokemon-species/${pokemonId}`);
}

// 포켓몬 타입을 조회하는 API
function fetchPokemonTypes(pokemonId) {
  return pokemon.get(`pokemon-form/${pokemonId}`);
}

// 포켓몬 타입을 조회하는 API
function fetchPokemonAbilityInfo(abilityId) {
  return pokemon.get(`ability/${abilityId}`);
}

export {
  fetchPokemons,
  fetchPokemon,
  fetchPokemonSpecies,
  fetchPokemonTypes,
  fetchPokemonAbilityInfo,
};
