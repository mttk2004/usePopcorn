/*
 *  Project: usepopcorn
 *  File: StarRating.jsx
 *  Created: 2:54 CH, 28/07/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */

import { useState } from 'react';
import PropTypes    from 'prop-types';


const containerStyle = {
	display   : 'flex',
	alignItems: 'center',
	gap       : '16px',
};

const starsContainerStyle = {
	display: 'flex',
	gap    : '0'
};

export default function StarRating({
																		 maxRating = 5,
																		 color = '#fff100',
																		 size = 24,
																		 className = '',
																		 messages = [],
																		 onSetRating
																	 })
{
	// Display stars by tempRating, set rating when clicked, when mouse enter set tempRating to rating
	const [rating, setRating] = useState(0);
	const [tempRating, setTempRating] = useState(0);
	
	const handleRating = function (rating) {
		setRating(rating);
		onSetRating && onSetRating(rating);
	};
	
	const handleMouseEnter = function (value) {
		setTempRating(value);
	};
	
	const handleMouseLeave = function () {
		setTempRating(rating);
	};
	
	const textStyle = {
		margin    : '0',
		lineHeight: '1',
		color,
		fontSize  : size * .8,
		fontWeight: 700
	};
	
	return <div style={containerStyle} {...(className && { className: className })} >
		<div style={starsContainerStyle}>
			{Array.from({ length: maxRating },
									(_, i) => <Star
											key={i} onRate={() => handleRating(i + 1)}
											onHoverIn={() => handleMouseEnter(i + 1)}
											onHoverOut={handleMouseLeave} full={i < tempRating}
											color={color} size={size}
									/>)}
		</div>
		<p style={textStyle}>{messages.length === maxRating ? messages[tempRating - 1] : tempRating
																																										 || rating
																																										 || ''}</p>
	</div>;
}

function Star({ onRate, onHoverIn, onHoverOut, full, color, size }) {
	const starStyle = {
		height: `${size}px`,
		width : `${size}px`,
		cursor: 'pointer',
	};
	
	return <span
			role="button" style={starStyle} onClick={onRate} onMouseEnter={onHoverIn}
			onMouseLeave={onHoverOut}>
		{full ? <svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill={color}
				stroke={color}
		>
			<path
					d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
			/>
		</svg> : <svg
				 xmlns="http://www.w3.org/2000/svg"
				 fill="none"
				 viewBox="0 0 24 24"
				 stroke={color}
		 >
			 <path
					 strokeLinecap="round"
					 strokeLinejoin="round"
					 strokeWidth="{2}"
					 d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
			 />
		 </svg>}
	</span>;
}

StarRating.propTypes = {
	maxRating  : PropTypes.number,
	size       : PropTypes.number,
	color      : PropTypes.string,
	className  : PropTypes.string,
	messages   : PropTypes.array,
	onSetRating: PropTypes.func,
};
