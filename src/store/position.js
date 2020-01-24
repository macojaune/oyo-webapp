import Vue from 'vue';
import Vuex from 'vuex';
import t from './types';

Vue.use(Vuex);

export default {
  state: {
    isLoading: false,
    newPosition: {},
  },
  mutations: {
  },
  actions: {
    add: ({ commit }, { group, position }) => {
      try {
        commit(t.ADD_POSITION_REQUEST);
        // do shit
        console.log('create position in DB ', group, position);
        commit(t.ADD_POSITION_SUCCESS);
      } catch (e) {
        commit(t.ADD_POSITION_FAILURE, e);
      }
    },
  },
};
