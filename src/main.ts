import uviewPlus from 'uview-plus';
import { createSSRApp } from 'vue';
import App from './App.vue';
import store from './store';
export function createApp() {
	const app = createSSRApp(App);
	app.use(uviewPlus);
	app.use(store);
	return {
		app
	};
}
