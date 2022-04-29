<template>
  <v-list dense expand nav>
    <template v-for="(item, index) in items">
      <DrawerListGroup v-if="item.items" :key="`group-${index}`" :item="item">
      </DrawerListGroup>
      <DrawerListItem
        v-else
        :key="`item-${index}`"
        :item="item"
      ></DrawerListItem>
    </template>
  </v-list>
</template>

<script>
import DrawerListGroup from '@/components/common/DrawerListGroup';
import DrawerListItem from '@/components/common/DrawerListItem';

export default {
  name: 'DrawerList',
  components: {
    DrawerListGroup,
    DrawerListItem,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style></style>
