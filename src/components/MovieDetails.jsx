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


export default function MovieDetails({ id, onCloseMovie }) {
	const [movie, setMovie] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	
	const {
					Title   : title,
					Poster  : poster,
					Plot    : plot,
					Runtime : runtime,
					Genre   : genre,
					Director: director,
					Actors  : actors,
					Released: released,
					imdbRating
				} = movie || {};
	
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
					<StarRating maxRating={10} />
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