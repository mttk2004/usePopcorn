import Main                    from './Main.jsx';
import NavBar                  from './NavBar.jsx';
import Logo                    from './Logo.jsx';
import SearchInput             from './SearchInput.jsx';
import NumResults              from './NumResults.jsx';
import MoviesList              from './MoviesList.jsx';
import Box                     from './Box.jsx';
import WatchedSummary          from './WatchedSummary.jsx';
import WatchedList             from './WatchedList.jsx';
import { useEffect, useState } from 'react';
import Loader                  from './Loader.jsx';
import ErrorMessage            from './ErrorMessage.jsx';
import MovieDetails            from './MovieDetails.jsx';
import { KEY }                 from '../config.js';


export default function App() {
	const [movies, setMovies] = useState([]);
	const [watched, setWatched] = useState([]);
	const [query, setQuery] = useState('');
	const [selectedId, setSelectedId] = useState('tt31174028');
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
		
		fetchMovies();
		
		return () => controller.abort('no necessary');
	}, [query]);
	
	const handleSelectMovie = function (id) {
		setSelectedId(id === selectedId ? null : id);
	};
	
	const handleCloseMovie = function () {
		setSelectedId(null);
	};
	
	const handleAddWatched = function (movie) {
		setWatched(movies => [...movies, movie]);
	};
	
	const handleDeleteWatched = function (id) {
		setWatched(watched => watched.filter(movie => movie.imdbID !== id));
	};
	
	return (
			<>
				<NavBar>
					<Logo />
					<SearchInput query={query} setQuery={setQuery} />
					<NumResults movies={movies} />
				</NavBar>
				
				<Main>
					<Box>
						{/*{isLoading ? <Loader /> : <MoviesList movies={movies} />}*/}
						{isLoading && <Loader />}
						{!isLoading && !errMes && <MoviesList
								movies={movies} onSelectMovie={handleSelectMovie} />}
						{errMes && <ErrorMessage message={errMes} />}
					</Box>
					<Box>
						{selectedId ? <MovieDetails
														id={selectedId} watched={watched} onCloseMovie={handleCloseMovie}
														onAddWatched={handleAddWatched} />
												: <>
							 <WatchedSummary watched={watched} />
							 <WatchedList watched={watched} onDeleteWatched={handleDeleteWatched} />
						 </>}
					</Box>
				</Main>
			</>
	);
}
