import { GenresType } from "../types/TmdbApiTypes";

export function useConverter() {
	const genreIdToName = (arrGenreId: number[], arrGenreRef: GenresType[]) => {
		const genreNames = arrGenreId.reduce(
			(accumulator: string[], id: number) => {
				const genre = arrGenreRef.find((g) => g.id === id);
				if (genre) accumulator.push(genre.name);
				return accumulator;
			},
			[]
		);

		return genreNames.join(", ");
	};

	return { genreIdToName };
}
