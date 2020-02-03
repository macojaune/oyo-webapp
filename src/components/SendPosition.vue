<template lang="pug">
  #sendPosition.mt-3
    b-button(
      variant='primary'
      block
      v-show="!showSendPosition"
      @click="toggleSendPosition") Ajouter une position
    b-container.addPosition.my-3.p-3(fluid v-show="showSendPosition")
      h2 Ajouter une position
      b-row(v-if="data.group.name")
        b-col
          h5(@click="data.group = ''") {{data.group.name}}
          b-button(block @click="sendLocation" :active="data.group!==''") Envoyer ma position
      autocomplete.mb-3(:search="search"
        placeholder="Quel groupe ?"
        aria-label="Quel groupe ?"
      v-if="data.group ===''"
        @submit="setGroup")
        template(#default="{rootProps, inputProps, inputListeners, resultListListeners, results, resultProps}")
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
                b-link(@click="setGroup({name:searchValue})") Ajouter {{searchValue}} à la liste ?
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SendPosition',
  props: ['groups'],
  data() {
    return {
      showSendPosition: false,
      searchValue: '',
      searchResults: [],
      focus: false,
      data: {
        group: '',
        position: { lat: '', lng: '' },
      },
    };
  },
  methods: {
    ...mapActions('position', ['addPosition']),
    toggleSendPosition() {
      this.showSendPosition = true;
    },
    search(input) {
      this.searchValue = input;
      if (input.length < 1) this.searchResults = this.groups.slice(0, 3);

      this.searchResults = this.groups.filter(({ name }) => name.toLowerCase()
        .startsWith(input.toLowerCase()));

      return this.searchResults;
    },
    setGroup(group) {
      this.data.group = group;
    },
    async sendLocation() {
      if (this.data.group !== '') {
        this.data.position = await this.$getLocation({ enableHighAccuracy: true });
        this.showSendPosition = false;
        // sendToDb
        this.addPosition(this.data);
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
