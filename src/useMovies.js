/**
 *  Project: usepopcorn
 *  File: useMovies.js
 *  Created: 10:41 SA, 06/08/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */

import { useEffect, useState } from 'react';
import { KEY }                 from './config.js';


export function useMovies(query, callback) {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [errMes, setErrMes] = useState('');
	
	useEffect(() => {
		const controller = new AbortController();
		
		const fetchMovies = async function () {
			try {
				setIsLoading(true);
				setErrMes('');
				
				const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
																{ signal: controller.signal });
				
				if (!res.ok) throw new Error('Something went wrong');
				
				const data = await res.json();
				if (data.Response === 'False') throw new Error(data.Error);
				
				setMovies(data.Search);
			}
			catch (err) {
				console.error(err.message);
				setErrMes(err.message);
			}
			finally {
				setIsLoading(false);
			}
		};
		
		if (query.length < 3) {
			setMovies([]);
			setErrMes('');
			return;
		}
		
		callback?.();
		fetchMovies();
		
		return () => controller.abort('no necessary');
	}, [callback, query]);
	
	return { movies, isLoading, errMes };
}
