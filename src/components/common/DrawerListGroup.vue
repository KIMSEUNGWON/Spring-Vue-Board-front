<template>
  <v-list-group :prepend-icon="item.icon" eager v-bind="$attrs">
    <template v-slot:activator>
      <v-list-item-content>
        <v-list-item-title>
          {{ item.title }}
        </v-list-item-title>
      </v-list-item-content>
    </template>

    <!--        https://vuetifyjs.com/en/components/lists/-->
    <v-list-item v-for="(child, i) in item.items" :key="i">
      <DrawerListGroup
        v-if="child.items"
        :key="`sub-group-${i}`"
        :item="child"
      ></DrawerListGroup>
      <DrawerListItem v-else :key="`child-${i}`" :item="child">
      </DrawerListItem>
    </v-list-item>
  </v-list-group>
</template>

<script>
import DrawerListItem from '@/components/common/DrawerListItem';

export default {
  name: 'DrawerListGroup',
  components: {
    DrawerListItem,
  },
  props: {
    item: {
      type: Object,
      default: () => [],
    },
  },
};
</script>

<style></style>
