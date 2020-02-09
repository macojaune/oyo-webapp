<template lang="pug">
  #home
    MglMap(:accessToken="mbToken" :mapStyle.sync="mbStyle"
      :zoom=9
      :center="{lat: 16.242, lng: -61.530}"
      @load="onMapLoad" :attributionControl="false")
      MglAttributionControl
      MglNavigationControl( position="top-right" showZoom :showCompass="false" )
      MglGeolocateControl( position="top-right")
      MglMarker(v-for="group in groupList"
        v-if="group.positions.length>0"
        :key="group._id"
        :coordinates="[ last(group.positions).lng, last(group.positions).lat ]"
        :color="markerColor()")
        MglPopup(:closeButton="false")
          b-card(:title="group.name")
            b-card-text
              b Vu pour la dernière fois:
              |  {{fromNow(last(group.positions)._changed)}}
            b-button.card-link(@click="selectGroup(group)")
              b-icon-arrows-angle-contract
            b-button.card-link(variant="success" :href="createLink(group)" target="_blank")
              b-icon-cursor-fill
              | Y aller
    b-container
      SendPosition
      GroupList(:groups="groupList" :handleSelect="selectGroup" :fromNow="fromNow")
    b-container.my-3
      b-row.mt-4.mb-2
        b-col.text-left
          h2 Comment améliorer ce site ?
            small  Laisse ton avis en commentaire
              b-icon-arrow-down
      vue-disqus(shortname="o-yo")
    AddThis(:publicId="addThisId")
</template>

<script>
import {
  MglMap, MglGeolocateControl, MglNavigationControl, MglAttributionControl, MglPopup, MglMarker,
} from 'vue-mapbox';
import AddThis from 'vue-simple-addthis-share';
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment';
import GroupList from '@/components/GroupList.vue';
import SendPosition from '@/components/SendPosition.vue';

moment.locale('fr');
export default {
  name: 'home',
  components: {
    SendPosition,
    MglMap,
    MglGeolocateControl,
    MglAttributionControl,
    MglNavigationControl,
    MglMarker,
    MglPopup,
    AddThis,
    GroupList,
  },
  data() {
    return {
      mbToken: process.env.VUE_APP_MAPBOX_TOKEN,
      mbStyle: process.env.VUE_APP_MAPBOX_MAP,
      addThisId: process.env.VUE_APP_ADDTHIS_ID,
      showError: false,
      error: null,
      actions: null,
    };
  },
  computed: {
    ...mapGetters(['groupList', 'devicePosition']),

  },
  async created() {
    await this.getGroups();
    await this.getDevicePosition();
  },
  methods: {
    ...mapActions(['getGroups', 'getDevicePosition']),
    async onMapLoad(event) {
      const { actions } = event.component;
      this.actions = actions;
    },
    async selectGroup(group) {
      this.actions.flyTo({
        center: [this.last(group.positions).lng, this.last(group.positions).lat], zoom: 17, speed: 1,
      });
    },
    fromNow(datetime) {
      return moment(datetime)
        .fromNow();
    },
    createLink(group) {
      const { lat, lng } = group.positions[0];
      return `https://waze.com/ul?ll=${lat}%2C${lng}&navigate=yes`;
    },
    markerColor() {
      return `#${(`000000${Math.random().toString(16).slice(2, 8).toUpperCase()}`).slice(-6)}`;
    },
    last(arr) {
      return arr[arr.length - 1];
    },
  },
};
</script>

<style lang="stylus">
  .mgl-map-wrapper
    height 450px
  canvas.mapboxgl-canvas
    position static !important
</style>
