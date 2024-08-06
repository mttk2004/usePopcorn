/*
 *  Project: usepopcorn
 *  File: SearchInput.jsx
 *  Created: 11:16 SA, 28/07/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */


import { useRef } from 'react';
import { useKey } from '../useKey.js';


export default function SearchInput({ query, setQuery }) {
	const inputEl = useRef(null);
	
	const callback = (e) => {
		if (e.code !== 'Enter') return;
		
		if (document.activeElement === inputEl.current) inputEl.current.blur();
		else {
			inputEl.current.focus();
			setQuery('');
		}
	};
	
	useKey(callback);
	
	return <input
			ref={inputEl}
			className="search"
			type="text"
			placeholder="Search movies..."
			value={query}
			onChange={(e) => setQuery(e.target.value)}
	/>;
}
