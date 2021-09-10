import Vue from 'vue';
import  Vuex  from 'vuex';
Vue.use(Vuex);

import member from './modules/member.js';
import location from './modules/location.js';
import template from './modules/template.js';
import data from './modules/data.js';
const modules = {
	member,
	location,
	template,
	data
};

const store = new Vuex.Store({
	modules
});

export default store