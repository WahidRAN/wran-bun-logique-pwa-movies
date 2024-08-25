<script setup lang="ts">
import HeartIcon from "../icons/HeartIcon.vue";
</script>

<template>
	<div class="movie-card">
		<div class="movie-card__poster">
			<section class="movie-card__poster-header">
				<div class="movie-card__header-box text-xs text-gray-900 fw-bold">
					TV SERIES
				</div>
				<div class="movie-card__header-box movie-card__header-box--icon">
					<HeartIcon class="movie-card__header-icon" />
				</div>
			</section>
			<img
				src="https://images-cdn.ubuy.co.in/651b073ba9e01902321bb1d5-netflix-stranger-things-one-sheet-wall.jpg"
				alt="Stranger Things Poster"
				width="240"
				height="320"
				class="movie-card__poster-img"
			/>
		</div>
		<p class="text-xs text-gray-400 fw-bold">USA, 2016 - Current</p>
		<p class="text-lg text-gray-900 fw-bold">Stranger Things</p>
		<section class="movie-card__ratings">
			<div class="movie-card__ratings-item">
				<img
          src="../../assets/img/IMDb.png"
          alt="IMDb Logo"
          height="18"
        />
				<span class="text-xs text-gray-900">86.0 / 100</span>
			</div>
			<div class="movie-card__ratings-item">
				<img
					src="../../assets/img/RottenTomato.png"
					alt="Rotten Tomatoes Logo"
					height="18"
				/>
				<span class="text-xs text-gray-900">97%</span>
			</div>
		</section>
		<p class="text-xs text-gray-400 fw-bold">Action, Adventure / Horror</p>
	</div>
</template>

<style scoped>
.movie-card {
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
	max-width: 240px;
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
	padding: 1rem 1rem 0;
}
.movie-card__header-box {
	border-radius: 12px;
	padding: 3px 8px;
	background: rgba(243, 244, 246, 0.5);
	backdrop-filter: blur(2px);
}
.movie-card__header-box--icon {
	cursor: pointer;
	padding: 6px;
	border-radius: 100%;
}
.movie-card__header-icon {
	display: block;
	width: 24px;
	height: 24px;
	fill: var(--gray-300);
}

.movie-card__poster-img {
	display: block;
	object-fit: cover;
}
.movie-card__ratings {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.movie-card__ratings-item {
	display: flex;
	gap: 10px;
	align-items: center;
}
</style>
