import Vuex, { StoreOptions } from 'vuex';

interface State {
	goods: null;
}

const storeOptions: StoreOptions<State> = {
	state(): State {
		return {
			goods: null
		};
	},
	mutations: {
		setGoods(state, data) {
			state.goods = data;
		}
	},
	actions: {
		setGoods({ commit }, data) {
			commit('setGoods', data);
		}
	},
	getters: {
		getGoods: (state) => state.goods
	}
};

// 使用环境变量来区分开发和生产环境
const store = process.env.NODE_ENV === 'production' ? new Vuex.Store(storeOptions) : new Vuex.Store<State>(storeOptions);

export default store;
