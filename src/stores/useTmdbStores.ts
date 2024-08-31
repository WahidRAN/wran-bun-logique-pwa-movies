import { computed, ref } from "vue";
import { defineStore } from "pinia";

import TmdbApiService from "../services/TmdbApiService";
import {
	CastObjType,
	GenresType,
	MovieObjType,
	MovieVideosType,
	MovieWithTrailersType,
	TmdbApiResponseGenre,
	TmdbApiResponsePagination,
	TvObjType,
} from "../types/TmdbApiTypes";

export const useTmdbStore = defineStore("tmdbStore", () => {
	const tmdbService = new TmdbApiService();

	const fetchMovieVideos = (movieId: number) => {
		const params = {
			append_to_response: "videos",
		};
		const result = tmdbService
			.get<MovieVideosType>(`/movie/${movieId}`, params)
			.then(({ data }) => {
				const trailerArr = data.videos.results.filter(
					(video) => video.type === "Trailer"
				);
				return trailerArr;
			})
			.catch((err) => err);

		return result;
	};

	// Genres API
	const genresMovie = ref<GenresType[]>([]);
	const getGenresMovie = computed(() => genresMovie.value);

	const genresTV = ref<GenresType[]>([]);
	const getGenresTV = computed(() => genresMovie.value);

	const fetchGenresMovie = () =>
		tmdbService
			.get<TmdbApiResponseGenre>("/genre/movie/list")
			.then(({ data }) => data.genres);
	const fetchGenresTV = () =>
		tmdbService
			.get<TmdbApiResponseGenre>("/genre/tv/list")
			.then(({ data }) => data.genres);

	const fetchGenres = async () => {
		const [movieGenre, tvGenre] = await Promise.all([
			fetchGenresMovie(),
			fetchGenresTV(),
		]);
		genresMovie.value = movieGenre;
		genresTV.value = tvGenre;
	};

	// Header Movies API
	const nowPlayingMoviesList = ref<MovieObjType[]>([]);
	const getNowPlayingMovies = computed(() => nowPlayingMoviesList.value);
	const getTopNowPlayingMovies = computed(() => {
		const topVote = nowPlayingMoviesList.value.filter(
			(movie) => movie.vote_average > 7
		);
		return topVote.slice(0, 5);
	});

	const fetchNowPlayingMovies = async () => {
		return await tmdbService
			.get<TmdbApiResponsePagination<MovieObjType[]>>("/movie/now_playing")
			.then(
				({ data }) =>
					(nowPlayingMoviesList.value = data.results as MovieObjType[])
			)
			.catch((err) => err);
	};

	// Featured Movies API
	const featuredMoviesList = ref<MovieObjType[] | TvObjType[]>([]);
	const getFeaturedMovies = computed(() => featuredMoviesList.value);

	const fetchFeaturedMovies = () => {
		tmdbService
			.get<TmdbApiResponsePagination<MovieObjType[] | TvObjType[]>>(
				"/trending/all/week"
			)
			.then(
				({ data }) =>
					(featuredMoviesList.value = data.results as
						| MovieObjType[]
						| TvObjType[])
			);
	};

	// New Arrival API
	const upcomingMoviesList = ref<MovieObjType[]>([]);
	const getUpcomingMovies = computed(() => upcomingMoviesList.value);

	const fetchUpcomingMovies = () => {
		tmdbService
			.get<TmdbApiResponsePagination<MovieObjType[]>>("/movie/upcoming")
			.then(
				({ data }) =>
					(upcomingMoviesList.value = data.results as MovieObjType[])
			);
	};

	// Exclusive Video API
	const exclusiveVideoList = ref<MovieWithTrailersType[]>([]);
	const getExclusiveVideos = computed(() => exclusiveVideoList.value);

	const fetchExclusiveVideos = () => {
		const params = {
			append_to_response: "videos",
		};
		tmdbService
			.get<TmdbApiResponsePagination<MovieObjType[]>>(
				"/movie/now_playing",
				params
			)
			.then(async ({ data }) => {
				const movieVideosPromises = data.results.map(async (movie) => {
					const trailers = await fetchMovieVideos(movie.id);
					return {
						...movie,
						trailers,
					} as MovieWithTrailersType;
				});

				const movieWithTrailers = await Promise.all(movieVideosPromises);
				return (exclusiveVideoList.value = movieWithTrailers);
			});
	};

	// Featured Casts API
	const featuredCastsList = ref<CastObjType[]>([]);
	const getFeaturedCasts = computed(() => featuredCastsList.value);

	const fetchFeaturedCasts = () => {
		tmdbService
			.get<TmdbApiResponsePagination<CastObjType[]>>("/trending/person/week")
			.then(
				({ data }) => (featuredCastsList.value = data.results as CastObjType[])
			);
	};

	return {
		fetchGenres,
		getGenresMovie,
		getGenresTV,
		fetchNowPlayingMovies,
		getNowPlayingMovies,
		getTopNowPlayingMovies,
		fetchFeaturedMovies,
		getFeaturedMovies,
		fetchUpcomingMovies,
		getUpcomingMovies,
		fetchExclusiveVideos,
		getExclusiveVideos,
		fetchFeaturedCasts,
		getFeaturedCasts,
	};
});
