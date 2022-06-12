function fetchApiData(url) {
	return fetch(url).then((promise) => promise.json());
};
//first finish get manipulation on dom 
// function postApiData(newTrip) {
// 	//postnew trip
// 	return fetch('http://localhost:3001/api/v1/trips', {
// 		method: 'POST',
// 		header: { 'Content-Type': 'application/json' },
// 		body: JSON.stringify(newTrip),
// 	})
// 		.then((promise) => {
// 			errorMessage.innerText = 'Ooops, try again';
// 			return functionForError(promise);
// 		})
// 		.catch((error) => {
// 			if (error.errorMessage === 'Failed to fetch') {
// 				errorMessage.innerText = 'Failed to fetch, start your server, please!';
// 			} else {
// 				errorMessage.innerText = errorMessage;
// 			}
// 		});

//         const functionForError = () => {


//         }
};

export { fetchApiData, postApiData };
