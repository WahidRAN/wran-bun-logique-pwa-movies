<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from "vue";
import PWABadge from "./components/PWABadge.vue";
import { useOmdbStore } from "./stores/useOmdbStores";

const omdbStore = useOmdbStore();
const videoVisible = ref(false);
const videoKey = "SUXWAEX2jlg"; // Replace with your TMDb API video key
const youtubeUrl = ref(`https://www.youtube.com/embed/${videoKey}`);

const showVideo = () => {
	youtubeUrl.value += "?autoplay=1";
	videoVisible.value = true;
};
onBeforeMount(() => {
	omdbStore.fetchFeaturedMovies();
})
onMounted(() => {
});
</script>

<template>
	<div>
		<a href="https://vitejs.dev" target="_blank">
			<img
				src="/movie-box-icon-only.svg"
				class="logo"
				alt="wran-bun-logique-pwa-movies logo"
			/>
		</a>
		<a href="https://vuejs.org/" target="_blank">
			<img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
		</a>
	</div>
	<div class="video-wrapper">
		<div v-if="!videoVisible" class="overlay" @click="showVideo">
			<button class="play-button">▶️</button>
		</div>
		<iframe
			v-if="videoVisible"
			width="560"
			height="315"
			:src="youtubeUrl"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
		>
		</iframe>
	</div>
	<PWABadge />
</template>

<style scoped>
.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
	transition: filter 300ms;
}
.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}

.video-wrapper {
	position: relative;
	width: 560px; /* Adjust width as needed */
	height: 315px; /* Adjust height as needed */
}

.overlay {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.7); /* Semi-transparent black */
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	z-index: 10;
}

.play-button {
	font-size: 3rem;
	color: white;
	background: none;
	border: none;
	cursor: pointer;
}

iframe {
	display: block;
	width: 100%;
	height: 100%;
}
</style>
