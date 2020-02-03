import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import PositionModule from './position';
import GroupModule from './group';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    newPosition: {},
    selectedGroup: {},
  },
  mutations: {
    initGroups: (state, groupList) => { state.groups = groupList; },
    addGroup: ({ groups }, group) => groups.push(group),
    updateGroup: (state, group) => {
      // find group id
      const id = state.groups.findIndex(g => g.id === group.id);

      // update state.groups
      state.groups[id] = group;
    },
  },
  actions: {
    createGroup: ({ commit }, group) => {
      console.log(group);
      // api call create group
      axios.post('https://oyoweb-ff04.restdb.io/rest/groups',
        group, { headers: { 'x-apikey': '5e2a1af54327326cf1c91b4e' } });

      const newGroup = {};
      commit('addGroup', newGroup);
    },
    addPosition: () => {

    },
  },
  modules: {
    position: PositionModule,
    group: GroupModule,
  },
});
