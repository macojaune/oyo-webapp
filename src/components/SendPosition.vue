<template lang="pug">
  #sendPosition.mt-3
    b-button(variant="primary" block @click="show = true" :aria-expanded="show ? 'true': 'false'" aria-controls="'addPosition" v-show="!show") Ajouter une position
    b-button(variant="danger" block @click="show = false" v-show="show") Fermer
    b-collapse#addPosition.my-3.p-3(v-model="show")
      b-card.addPosition
        h2 Ajouter une position
        b-row(v-if="data.group.name")
          b-col
            h5(@click="data.group = ''") {{data.group.name}}
            b-button(variant="success" block @click="sendLocation" :active="data.group!==''")
              span(v-show="!isLoading") Envoyer ma position
              b-spinner(v-show="isLoading" small type="grow" )
        autocomplete.mb-3(:search="search"
          placeholder="Quel groupe ?"
          aria-label="Quel groupe ?"
          v-if="data.group ===''"
          @submit="setGroup")
          template(#default="{rootProps, inputProps, inputListeners,resultListListeners, results, resultProps}")
            div(v-bind="rootProps")
              input.autocomplete-input(v-bind="inputProps"
                :value="searchValue"
                v-on="inputListeners"
                @focus="toggleFocus"
                @blur="toggleFocus"
                :class="['autocomplete-input', { 'autocomplete-input-no-results': searchResults.length===0 }, { 'autocomplete-input-focused': focus } ]")
              ul.autocomplete-result-list(v-on="resultListListeners" v-show="focus")
                li(v-for="(result, index) in results" :key="result.id"
                  v-bind="resultProps[index]") {{result.name}}
                li.autocomplete-result(v-if="searchValue !== ''")
                  b-link(@click="setGroup({name:searchValue},true)" v-show="!isLoading") Ajouter {{searchValue}} à la  liste ?
                  b-spinner(v-show="isLoading" small type="grow" )
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'SendPosition',
  data() {
    return {
      show: false,
      searchValue: '',
      searchResults: [],
      focus: false,
      data: {
        group: '',
        position: { lat: '', lng: '' },
      },
    };
  },
  computed: {
    ...mapGetters(['isLoading', 'devicePosition', 'groupList']),
  },
  methods: {
    ...mapActions(['addGroup', 'addPosition', 'getDevicePosition']),
    search(input) {
      this.searchValue = input;
      if (input.length < 1) this.searchResults = this.groupList.slice(0, 2);

      this.searchResults = this.groupList.filter(({ name }) => name.toLowerCase()
        .startsWith(input.toLowerCase()));

      return this.searchResults;
    },
    async setGroup(group, isNew = false) {
      let newGroup = group;
      if (isNew) {
        newGroup = await this.addGroup(group);
      }
      this.data.group = newGroup;
    },
    async sendLocation() {
      if (this.data.group !== '') {
        await this.getDevicePosition();
        this.data.position = this.devicePosition;
        // sendToDb
        await this.addPosition(this.data);
        this.show = false;
      }
    },
    toggleFocus() {
      this.focus = !this.focus;
    },
  },
};
</script>

<style lang="stylus" scoped>
  .addPosition
    background dodgerblue
</style>
