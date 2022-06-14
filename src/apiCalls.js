// let errorMessage = 

const fetchApiData = (url) => {
	return fetch(`http://localhost:3001/api/v1/${url}`).then((promise) =>
	// console.log(promise)
	promise.json()
	);
};


const postApiData = (newTrip) => {
	console.log(newTrip, "LABELLL12")
	return fetch(`http://localhost:3001/api/v1/trips`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(newTrip),
	})
		.then((response) => {
		if (!response.ok) {
		// console.log('Please fill in all inputs and try again.') {
			return errorMessage.innerText = 'Please fill in all inputs and try again.'
		} else {
			return response.json()
		}
	})
		.catch((error) => {
			console.log("error")
			// if (error.errorMessage === 'Failed to fetch') {
			// 	errorMessage.innerText = 'Failed to fetch, start your server, please!';
			// } else {
			// 	errorMessage.innerText = errorMessage;
			// }
		});

};
	
// const functionForError = (response) => {
// 	if (!response.ok) {
// 		console.log('Please fill in all inputs and try again.')
// 		// return errorMessage.innerText = 'Please fill in all inputs and try again.'
// 	} else {
// 		return response.json()
// 	}

export { fetchApiData, postApiData };
