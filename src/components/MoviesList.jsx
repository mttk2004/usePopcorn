/*
 *  Project: usepopcorn
 *  File: MoviesList.jsx
 *  Created: 9:24 SA, 28/07/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */

import Movie from './Movie.jsx';


export default function MoviesList({ movies }) {
	return <ul className="list">
		{movies?.map((movie) => <Movie movie={movie} key={movie.imdbID} />)}
	</ul>;
}


