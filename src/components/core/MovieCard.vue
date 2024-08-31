<script setup lang="ts">
import HeartIcon from "../icons/HeartIcon.vue";

const getReleaseYear = (releaseDate: string) =>
	new Date(releaseDate).getFullYear();

const props = defineProps<{
	movieReleaseDate: string;
	movieTitle: string;
	movieType: string;
	movieGenre: string;
	moviePoster: string;
	movieRating: number;
}>();
</script>

<template>
	<div class="movie-card">
		<div class="movie-card__poster">
			<section
				class="movie-card__poster-header"
				:style="{
					justifyContent:
						props.movieType === 'tv' ? 'space-between' : 'flex-end',
				}"
			>
				<div
					v-if="props.movieType === 'tv'"
					class="movie-card__header-box movie-card__header-movie-type text-xs text-gray-900 fw-bold"
				>
					TV SERIES
				</div>
				<div class="movie-card__header-box movie-card__header-box--icon">
					<HeartIcon class="movie-card__header-icon" />
				</div>
			</section>
			<img
				:src="`https://image.tmdb.org/t/p/w342/${props.moviePoster}`"
				:alt="props.movieTitle"
				class="movie-card__poster-img"
				loading="lazy"
			/>
			<div class="swiper-lazy-preloader"></div>
		</div>
		<p class="text-xs text-gray-400 fw-bold movie-card__meta">
			{{ getReleaseYear(props.movieReleaseDate) }}
		</p>
		<p class="text-lg text-gray-900 fw-bold">{{ props.movieTitle }}</p>
		<section class="movie-card__ratings">
			<div class="movie-card__ratings-item">
				<img src="../../assets/img/IMDb.png" alt="IMDb Logo" height="18" />
				<span class="text-xs text-gray-900"
					>{{ Math.round(props.movieRating * 100) / 10 }} / 100</span
				>
			</div>
		</section>
		<p class="text-xs text-gray-400 fw-bold movie-card__meta">
			{{ props.movieGenre }}
		</p>
	</div>
</template>

<style scoped>
.movie-card {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}
.movie-card__poster {
	position: relative;
}
.movie-card__poster-header {
	position: absolute;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: 0.75rem 0.75rem 0;
}
.movie-card__header-box {
	border-radius: 12px;
	padding: 3px 8px;
	background: rgba(243, 244, 246, 0.5);
	backdrop-filter: blur(2px);
}
.movie-card__header-movie-type {
	filter: drop-shadow(0 0 0.15rem cyan);
}
.movie-card__header-box--icon {
	cursor: pointer;
	padding: 4px;
	border-radius: 100%;
	filter: drop-shadow(0 2px 0.15rem var(--rose-800));
}
.movie-card__header-icon {
	display: block;
	width: 16px;
	height: 16px;
	fill: var(--gray-300);
}

.movie-card__poster-img {
	display: block;
	object-fit: cover;
	width: 100%;
}
.movie-card__meta {
	display: none;
}
.movie-card__ratings {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.movie-card__ratings-item {
	display: flex;
	gap: 4px;
	align-items: center;
}

@media (min-width: 376px) {
	.movie-card__header-box--icon {
		padding: 6px;
	}
	.movie-card__header-icon {
		width: 24px;
		height: 24px;
	}
}

@media (min-width: 768px) {
	.movie-card {
		gap: 0.75rem;
	}
	.movie-card__poster-header {
		padding: 1rem 1rem 0;
	}
	.movie-card__meta {
		display: block;
	}
	.movie-card__ratings-item {
		gap: 10px;
	}
}
</style>
