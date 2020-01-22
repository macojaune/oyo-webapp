<template lang="pug">
  #groupList.mt-3
    b-list-group(v-for="group in groups" :key="group.id")
      b-list-group-item.flex-column.align-items-start.mb-2
        .d-flex.w-100.justify-content-between
          h5 {{group.name}}
          small il y a {{group.lastSeen}} min
        p.text-left.m-0 {{group.positions[0]}}
</template>

<script>
export default {
  name: 'GroupList',
  props: ['groups'],
  data() {
    return {};
  },
};
</script>

<style scoped>

</style>
