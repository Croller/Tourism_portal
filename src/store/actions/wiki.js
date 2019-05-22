import http from "../../services/HttpServices.js"
import * as type from "../mutations/mutation-type";

export default {
  getWikiPedia({
    commit,
    dispatch,
    state
  }) {
    http.post(state.pathData + '/getWikipedia', state.wikiQuery).then(res => {
      commit(type.GET_WIKIPEDIA_DATA, res.data);
    });
  },
  getWikiInstagram({
    commit,
    dispatch,
    state
  }) {
    http.post(state.pathData + '/getWikiInstagram', state.wikiQuery).then(res => {
      commit(type.GET_WIKIINSTAGRAM_DATA, res.data.post);
    });
  },
};
