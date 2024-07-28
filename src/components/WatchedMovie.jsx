/*
 *  Project: usepopcorn
 *  File: WatchedMovie.jsx
 *  Created: 11:13 SA, 28/07/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */

export default function WatchedMovie({ movie }) {
	return <li>
		<img src={movie.Poster} alt={`${movie.Title} poster`} />
		<h3>{movie.Title}</h3>
		<div>
			<p>
				<span>⭐️</span>
				<span>{movie.imdbRating}</span>
			</p>
			<p>
				<span>🌟</span>
				<span>{movie.userRating}</span>
			</p>
			<p>
				<span>⏳</span>
				<span>{movie.runtime} min</span>
			</p>
		</div>
	</li>;
}
