<template lang="pug">
  #groupList.my-3.overflow-auto
    b-list-group(v-for="group in groups" :key="group.id" v-show="!isLoading")
      b-list-group-item.align-items-start.mb-2(button
      v-if="group.positions.length > 0" @click="selectGroup(group)")
        .d-flex.justify-content-between
          h5 {{group.name}}
          span {{fromNow(group._changed)}}
        p.text-left.m-0(v-if="group.address") {{group.address.display_name}}
    b-spinner(type="grow" variant="primary" v-show="isLoading")
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'GroupList',
  props: ['groups', 'handleSelect', 'fromNow'],
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['isLoading']),
  },
  methods: {
    selectGroup(group) {
      this.handleSelect(group);
    },
  },
};
</script>

<style lang="stylus">
  #groupList
    max-height  350px
</style>
