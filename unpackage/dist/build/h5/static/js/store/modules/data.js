const state = {
  headerType: 0,
  recommendArr:[],
  cardData:{},
  cId: 0
};
const mutations = {
	updateRecommend(state, config){
		var recommendArr = config.cdata;
		state.recommendArr = recommendArr;
		state.headerType = recommendArr[0].number;
		state.cardData = recommendArr[0];
		state.cId = config.clientId;
	},
};
export default {
    state,
    mutations
}