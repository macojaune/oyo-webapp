import Vue from 'vue';
import Vuex from 'vuex';
import t from './types';

Vue.use(Vuex);

export default {
  state: {
    groups: [],
    selectedGroup: {},
    isLoading: false,
    error: null,
  },
  mutations: {
    [t.GET_GROUP_LIST_REQUEST]: (state) => { state.isLoading = true; },
    [t.GET_GROUP_LIST_SUCCESS]: (state, groupList) => {
      state.isLoading = false;
      state.groups = groupList;
    },
    [t.GET_GROUP_LIST_FAILURE]: (state, err) => { state.error = err; },
    addGroup: ({ groups }, group) => groups.push(group),
    updateGroup: (state, group) => {
      // find group id
      const id = state.groups.findIndex(g => g.id === group.id);

      // update state.groups
      state.groups[id] = group;
    },
  },
  actions: {
    get: async ({ commit }) => {
      try {
        commit(t.GET_GROUP_LIST_REQUEST);
        // api call fetch groups
        const groupList = [];
        commit(t.GET_GROUP_LIST_SUCCESS, groupList);
      } catch (e) {
        commit(t.GET_GROUP_LIST_FAILURE, e);
      }
    },
    add: async ({ commit }, group) => {
      try {
        commit(t.ADD_GROUP_REQUEST);
        // api call add group
        console.log(group);
        const newGroup = {};
        commit(t.ADD_GROUP_SUCCESS, newGroup);
      } catch (e) {
        commit(t.ADD_GROUP_FAILURE, e);
      }
    },
  },
};
