/*
 *  Project: usepopcorn
 *  File: SearchInput.jsx
 *  Created: 11:16 SA, 28/07/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */


export default function SearchInput({ query, setQuery }) {
	return <input
			className="search"
			type="text"
			placeholder="Search movies..."
			value={query}
			onChange={(e) => setQuery(e.target.value)}
	/>;
}
