/**
 *  Project: usepopcorn
 *  File: useKey.js
 *  Created: 1:25 CH, 06/08/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */

import { useEffect } from 'react';


export function useKey(callback) {
	useEffect(() => {
		document.addEventListener('keydown', callback);
		
		return () => document.removeEventListener('keydown', callback);
	}, [callback]);
}
