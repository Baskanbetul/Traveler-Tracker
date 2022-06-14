const fetchApiData = (url) => {
	return fetch(`http://localhost:3001/api/v1/${url}`).then((promise) =>
		promise.json()
	);
};

const postApiData = (newTrip) => {
	return fetch(`http://localhost:3001/api/v1/trips`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(newTrip),
	})
		.then((response) => {
			// errorMessage.innerText = 'Ooops, try again';
			return functionForError(response);
		})
		.catch((error) => {
			console.log(error)
			// if (error.errorMessage === 'Failed to fetch') {
			// 	errorMessage.innerText = 'Failed to fetch, start your server, please!';
			// } else {
			// 	errorMessage.innerText = errorMessage;
			// }
		});

};
	
const functionForError = (response) => {
	if (!response.ok) {
		console.log('Please fill in all inputs and try again.')
		// return errorMessage.innerText = 'Please fill in all inputs and try again.'
	} else {
		return response.json()
	}

};

export { fetchApiData, postApiData };
