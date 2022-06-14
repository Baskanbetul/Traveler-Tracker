function fetchApiData(url) {
	return fetch(`http://localhost:3001/api/v1/${url}`).then((promise) =>
		promise.json()
	);
};



// const apiDatas = ['http://localhost:3001/api/v1/travelers',
//     'http://localhost:3001/api/v1/trips',
//     'http://localhost:3001/api/v1/destinations']

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
// };

export { fetchApiData};
