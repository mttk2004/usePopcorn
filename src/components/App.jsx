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


const tempMovieData = [
	{
		imdbID: 'tt1375666',
		Title : 'Inception',
		Year  : '2010',
		Poster:
				'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
	},
	{
		imdbID: 'tt0133093',
		Title : 'The Matrix',
		Year  : '1999',
		Poster:
				'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
	},
	{
		imdbID: 'tt6751668',
		Title : 'Parasite',
		Year  : '2019',
		Poster:
				'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
	},
];
const tempWatchedData = [
	{
		imdbID    : 'tt1375666',
		Title     : 'Inception',
		Year      : '2010',
		Poster    :
				'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
		runtime   : 148,
		imdbRating: 8.8,
		userRating: 10,
	},
	{
		imdbID    : 'tt0088763',
		Title     : 'Back to the Future',
		Year      : '1985',
		Poster    :
				'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
		runtime   : 116,
		imdbRating: 8.5,
		userRating: 9,
	},
];

export default function App() {
	const [movies, setMovies] = useState(tempMovieData);
	const [watched, setWatched] = useState(tempWatchedData);
	const [query, setQuery] = useState('');
	const [selectedId, setSelectedId] = useState("tt31174028");
	const [isLoading, setIsLoading] = useState(false);
	const [errMes, setErrMes] = useState('');
	
	useEffect(() => {
		const fetchMovies = async function () {
			try {
				setIsLoading(true);
				setErrMes('');
				
				const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`);
				
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
	}, [query]);
	
	const handleSelectMovie = function(id) {
		setSelectedId(id === selectedId ? null : id)
	}
	
	const handleCloseMovie = function() {
		setSelectedId(null)
	}
	
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
						{!isLoading && !errMes && <MoviesList movies={movies} onSelectMovie={handleSelectMovie} />}
						{errMes && <ErrorMessage message={errMes} />}
					</Box>
					<Box>
						{selectedId ? <MovieDetails id={selectedId} onCloseMovie={handleCloseMovie} /> : <>
							<WatchedSummary watched={watched} />
							<WatchedList watched={watched} />
						</>}
					</Box>
				</Main>
			</>
	);
}
