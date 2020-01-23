<template lang="pug">
  #home
    b-container( fluid )
      b-row
        b-col
    MglMap(:accessToken="mbToken" :mapStyle.sync="mbStyle"
      :center="{lat:16.242, lng:-61.530}")
      MglNavigationControl( position="top-right" )
      MglGeolocateControl( position="top-right" )
      MglMarker(v-for="group in groups"
        :key="group.id"
        :coordinates="[group.positions[0].lng,group.positions[0].lat]"
        color="blue")
        MglPopup
          h5 {{group.name}}
    b-container
      SendPosition(:groups='groups')
      GroupList(:groups="groups")
    AddThis(:publicId="addThisId")
</template>

<script>
import {
  MglMap, MglGeolocateControl, MglNavigationControl, MglPopup, MglMarker,
} from 'vue-mapbox';
import AddThis from 'vue-simple-addthis-share';
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
      groups: [{
        id: '1',
        name: 'Akiyo',
        lastSeen: '2',
        positions: [{ lat: 16.242, lng: -61.530 },
          { lat: 16.249, lng: -61.543 }],
      }, {
        id: '2',
        name: 'Nasyon',
        lastSeen: '12',
        positions: [{ lat: 16.249, lng: -61.543 }],
      }],
    };
  },
  created() {
    this.groups = this.$store.getters.groups;
  },
};
</script>

<style lang="stylus">
  .mgl-map-wrapper
    height 450px
  canvas.mapboxgl-canvas
    position static !important
</style>
