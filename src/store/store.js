import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions/actions.js';
import mutations from './mutations/mutations';
import getters from './getters/getters';

Vue.use(Vuex);

// export default new Vuex.Store({
//   state: {

//   },
//   mutations: {

//   },
//   actions: {

//   },
// });

const VuexStore = new Vuex.Store({
  state: {
  	pathData: String,
  	// wiki
  	wikiQuery: Object,
  	wikiPedia: Object,
  	wikiInstagram: Object,
  },
  actions,
  mutations,
  getters,
});

export default VuexStore;
