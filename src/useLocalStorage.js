/**
 *  Project: usepopcorn
 *  File: useLocalStorage.js
 *  Created: 11:00 SA, 06/08/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */

import { useEffect, useState } from 'react';


export function useLocalStorage(initialValue, key) {
	const [value, setValue] = useState(() => {
		const storedValue = localStorage.getItem(key);
		return storedValue ? JSON.parse(storedValue) : initialValue;
	});
	
	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);
	
	return [value, setValue];
}
