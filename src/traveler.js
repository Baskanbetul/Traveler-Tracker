import destinationData from "../data/Destination-data";

import tripData from "../data/Trip-data";

class Traveler {
	constructor(traveler) {
		this.id = traveler.id;
		this.name = traveler.name;
		this.travelerType = traveler.travelerType;
		this.trips = [];
		this.pastTrips = [];
		this.upcomingTrips = [];
		this.pendingTrips = [];
	}
	// TURN ON WHEN YOU RUN NPM START!!!

	addMatchingTrips(allTrips, allDestinations) {
		let matchingDestinationTrip = [];
		allTrips.data.forEach((alltrip) => {
			allDestinations.data.forEach((allDestination) => {
				if (alltrip.destinationID === allDestination.id) {
					alltrip.destination = allDestination;
					matchingDestinationTrip.push(alltrip);
				}
			});
		});
		matchingDestinationTrip.forEach((trip) => {
			if (this.id === trip.userID) {
				this.trips.push(trip);
			}
		});
	}

	// addMatchingTrips(allTrips, allDestinations) {
	// 	let matchingDestinationTrip = [];
	// 	allTrips.forEach((alltrip) => {
	// 		allDestinations.forEach((allDestination) => {
	// 			if (alltrip.destinationID === allDestination.id) {
	// 				alltrip.destination = allDestination;
	// 				matchingDestinationTrip.push(alltrip);
	// 			}
	// 		});
	// 	});
	// 	matchingDestinationTrip.forEach((trip) => {
	// 		if (this.id === trip.userID) {
	// 			this.trips.push(trip);
	// 		}
	// 	});
	// }

	returnFirstName() {
		return this.name.split(' ')[0];
	}

	formatDate(day) {
		var dd = String(day.getDate()).padStart(2, '0');
		var mm = String(day.getMonth() + 1).padStart(2, '0');
		var yyyy = day.getFullYear();
		var formattedDay = yyyy + '/' + mm + '/' + dd;
		return formattedDay;
	}

	getPastTrips() {
		let date = new Date();
		let currentDay = this.formatDate(date);
		let pastTrips = this.trips.filter((trip) => {
			if (trip.date < currentDay) {
				return trip;
			}
		});
		this.pastTrips = pastTrips;
	}
	
	
	getUpcomingTrips() {
		let date = new Date();
		let currentDay = this.formatDate(date).split("/");
		let upcomingTrips = this.trips.filter((trip) => {
			let splitDate = trip.date.split("/");
			if ((splitDate[0] >= currentDay[0] && splitDate[1] > currentDay[1]) || (splitDate[0] >= currentDay[0] && splitDate[1] === currentDay[1] && splitDate[2] > currentDay[2])) {
				return trip;
			}
		});
		this.upcomingTrips = upcomingTrips;
	}

	getPendingTrips() {
		let pendingTrips = this.trips.filter((trip) => {
			if (trip.status === 'pending') {
				return trip;
			}
		});
		this.pendingTrips = pendingTrips
		console.log('TRAV PEND', pendingTrips)
		return pendingTrips;
	}
	
	getPresentTrips() {
		let date = new Date();
		let formattedDay = this.formatDate(date);
	
		let presentTrips = this.trips.filter((trip) => {
			if (trip.date === formattedDay) {
				return trip;
			}
		});
		this.presentTrips = presentTrips
		return presentTrips;
	}
}

export default Traveler;

