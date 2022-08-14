import React from 'react';
import { useSelector } from 'react-redux';
import { Bord } from './components/bord';
import { Modal } from './components/modal/modal';

//styles
import './scss/index.scss';

function App() {
	// const { openModal } = useSelector((r: R) => r.reducerModal);
	return (
		<>
			<div className='app'>
				<Bord />
			</div>
		</>
	);
}

export default App;
