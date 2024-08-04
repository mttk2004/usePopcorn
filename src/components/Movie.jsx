/*
 *  Project: usepopcorn
 *  File: Movie.jsx
 *  Created: 11:14 SA, 28/07/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */

export default function Movie({ movie, onSelectMovie }) {
	return <li onClick={() => onSelectMovie(movie.imdbID)}>
		<img src={movie.Poster} alt={`${movie.Title} poster`} />
		<h3>{movie.Title}</h3>
		<div>
			<p>
				<span>🗓</span>
				<span>{movie.Year}</span>
			</p>
		</div>
	</li>;
}
