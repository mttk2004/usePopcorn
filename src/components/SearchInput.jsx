/*
 *  Project: usepopcorn
 *  File: SearchInput.jsx
 *  Created: 11:16 SA, 28/07/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */


import { useEffect, useRef } from 'react';


export default function SearchInput({ query, setQuery }) {
	const inputEl = useRef(null);
	
	useEffect(() => {
		const callback = (e) => {
			if (e.code !== 'Enter') return;
			
			if (document.activeElement === inputEl.current) inputEl.current.blur();
			else {
				inputEl.current.focus();
				setQuery('');
			}
		};
		
		document.addEventListener('keydown', callback);
		
		return () => document.removeEventListener('keydown', callback);
	}, [setQuery]);
	
	return <input
			ref={inputEl}
			className="search"
			type="text"
			placeholder="Search movies..."
			value={query}
			onChange={(e) => setQuery(e.target.value)}
	/>;
}
