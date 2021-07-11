const state = {
  headerType: 0,
  recommendArr:[],
  cardData:{},
};
const mutations = {
	updateRecommend(state, recommendArr){
		state.recommendArr = recommendArr;
		state.headerType = recommendArr[0].setData.style;
		state.cardData = recommendArr[0];
	},
};
export default {
    state,
    mutations
}