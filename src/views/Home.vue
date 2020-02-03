<template lang="pug">
  #home
    b-container( fluid )
      b-row
        b-col
    MglMap(:accessToken="mbToken" :mapStyle.sync="mbStyle"
      :zoom=9
      :center="{lat:16.242, lng:-61.530}"
      @load="onMapLoad")
      MglNavigationControl( position="top-right" )
      MglGeolocateControl( position="top-right" )
      MglMarker(v-for="group in groupList"
        :key="group._id"
        :coordinates="[ group.positions[0].position.lng, group.positions[0].position.lat ]"
        color="blue")
        MglPopup
          div
            h5 {{group.name}}
            b-card-text
              b Vu pour la dernière fois:
              |  il y a {{group.lastSeen}}min
    b-container
      SendPosition(:groups='groupList')
      GroupList(:groups="groupList" :handleSelect="selectGroup")
    AddThis(:publicId="addThisId")
    b-modal(v-model="showError" :title="error !== null ? error.title : ''")
      p(v-if="error !== null")
        | {{error.msg === 'no position access'        ? "L'application fonctionne mieux avec la         localisation activée !": error.msg}}
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
      mbStyle: process.env.VUE_APP_MAPBOX_MAP,
      addThisId: process.env.VUE_APP_ADDTHIS_ID,
      showError: false,
      error: null,
      actions: null,
    };
  },
  computed: {
    ...mapGetters('group', ['groupList']),
  },
  created() {
    this.getGroups();
    try {
      await this.$getLocation({ enableHighAccuracy: true });
    } catch (e) {
      this.error = { title: 'Attention', msg: e };
      this.showError = true;
    }
  },
  methods: {
    ...mapActions('group', ['getGroups']),
    async onMapLoad(event) {
      const { actions } = event.component;
      this.actions = actions;
    },
    async selectGroup({ positions }) {
      this.actions.flyTo({
        center: positions[0].position, zoom: 17, speed: 1,
      });
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
