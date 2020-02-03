import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import t from './types';

Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    groups: [],
    selectedGroup: {},
    isLoading: false,
    error: null,
  },
  getters: {
    groupList: state => state.groups,
  },
  mutations: {
    [t.GET_GROUP_LIST_REQUEST]: (state) => { state.isLoading = true; },
    [t.GET_GROUP_LIST_SUCCESS]: (state, groupList) => {
      state.isLoading = false;
      state.groups = groupList;
    },
    [t.GET_GROUP_LIST_FAILURE]: (state, err) => { state.error = err; },
    [t.ADD_GROUP_REQUEST]: ({ groups }, group) => groups.push(group),
    updateGroup: (state, group) => {
      // find group id
      const id = state.groups.findIndex(g => g.id === group.id);
      // update state.groups
      state.groups[id] = group;
    },
  },
  actions: {
    getGroups: async ({ commit }) => {
      try {
        commit(t.GET_GROUP_LIST_REQUEST);
        // api call fetch groups
        const { data } = await axios.get(`${process.env.VUE_APP_BDD_URL}/groups?metafields=true`, { headers: { 'x-apikey': process.env.VUE_APP_BDD_API_KEY } });
        // eslint-disable-next-line prefer-const
        let groups = [];
        data.map(async (group) => {
          // eslint-disable-next-line no-underscore-dangle
          const { data: groupData } = await axios.get(`${process.env.VUE_APP_BDD_URL}/groups/${group._id}/positions?metafields=true`, { headers: { 'x-apikey': process.env.VUE_APP_BDD_API_KEY } });
          const g = { ...group, positions: groupData };
          groups.push(g);
        });
        commit(t.GET_GROUP_LIST_SUCCESS, groups);
      } catch (e) {
        commit(t.GET_GROUP_LIST_FAILURE, e);
      }
    },
    addGroup: async ({ commit }, group) => {
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
