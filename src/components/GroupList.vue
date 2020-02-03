<template lang="pug">
  #groupList.mt-3
    b-list-group(v-for="group in groups" :key="group.id")
      b-list-group-item.flex-column.align-items-start.mb-2(v-if="group.positions.length > 0")
        .d-flex.w-100.justify-content-between
          h5 {{group.name}}
          small il y a {{fromNow(group._changed)}}
        p.text-left.m-0 Rue
</template>

<script>
import moment from 'moment';

moment.locale('fr');

export default {
  name: 'GroupList',
  props: ['groups'],
  data() {
    return {};
  },
  computed: {
    fromNow(datetime) {
      return moment(datetime).fromNow(true);
    },
  },
};
</script>

<style scoped>

</style>
