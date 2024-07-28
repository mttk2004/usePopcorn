/*
 *  Project: usepopcorn
 *  File: NumResults.jsx
 *  Created: 11:16 SA, 28/07/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */

export default function NumResults({ movies }) {
	return <p className="num-results">
		Found <strong>{movies.length}</strong> results
	</p>;
}
