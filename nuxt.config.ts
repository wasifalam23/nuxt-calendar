// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: false },
	modules: ["@nuxtjs/tailwindcss"],
	css: ["flowbite/dist/flowbite.css"],
	runtimeConfig: {
		public: {
			realmAppId: "",
		},
	},
	app: {},
});
