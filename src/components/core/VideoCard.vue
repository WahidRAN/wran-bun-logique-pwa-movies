<script setup lang="ts">
import { ref } from "vue";
import PlayIcon from "../icons/PlayIcon.vue";

const videoVisible = ref(false);
const videoKey = "SUXWAEX2jlg";
const youtubeUrl = ref(`https://www.youtube.com/embed/${videoKey}`);

const showVideo = () => {
	youtubeUrl.value += "?autoplay=1";
	videoVisible.value = true;
};
</script>

<template>
	<div class="video-card">
		<div class="video-wrapper">
			<div v-if="!videoVisible" class="overlay" @click="showVideo">
				<PlayIcon class="video__play-icon" />
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
		<h2 class="text-lg text-gray-900 fw-bold">Lamb (2021) Trailer</h2>
	</div>
</template>

<style scoped>
.video-card {
	display: flex;
	flex-direction: column;
	gap: 12px;
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
.video__play-icon {
	stroke: white;
  stroke-width: 1;
	width: 64px;
	height: 64px;
}
</style>
