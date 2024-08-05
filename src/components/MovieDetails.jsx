/**
 *  Project: usepopcorn
 *  File: MovieDetails.jsx
 *  Created: 11:40 SA, 04/08/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */


import { useEffect, useState } from 'react';
import { KEY }                 from '../config.js';
import StarRating              from './StarRating.jsx';
import Loader                  from './Loader.jsx';


export default function MovieDetails({ id, onCloseMovie, onAddWatched, watched }) {
	const [movie, setMovie] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [userRating, setUserRating] = useState(0);
	
	const {
					Title   : title,
					Poster  : poster,
					Plot    : plot,
					Runtime : runtime,
					Year    : year,
					Genre   : genre,
					Director: director,
					Actors  : actors,
					Released: released,
					imdbRating
				} = movie || {};
	
	const watchedIndex = watched.findIndex(movie => movie.imdbID === id);
	const isWatched = watchedIndex !== -1;
	
	const handleRating = function (rating) {
		setUserRating(rating);
	};
	
	const addWatchedMovie = function () {
		const newWatchedMovie = {
			runtime   : runtime ? +runtime.split(' ').at(0) : 'N/A',
			imdbRating: +imdbRating,
			poster,
			title,
			imdbID    : id,
			year,
			userRating
		};
		
		onAddWatched(newWatchedMovie);
		onCloseMovie();
	};
	
	useEffect(() => {
		const getMovieDetails = async function () {
			setIsLoading(true);
			const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&i=${id}`);
			const data = await res.json();
			setMovie(data);
			setIsLoading(false);
		};
		
		getMovieDetails();
	}, [id]);
	
	useEffect(() => {
		if (!title) return;
		document.title = `Movie | ${title}`;
		
		return () => document.title = 'usePopcorn';
	}, [title]);
	
	return <div className="details">
		{isLoading ? <Loader /> : <>
			<header>
				<button className="btn-back" onClick={onCloseMovie}>&larr;</button>
				<img src={poster} alt={`Poster for movie ${title}`} />
				<div className="details-overview">
					<h2>{title}</h2>
					<p>{released} &bull; {runtime}</p>
					<p>{genre}</p>
					<p><span>⭐</span>{imdbRating} IMDB rating</p>
				</div>
			</header>
			
			<section>
				<div className="rating">
					{isWatched ? <p>You rated this movie {watched[watchedIndex].userRating}<span>⭐</span></p>
										 :
					 <>
						 <StarRating maxRating={10} onSetRating={handleRating} />
						 {userRating > 0 && <button className="btn-add" onClick={addWatchedMovie}>+ Add to
																																											list</button>}
					 </>
					}
				</div>
				<p>
					<em>{plot}</em>
				</p>
				<p>Starring: {actors}</p>
				<p>Directed by: {director}</p>
			</section>
		</>
		}
	</div>;
}
