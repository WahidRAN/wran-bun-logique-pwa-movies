export type TmdbApiParams = {
	[key: string]: string | number;
};

export type MovieObjType = {
	id: number;
	backdrop_path: string;
	title: string;
	original_title: string;
	name: string;
	original_name: string;
	overview: string;
	poster_path: string;
	media_type: "movie";
	adult: boolean;
	original_language: string;
	genre_ids: number[];
	popularity: number;
	release_date: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
};

export type TrailerType = {
	iso_639_1: string;
	iso_3166_1: string;
	name: string;
	key: string;
	site: string;
	size: number;
	type: string;
	official: boolean;
	published_at: string;
	id: string;
};

export type MovieVideosType = {
	videos: {
		results: TrailerType[];
	};
};

export type MovieWithTrailersType = MovieObjType & {
	trailers: TrailerType[];
};

export type TvObjType = {
	backdrop_path: string;
	id: number;
	name: string;
	original_name: string;
	overview: string;
	poster_path: string;
	media_type: "tv";
	adult: boolean;
	original_language: string;
	genre_ids: number[];
	popularity: number;
	first_air_date: string;
	vote_average: number;
	vote_count: number;
	origin_country: string[];
};

export type CastKnownForObjType = {
	backdrop_path: string;
	id: number;
	title: string;
	original_title: string;
	overview: string;
	poster_path: string;
	media_type: string;
	adult: boolean;
	original_language: string;
	genre_ids: number[];
	popularity: number;
	release_date: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
};
export type CastObjType = {
	id: number;
	name: string;
	original_name: string;
	media_type: string;
	adult: boolean;
	popularity: number;
	gender: number;
	known_for_department: string;
	profile_path: string;
	known_for: CastKnownForObjType[];
};

export type TmdbApiResponsePagination<ResultType> = {
	page: number;
	results: ResultType;
	total_pages: number;
	total_results: number;
};

export type GenresType = {
	id: number;
	name: string;
};

export type TmdbApiResponseGenre = {
	genres: GenresType[];
};
