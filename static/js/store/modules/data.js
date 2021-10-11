const state = {
  headerType: 0,
  recommendArr:[],
  cardData:{},
  clientId: 0,
};
const mutations = {
	updateRecommend(state, recommendArr, clientId){
		state.recommendArr = recommendArr;
		state.headerType = recommendArr[0].number;
		state.cardData = recommendArr[0];
		state.clientId = clientId;
	},
};
export default {
    state,
    mutations
}