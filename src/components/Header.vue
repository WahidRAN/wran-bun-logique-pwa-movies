<script setup lang="ts">
import { computed, onBeforeMount } from "vue";
import { useTmdbStore } from "../stores/useTmdbStores";
import { Pagination } from "swiper/modules";
import MovieBoxIcon from "./icons/MovieBoxIcon.vue";
import MenuBurgerIcon from "./icons/MenuBurgerIcon.vue";
import SearchIcon from "./icons/SearchIcon.vue";

const modules = [Pagination];

const tmdbStore = useTmdbStore();
const topMovies = computed(() => tmdbStore.getTopNowPlayingMovies);

onBeforeMount(async () => {
	await tmdbStore.fetchNowPlayingMovies();
});
</script>

<template>
	<header class="header">
		<div class="header__top">
			<div class="header__top-logo">
				<MovieBoxIcon />
				<span class="text-2xl fw-bold">MovieBox</span>
			</div>
			<section class="header__top-search">
				<input
					type="text"
					placeholder="What do you want to watch?"
					class="search-input"
				/>
				<SearchIcon />
			</section>
			<section class="header__top-action">
				<a
					href="#"
					class="text-base fw-bold text-gray-100"
					style="text-decoration: none"
					>Sign in</a
				>
				<div class="header__top-menu header__top-menu--search">
					<SearchIcon />
				</div>
				<div class="header__top-menu">
					<MenuBurgerIcon />
				</div>
			</section>
		</div>
		<div class="header__hero">
			<swiper-container
				:direction="'vertical'"
				:pagination="{ clickable: true }"
				:modules="modules"
				effect="fade"
				class="header__swiper"
			>
				<swiper-slide
					v-for="movie in topMovies"
					:key="movie.id"
					class="video-slide"
					:style="{
						backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
					}"
				>
					<section class="hero__movie-meta">
						<h1 class="text-4xl">{{ movie.title }}</h1>
						<div class="hero__movie-meta--ratings">
							<img
								src="../assets/img/IMDb.png"
								alt="IMDb Logo"
								height="18"
							/>
							{{ Math.round(movie.vote_average * 100) / 10 }} / 100
						</div>
						<h2 class="movie__overview text-base fw-reguler">
							{{ movie.overview }}
						</h2>
					</section>
				</swiper-slide>
			</swiper-container>
		</div>
	</header>
</template>

<style scoped>
.header {
	position: relative;
	height: 58vh;
	margin: 0 16px 32px;
}
.header__top {
	position: absolute;
	top: 32px;
	width: 100%;
	height: 64px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	z-index: 10;
	color: white;
}
.header__top-search {
	position: relative;
	display: none;
}
.header__top-search svg {
	position: absolute;
	top: 8px;
	right: 8px;
}
.search-input {
	background-color: transparent;
	padding: 10px 14px;
	color: white;
	border: 2px solid var(--gray-300);
	border-radius: 8px;
	min-width: 480px;
}
.search-input::placeholder {
	color: var(--gray-300);
}
.search-input:focus {
	outline: none;
}
.header__top-logo {
	display: flex;
	flex-direction: row;
	gap: 8px;
	align-items: center;
}
.header__top-action {
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 16px;
}
.header__top-action a {
	display: none;
}
.header__top-menu {
	padding: 8px;
	line-height: 0.5;
	border-radius: 100%;
	background-color: var(--rose-700);
}
.header__top-menu svg {
	display: inline;
}
.header__hero {
	height: 100%;
	margin: -32px -16px 0;
	padding-top: 32px;
	color: white;
}
.header__swiper {
	width: 100%;
	height: 100%;
}
.video-slide {
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
}
.hero__movie-meta {
	width: 70%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 8px;
	padding: 0 16px;
}
.hero__movie-meta--ratings {
  display: flex;
  flex-direction: row;
  gap: 8px;
}
.movie__overview {
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 4;
	line-clamp: 4;
	overflow: hidden;
	text-overflow: ellipsis;
	line-height: 1.5em;
	max-height: 6em;
}

@media (min-width: 768px) {
	.header {
		margin: 0 56px 72px;
	}
	.header__top-action a {
		display: block;
	}
	.header__hero {
		margin: -32px -56px 0;
	}
	.hero__movie-meta {
		width: 50%;
		padding: 0 56px;
	}
}

@media (min-width: 1024px) {
	.header {
		height: 88vh;
		margin: 0 96px 0;
	}
	.header__top {
		height: 80px;
	}
	.header__top-search {
		display: block;
	}
	.header__top-menu--search {
		display: none;
	}
	.header__hero {
		margin: -32px -96px 0;
	}
	.hero__movie-meta {
		width: 50%;
		padding: 0 96px;
	}
}
</style>
