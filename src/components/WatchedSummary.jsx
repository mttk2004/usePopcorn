/*
 *  Project: usepopcorn
 *  File: WatchedSummary.jsx
 *  Created: 10:44 SA, 28/07/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */

const average = (arr) =>
		arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function WatchedSummary({ watched }) {
	const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
	const avgUserRating = average(watched.map((movie) => movie.userRating));
	const avgRuntime = average(watched.map((movie) => movie.runtime));
	
	return <div className="summary">
		<h2>Movies you watched</h2>
		<div>
			<p>
				<span>#️⃣</span>
				<span>{watched.length} movies</span>
			</p>
			<p>
				<span>⭐️</span>
				<span>{avgImdbRating}</span>
			</p>
			<p>
				<span>🌟</span>
				<span>{avgUserRating}</span>
			</p>
			<p>
				<span>⏳</span>
				<span>{avgRuntime} min</span>
			</p>
		</div>
	</div>;
}
