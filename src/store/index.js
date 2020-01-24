import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import PositionModule from './position';
import GroupModule from './group';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    groups: [],
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
    getGroups: ({ commit }) => {
      let groupList = [];
      // api call fetch groups
      // eslint-disable-next-line no-return-assign
      axios.get('https://oyoweb-ff04.restdb.io/rest/groups', { headers: { 'x-apikey': '5e2a1af54327326cf1c91b4e' } }).then(response => (groupList = response.data));
      commit('initGroups', groupList);
    },
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
