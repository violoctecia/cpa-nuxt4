// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	modules: [
		'@nuxt/eslint',
		'@nuxt/fonts',
		'@nuxtjs/tailwindcss',
		'shadcn-nuxt',
		'@nuxtjs/color-mode',
		'@vueuse/motion/nuxt',
		'@pinia/nuxt',
	],
	css: ['~/assets/main.css'],
	shadcn: {
		/**
		 * Prefix for all the imported component.
		 * @default "Ui"
		 */
		prefix: '',
		/**
		 * Directory that the component lives in.
		 * Will respect the Nuxt aliases.
		 * @link https://nuxt.com/docs/api/nuxt-config#alias
		 * @default "@/components/ui"
		 */
		componentDir: '@/components/ui',
	},
	colorMode: {
		classSuffix: '',
	},
	motion: {
		directives: {
			'fade-up': {
				initial: {
					opacity: 0,
					y: 40,
					rotate: 5,
				},
				visibleOnce: {
					opacity: 1,
					y: 0,
					rotate: 0,
					transition: {
						duration: 600,
						ease: 'easeOut',
					},
				},
			},
		},
	},
	app: {
		head: {
			title: 'Julo',
		},
		layoutTransition: { name: 'page', mode: 'out-in' },
	},
	experimental: {
		defaults: {
			nuxtLink: {
				externalRelAttribute: 'noopener noreferrer',
				prefetch: false,
				prefetchOn: { interaction: true },
				trailingSlash: 'append',
			},
		},
	},
});
