/**
 *  Project: usepopcorn
 *  File: ErrorMessage.jsx
 *  Created: 7:22 CH, 03/08/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */


export default function ErrorMessage({ message }) {
	return <p className="error">
		<span>⚠️</span>
		{message}
	</p>;
}
