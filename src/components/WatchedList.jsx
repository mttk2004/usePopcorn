/*
 *  Project: usepopcorn
 *  File: WatchedList.jsx
 *  Created: 10:46 SA, 28/07/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */

import WatchedMovie from './WatchedMovie.jsx';


export default function WatchedList({ watched }) {
	return <ul className="list">
		{watched.map((movie) => <WatchedMovie movie={movie} key={movie.imdbID} />)}
	</ul>;
}

