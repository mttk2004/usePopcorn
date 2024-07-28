/*
 *  Project: usepopcorn
 *  File: SearchInput.jsx
 *  Created: 11:16 SA, 28/07/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */

import { useState } from 'react';


export default function SearchInput() {
	const [query, setQuery] = useState('');
	
	return <input
			className="search"
			type="text"
			placeholder="Search movies..."
			value={query}
			onChange={(e) => setQuery(e.target.value)}
	/>;
}
