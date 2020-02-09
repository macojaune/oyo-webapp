<template lang="pug">
  #groupList.my-3.overflow-auto
    b-list-group(v-for="group in groupList" :key="group._id" v-show="!isLoading")
      b-list-group-item.align-items-start.mb-2(button
      v-if="group.positions.length > 0" @click="selectGroup(group)")
        .d-flex.justify-content-between
          h5.font-weight-bold {{group.name}}
          span {{fromNow(group.positions[group.positions.length-1]._changed)}}
        p.text-left.m-0(v-if="group.address") {{group.address.display_name}}
    b-spinner(type="grow" variant="primary" v-show="isLoading")
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'GroupList',
  props: ['handleSelect', 'fromNow'],
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['isLoading', 'groupList']),
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
