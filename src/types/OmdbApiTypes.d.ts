// OmdbApiTypes.d.ts

export type MovieObjType = {
	Actors: string;
	Awards: string;
	BoxOffice: string;
	Country: string;
	DVD: string;
	Director: string;
	Genre: string;
	Language: string;
	Metascore: string;
	Plot: string;
	Poster: string;
	Production: string;
	Rated: string;
	Ratings: {
		Source: string;
		Value: string;
	}[];
	Released: string;
	Response: string;
	Runtime: string;
	Title: string;
	Type: string;
	Website: string;
	Writer: string;
	Year: string;
	imdbID: string;
	imdbRating: string;
	imdbVotes: string;
};

export type MovieParamsByTitleOrIdType = {
	i?: string;
	t?: string;
	type?: 'movie' | 'series' | 'episode';
	y?: string;
	plot?: 'short' | 'full';
	r?: 'json' | 'xml';
};

export type MovieParamsBySearch = {
	s: string;
	type?: 'movie' | 'series' | 'episode';
	y?: string;
	r?: 'json' | 'xml';
	page?: number;
	plot?: 'short' | 'full';
};
