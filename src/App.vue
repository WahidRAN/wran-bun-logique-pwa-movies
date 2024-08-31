<script setup lang="ts">
import { computed, onBeforeMount } from "vue";
import PWABadge from "./components/PWABadge.vue";
import { useTmdbStore } from "./stores/useTmdbStores";
import ContentSection from "./components/core/ContentSection.vue";
import MovieCard from "./components/core/MovieCard.vue";
import VideoCard from "./components/core/VideoCard.vue";
import CastCard from "./components/core/CastCard.vue";
import { Navigation } from "swiper/modules";
import { useConverter } from "./composables/useConverter";
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";

const swiperAutoplay = {
	delay: 1000,
};
const modules = [Navigation];
const onProgress = (e: any) => {
	return e;
};
const onSlideChange = (e: any) => {
	// console.log("slide changed", e);
	return e;
};

const tmdbStore = useTmdbStore();
const converter = useConverter();

const genresMovie = computed(() => tmdbStore.getGenresMovie);
const genresTv = computed(() => tmdbStore.getGenresTV);

const getGenreNameByType = (showsType: string, showsGenresId: number[]) => {
	return showsType === "movie"
		? converter.genreIdToName(showsGenresId, genresMovie.value)
		: converter.genreIdToName(showsGenresId, genresTv.value);
};

const featuredShows = computed(() => tmdbStore.getFeaturedMovies);
const upcomingMovies = computed(() => tmdbStore.getUpcomingMovies);
const exclusiveVideos = computed(() => tmdbStore.getExclusiveVideos);
const featuredCasts = computed(() => tmdbStore.getFeaturedCasts);

onBeforeMount(async () => {
	await Promise.all([
		tmdbStore.fetchGenres(),
		tmdbStore.fetchFeaturedMovies(),
		tmdbStore.fetchUpcomingMovies(),
		tmdbStore.fetchExclusiveVideos(),
		tmdbStore.fetchFeaturedCasts(),
	]);
});
</script>

<template>
	<Header />
	<main class="main-container">
		<ContentSection :content-title="'Featured Movie'">
			<swiper-container
				:slidesPerView="2"
				:slidesPerGroup="2"
				:spaceBetween="16"
				:speed="7000"
				:autoplay="swiperAutoplay"
				:breakpoints="{
					768: {
						slidesPerView: 3,
						slidesPerGroup: 3,
						spaceBetween: 16,
					},
					1024: {
						slidesPerView: 4,
						slidesPerGroup: 4,
						spaceBetween: 32,
					},
					1280: {
						slidesPerView: 4,
						slidesPerGroup: 4,
						spaceBetween: 64,
					},
				}"
				:modules="modules"
				@swiperprogress="onProgress"
				@swiperslidechange="onSlideChange"
			>
				<swiper-slide
					v-for="shows in featuredShows"
					:key="shows.id"
					class="slide-container"
				>
					<MovieCard
						:movie-release-date="
							shows.media_type === 'movie'
								? shows.release_date
								: shows.first_air_date
						"
						:movie-title="
							shows.media_type === 'movie' ? shows.title : shows.name
						"
						:movie-type="shows.media_type"
						:movie-genre="getGenreNameByType(shows.media_type, shows.genre_ids)"
						:movie-poster="shows.poster_path"
						:movie-rating="shows.vote_average"
						loading="lazy"
					/>
				</swiper-slide>
			</swiper-container>
		</ContentSection>
		<ContentSection :content-title="'New Arrival'">
			<swiper-container
				:slidesPerView="2"
				:spaceBetween="16"
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
				:modules="modules"
				@swiperprogress="onProgress"
				@swiperslidechange="onSlideChange"
			>
				<swiper-slide
					v-for="movie in upcomingMovies"
					:key="movie.id"
					class="slide-container"
				>
					<MovieCard
						:movie-release-date="movie.release_date"
						:movie-title="movie.title"
						:movie-type="'movie'"
						:movie-genre="getGenreNameByType(movie.media_type, movie.genre_ids)"
						:movie-poster="movie.poster_path"
						:movie-rating="movie.vote_average"
					/>
				</swiper-slide>
			</swiper-container>
		</ContentSection>
		<ContentSection :content-title="'Exclusive Videos'">
			<swiper-container
				:slidesPerView="'auto'"
				:spaceBetween="8"
				:breakpoints="{
					768: {
						slidesPerView: 'auto',
						spaceBetween: 16,
					},
					1024: {
						slidesPerView: 'auto',
						spaceBetween: 32,
					},
					1280: {
						slidesPerView: 'auto',
						spaceBetween: 64,
					},
				}"
				:modules="modules"
				@swiperprogress="onProgress"
				@swiperslidechange="onSlideChange"
			>
				<swiper-slide
					v-for="movie in exclusiveVideos"
					:key="movie.id"
					class="video-slide"
				>
					<VideoCard
						:video-title="movie.title"
						:video-thumbnail="movie.backdrop_path"
						:video-url-key="movie.trailers[0].key"
					/>
				</swiper-slide>
			</swiper-container>
		</ContentSection>
		<ContentSection :content-title="'Featured Casts'">
			<swiper-container
				:slidesPerView="2"
				:spaceBetween="16"
				:breakpoints="{
					768: {
						slidesPerView: 3,
						spaceBetween: 16,
					},
					1024: {
						slidesPerView: 4,
						spaceBetween: 32,
						mousewheel: true,
					},
					1280: {
						slidesPerView: 4,
						spaceBetween: 64,
						mousewheel: true,
					},
				}"
				:freeMode="true"
				:modules="modules"
				@swiperprogress="onProgress"
				@swiperslidechange="onSlideChange"
			>
				<swiper-slide
					v-for="cast in featuredCasts"
					:key="cast.id"
					class="slide-container"
				>
					<CastCard
						:cast-name="cast.name"
						:cast-profile-path="cast.profile_path"
					/>
				</swiper-slide>
			</swiper-container>
		</ContentSection>
	</main>
	<Footer />
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

	.slide-container {
		max-width: 240px;
	}
	.video-slide {
		max-width: 480px;
	}
}
</style>
