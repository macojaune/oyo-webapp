/* eslint-disable no-underscore-dangle */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import t from './types';

Vue.use(Vuex);

const API_URL = `${process.env.VUE_APP_BDD_URL}/`;
const API_CONFIG = { headers: { 'x-apikey': process.env.VUE_APP_BDD_API_KEY } };

export default new Vuex.Store({
  state: {
    groups: [],
    isLoading: false,
    error: null,
    success: null,
  },
  getters: {
    groupList: state => state.groups,
    isLoading: ({ isLoading }) => isLoading,
    showMsg: ({ error, success }) => error !== null || success !== null,
    error: state => state.error,
    success: state => state.success,
  },
  mutations: {
    [t.GET_GROUP_LIST_REQUEST]: (state) => {
      state.isLoading = true;
    },
    [t.GET_GROUP_LIST_SUCCESS]: (state, groupList) => {
      state.groups = groupList;
      state.isLoading = false;
    },
    [t.GET_GROUP_LIST_FAILURE]: (state, err) => {
      state.error = err;
      state.isLoading = false;
    },
    [t.ADD_GROUP_REQUEST]: (state) => {
      state.isLoading = true;
    },
    [t.ADD_GROUP_SUCCESS]: ({ groups }, group) => groups.push(group),
    [t.ADD_GROUP_FAILURE]: (state, err) => {
      state.error = err;
    },
    [t.ADD_POSITION_REQUEST]: (state) => {
      state.isLoading = true;
    },
    [t.ADD_POSITION_SUCCESS]: (state, position, group) => {
      const id = state.groups.findIndex(g => g._id === group._id);
      state.groups[id].positions.unshift(position);
      state.groups[id]._changed = Date.now();
      state.success = 'Position bien reçue.';
      state.isLoading = false;
    },
    [t.ADD_POSITION_FAILURE]: (state, err) => {
      state.error = err;
      state.isLoading = false;
    },
    [t.GET_GROUP_POSITION_LIST_REQUEST]: (state) => { state.isLoading = true; },
    [t.GET_GROUP_POSITION_LIST_SUCCESS]: (state) => { state.isLoading = false; },
    [t.GET_ADDRESS_REQUEST]: () => {},
    [t.GET_ADDRESS_SUCCESS]: () => { },
    [t.GET_ADDRESS_FAILURE]: (state, err) => { state.error = err; },
  },
  actions: {
    getGroups: async ({ dispatch, commit }) => {
      try {
        commit(t.GET_GROUP_LIST_REQUEST);
        // api call fetch groups
        const { data } = await axios.get(`${API_URL}groups?metafields=true`, API_CONFIG);
        // eslint-disable-next-line prefer-const
        let groups = [];
        data.map(async (group) => {
          commit(t.GET_GROUP_POSITION_LIST_REQUEST);
          const { data: groupData } = await axios.get(`${API_URL}groups/${group._id}/positions?metafields=true`, API_CONFIG);
          commit(t.GET_GROUP_POSITION_LIST_SUCCESS, groupData);
          let g = { ...group, positions: groupData };
          // get LAst address
          const address = await dispatch('getAddress', g);
          g = { ...g, address };
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
        let newGroup = {};
        // api call create group
        newGroup = await axios.post(API_URL, group, API_CONFIG);

        commit(t.ADD_GROUP_SUCCESS, { ...newGroup, positions: [] });
      } catch (e) {
        commit(t.ADD_GROUP_FAILURE, e);
      }
    },
    addPosition: async ({ commit }, { group, position }) => {
      try {
        commit(t.ADD_POSITION_REQUEST);
        // api call add position
        const newPosition = await axios.post(`${API_URL}groups/${group._id}/positions`, position, API_CONFIG);
        commit(t.ADD_POSITION_SUCCESS, group, newPosition);
      } catch (e) {
        commit(t.ADD_POSITION_FAILURE, e);
      }
    },
    getAddress: async ({ commit }, group) => {
      if (group.positions.length > 0) {
        const { lat, lng } = group.positions[0];
        commit(t.GET_ADDRESS_REQUEST);
        try {
          const { data } = await axios.get('https://nominatim.openstreetmap.org/reverse', {
            params: {
              format: 'json',
              lat,
              lon: lng,
              zoom: 18,
              addressdetails: 1,
            },
          });
          commit(t.GET_ADDRESS_SUCCESS, data);
          return data;
        } catch (e) {
          commit(t.GET_ADDRESS_FAILURE, e);
        }
      } return false;
    },
  },
});
