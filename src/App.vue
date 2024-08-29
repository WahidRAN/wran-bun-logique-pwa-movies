<script setup lang="ts">
import { onBeforeMount } from "vue";
import PWABadge from "./components/PWABadge.vue";
import { useOmdbStore } from "./stores/useOmdbStores";
import ContentSection from "./components/core/ContentSection.vue";
import MovieCard from "./components/core/MovieCard.vue";
// import VideoCard from "./components/core/VideoCard.vue";
// import CastCard from "./components/core/CastCard.vue";
import { Navigation } from "swiper/modules";

const omdbStore = useOmdbStore();

const swiperAutoplay = {
	delay: 0,
	pauseOnMouseEnter: true,
};
const modules = [Navigation];
const onProgress = (e: any) => {
	const [swiper, progress] = e.detail;
	console.log(swiper, progress);
};

const onSlideChange = (e: any) => {
	console.log("slide changed", e);
};

onBeforeMount(() => {
	omdbStore.fetchFeaturedMovies();
});
</script>

<template>
	<header></header>
	<main class="main-container">
		<ContentSection :content-title="'Featured Movie'">
			<swiper-container
				:slidesPerView="2"
				:slidesPerGroup="9"
				:spaceBetween="16"
				:speed="24000"
				:autoplay="swiperAutoplay"
				:breakpoints="{
					768: {
						slidesPerView: 3,
						spaceBetween: 16,
					},
					1024: {
						slidesPerView: 4,
						spaceBetween: 32,
					},
					1280: {
						slidesPerView: 4,
						spaceBetween: 64,
					},
				}"
				:horizontalClass="customHorizontalClass"
				:freeMode="true"
				:modules="modules"
				@swiperprogress="onProgress"
				@swiperslidechange="onSlideChange"
			>
				<swiper-slide>
					<MovieCard :movie-title="'Stranger Things'" />
				</swiper-slide>
				<swiper-slide>
					<MovieCard :movie-title="'Spirderman'" />
				</swiper-slide>
				<swiper-slide>
					<MovieCard :movie-title="'Superman'" />
				</swiper-slide>
				<swiper-slide>
					<MovieCard :movie-title="'Superman'" />
				</swiper-slide>
				<swiper-slide>
					<MovieCard :movie-title="'Superman'" />
				</swiper-slide>
				<swiper-slide>
					<MovieCard :movie-title="'Superman'" />
				</swiper-slide>
				<swiper-slide>
					<MovieCard :movie-title="'Superman'" />
				</swiper-slide>
				<swiper-slide>
					<MovieCard :movie-title="'Superman'" />
				</swiper-slide>
			</swiper-container>
		</ContentSection>
		<ContentSection :content-title="'New Arrival'">
			<MovieCard :movie-title="'Stranger Things'" />
		</ContentSection>
		<!-- <ContentSection :content-title="'Exclusive Videos'">
			<VideoCard />
		</ContentSection> -->
		<!-- <ContentSection :content-title="'Featured Casts'">
			<CastCard />
		</ContentSection> -->
	</main>
	<PWABadge />
</template>

<style scoped>
.main-container {
	margin: 8px 16px 32px;
	display: flex;
	flex-direction: column;
	gap: 24px;
}

@media (min-width: 768px) {
	.main-container {
		margin: 48px 56px 72px;
		gap: 16px;
	}
}

@media (min-width: 1024px) {
	.main-container {
		margin: 72px 96px 120px;
		gap: 80px;
	}

	swiper-slide {
		max-width: 240px;
	}
}
</style>
