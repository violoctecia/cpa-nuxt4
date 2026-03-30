import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
	// @ts-ignore - its from nuxt color mode module, not from vueUse
	const colorMode = useColorMode();
	const toggleTheme = () => {
		colorMode.preference = colorMode.preference === 'light' ? 'dark' : 'light';
	};
	const theme = computed(() => colorMode.preference);

	return {
		theme,
		toggleTheme,
	};
});
