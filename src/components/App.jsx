import Main                from './Main.jsx';
import NavBar              from './NavBar.jsx';
import Logo                from './Logo.jsx';
import SearchInput         from './SearchInput.jsx';
import NumResults          from './NumResults.jsx';
import MoviesList          from './MoviesList.jsx';
import Box                 from './Box.jsx';
import WatchedSummary      from './WatchedSummary.jsx';
import WatchedList         from './WatchedList.jsx';
import { useState }        from 'react';
import Loader              from './Loader.jsx';
import ErrorMessage        from './ErrorMessage.jsx';
import MovieDetails        from './MovieDetails.jsx';
import { useMovies }       from '../useMovies.js';
import { useLocalStorage } from '../useLocalStorage.js';


export default function App() {
	const [query, setQuery] = useState('');
	const [selectedId, setSelectedId] = useState('');
	const [watched, setWatched] = useLocalStorage([], 'watched');
	const { movies, isLoading, errMes } = useMovies(query);
	
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
