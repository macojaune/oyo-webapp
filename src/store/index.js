import Vue from 'vue';
import Vuex from 'vuex';

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
      // api call fetch groups
      const groupList = [];
      commit('initGroups', groupList);
    },
    createGroup: ({ commit }, group) => {
      console.log(group);
      // api call create group
      const newGroup = {};
      commit('addGroup', newGroup);
    },
    addPosition: () => {

    },
  },
  modules: {
  },
});
