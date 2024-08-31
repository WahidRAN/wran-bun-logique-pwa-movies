import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue({
			template: {
				compilerOptions: {
					isCustomElement: (tag) => tag.includes('swiper')
				}
			}
		}),
		VitePWA({
			registerType: "prompt",
			injectRegister: false,

			pwaAssets: {
				disabled: false,
				config: true,
			},

			manifest: {
				name: "wran-bun-logique-pwa-movies",
				short_name: "wran-bun-logique-pwa-movies",
				description: "PWA of movies info from tmdbapi.com",
				theme_color: "#ffffff",
			},

			workbox: {
				globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
				cleanupOutdatedCaches: true,
				clientsClaim: true,
				navigateFallbackDenylist: [/\/api/],
				runtimeCaching: [
					{
						urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
						handler: "CacheFirst",
						options: {
							cacheName: "google-fonts-cache",
							expiration: {
								maxEntries: 10,
								maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
							},
							cacheableResponse: {
								statuses: [0, 200],
							},
						},
					},
					{
						urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
						handler: "CacheFirst",
						options: {
							cacheName: "gstatic-fonts-cache",
							expiration: {
								maxEntries: 10,
								maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
							},
							cacheableResponse: {
								statuses: [0, 200],
							},
						},
					},
					{
						urlPattern: /^https:\/\/api\.themoviedb\.org\/3\/.*/i,
						handler: "StaleWhileRevalidate",
						options: {
							cacheName: "tmdb-api-cache",
							expiration: {
								maxEntries: 50, // Adjust this based on your needs
								maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
							},
							cacheableResponse: {
								statuses: [0, 200],
								headers: {
									"Access-Control-Allow-Origin": "*",
								},
							},
						},
					},
					{
						urlPattern: /^https:\/\/image\.tmdb\.org\/t\/p\/.*/i,
						handler: "NetworkFirst",
						options: {
							cacheName: "tmdb-img=api-cache",
							expiration: {
								maxEntries: 50, // Adjust this based on your needs
								maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
							},
							cacheableResponse: {
								statuses: [0, 200],
								headers: {
									"Access-Control-Allow-Origin": "*",
								},
							},
						},
					},
				],
			},

			devOptions: {
				enabled: false,
				navigateFallback: "index.html",
				suppressWarnings: true,
				type: "module",
			},
		}),
	],
});
