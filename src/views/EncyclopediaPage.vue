<template>
  <div class="main list-container contents">
    <h1 class="page-header">Pokemon Encyclopedia</h1>
    <PokeListItem></PokeListItem>
  </div>
</template>

<script>
import PokeListItem from '@/components/poke/PokeListItem';

export default {
  components: {
    PokeListItem,
  },
};
</script>

<style></style>
