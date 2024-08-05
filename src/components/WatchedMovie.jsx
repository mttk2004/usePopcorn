/*
 *  Project: usepopcorn
 *  File: WatchedMovie.jsx
 *  Created: 11:13 SA, 28/07/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */

export default function WatchedMovie({ movie, onDeleteWatched }) {
	return <li>
		<img src={movie.poster} alt={`${movie.title} poster`} />
		<h3>{movie.title}</h3>
		<div>
			<p>
				<span>⭐️</span>
				<span>{movie.imdbRating}</span>
			</p>
			<p>
				<span>🌟</span>
				<span>{movie.userRating.toFixed(1)}</span>
			</p>
			<p>
				<span>⏳</span>
				<span>{movie.runtime} min</span>
			</p>
			<button className="btn-delete" onClick={() => onDeleteWatched(movie.imdbID)}>X</button>
		</div>
	</li>;
}
