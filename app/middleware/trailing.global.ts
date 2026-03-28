export default defineNuxtRouteMiddleware((to, from) => {
	if (to.path.length > 1 && to.path.slice(-1) !== '/' && to.name && to.name !== '404') {
		const path = to.path + '/';
		return navigateTo({ path, query: to.query, hash: to.hash }, { redirectCode: 301 });
	}
});
