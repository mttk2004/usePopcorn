import React    from 'react';
import ReactDOM from 'react-dom/client';
import App      from './components/App.jsx';
// import './index.css';
import StarRating from './components/StarRating.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
		<React.StrictMode>
			{/*<App />*/}
			<StarRating/>
		</React.StrictMode>,
);