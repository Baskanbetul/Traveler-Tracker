let networkError = document.getElementById('networkError');


const fetchApiData = (url) => {
	return fetch(`http://localhost:3001/api/v1/${url}`)
		// .then((promise) => {
		// 	if (!promise.ok) {
		// 		networkError.innerHTML = 'Network error, Please try again!';
		// 	} else {
		// 		return promise.json()
		// 	}
		// })
		.then(promise => promise.json())
		.catch(error => {
			networkError.innerHTML = 'Network error, Please try again!';
			return error
		})
};

const postApiData = (newTrip) => {
	return fetch(`http://localhost:3001/api/v1/trips`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(newTrip),
	})
	// 	.then((response) => {
	// 	if (!response.ok) {
	// 		networkError.innerHTML = 'Network error, Please try again!';
	// 	} else {
	// 		return response.json()
	// 	}
	// })
	// 	.catch((error) => {
	// 		console.log(error)
	// 		return error
	// 	});
	.then(response => response.json())
		.catch(error => {
			networkError.innerHTML = 'Network error, Please try again!';
			return error
		})

};

export { fetchApiData, postApiData };