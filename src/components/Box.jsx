/*
 *  Project: usepopcorn
 *  File: Box.jsx
 *  Created: 2:36 CH, 28/07/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */

import { useState } from 'react';


export default function Box({ children }) {
	const [isOpen, setIsOpen] = useState(true);
	
	return <div className="box">
		<button
				className="btn-toggle"
				onClick={() => setIsOpen((open) => !open)}
		>
			{isOpen ? '–' : '+'}
		</button>
		{isOpen && children}
	</div>;
}
