<template lang="pug">
  #home
    b-container( fluid )
      b-row
        b-col
    MglMap(:accessToken="mbToken" :mapStyle.sync="mbStyle")
      MglNavigationControl( position="top-right" )
      MglGeolocateControl( position="top-right" )
      MglMarker(v-for="group in groupList"
        :key="group._id"
        :coordinates="[ group.positions[0].position.lng, group.positions[0].position.lat ]"
        color="blue")
        MglPopup
          h5 {{group.name}}
    b-container
      SendPosition(:groups='groupList')
      GroupList(:groups="groupList")
    AddThis(:publicId="addThisId")
</template>

<script>
import {
  MglMap, MglGeolocateControl, MglNavigationControl, MglPopup, MglMarker,
} from 'vue-mapbox';
import AddThis from 'vue-simple-addthis-share';
import { mapActions, mapGetters } from 'vuex';
import GroupList from '@/components/GroupList.vue';
import SendPosition from '@/components/SendPosition.vue';

export default {
  name: 'home',
  components: {
    SendPosition,
    MglMap,
    MglGeolocateControl,
    MglNavigationControl,
    MglMarker,
    MglPopup,
    AddThis,
    GroupList,
  },
  data() {
    return {
      mbToken: process.env.VUE_APP_MAPBOX_TOKEN,
      addThisId: process.env.VUE_APP_ADDTHIS_ID,
      mbStyle: 'mapbox://styles/marvinl/ck5lztuer05fn1iop4yx4nz0a',
    };
  },
  computed: {
    ...mapGetters('group', ['groupList']),
  },
  created() {
    this.getGroups();
  },
  methods: {
    ...mapActions('group', ['getGroups']),
  },
};
</script>

<style lang="stylus">
  .mgl-map-wrapper
    height 450px
  canvas.mapboxgl-canvas
    position static !important
</style>
