import * as type from "./mutation-type";

const mutations = {

  [type.WIKI_QUERY](state, data) {
    state.wikiQuery = data;
  },
	[type.GET_WIKIPEDIA_DATA](state, data) {
    state.wikiData = data;
  },
  [type.GET_WIKIINSTAGRAM_DATA](state, data) {
    state.wikiInstagram = data;
  },
};
export default mutations;
