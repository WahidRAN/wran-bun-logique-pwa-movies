import { computed, ref } from "vue";
import { defineStore } from "pinia";

import OmdbApiService from "../services/OmdbApiService";
import TmdbApiService from "../services/TmdbApiService";
import { MovieObjType } from "../types/OmdbApiTypes";

export const useOmdbStore = defineStore("omdbStore", () => {
	const omdbService = new OmdbApiService();
	const tmdbService = new TmdbApiService();

	const getMovieDetailByTitle = async (
		title: string
	): Promise<MovieObjType> => {
		const params = {
			t: title,
		};
		return await omdbService
			.getMovieByTitleOrId("", params)
			.then(({ data }) => data as MovieObjType);
	};

	const curatedFeaturedMovies = ref(["Stranger Things"]);

	const featuredMoviesList = ref<any>([]);

	const featuredMovies = computed(() => featuredMoviesList.value);

	const fetchFeaturedMovies = async () => {
		const featuredResult: MovieObjType[] = await Promise.all(
			curatedFeaturedMovies.value.map((movie) => getMovieDetailByTitle(movie))
		);
		tmdbService.getMovieById("/movie/157336").then(({ data }) => data);
		featuredMoviesList.value = featuredResult;
	};

	return {
		getMovieDetailByTitle,
		fetchFeaturedMovies,
		featuredMovies,
	};
});
