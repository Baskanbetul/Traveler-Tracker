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
	addMatchingTrips(allTrips, allDestinations) {
		let matchingDestinationTrip = [];
		allTrips.forEach((alltrip) => {
			allDestinations.forEach((allDestination) => {
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

	returnFirstName() {
		return this.name.split(' ')[0];
	}

	getPastTrips(currentDay) {
		// let userTrips = this.getUserTripData(userId);
		// console.log('TRAVELER TRIPS', this.trips)
		let pastTrips = this.trips.filter((trip) => {
			// console.log('TRIP', trip)
			// console.log('COMPARE', trip.date < currentDay);
			if (trip.date < currentDay) {
				return trip;
			}
		});
		// console.log('PAST', pastTrips);
		this.pastTrips = pastTrips;
	}
	
	getUpcomingTrips(currentDay) {
		let upcomingTrips = this.trips.filter((trip) => {
			// console.log(this.trips);
			if (trip.date > currentDay) {
				return trip;
			}
		});
		this.upcomingTrips = upcomingTrips;
		// console.log(this.upcomingTrips);
	}

	getPendingTrips(userTripData) {
		let pendingTrips = this.trips.filter((trip) => {
			if (trip.status === 'pending') {
				return trip;
			}
		});
		return pendingTrips;
	}
	formatDate(day) {
		var dd = String(day.getDate()).padStart(2, '0');
		var mm = String(day.getMonth() + 1).padStart(2, '0');
		var yyyy = day.getFullYear();
		var formattedDay = yyyy + '/' + mm + '/' + dd;
		return formattedDay;
	}

	getPresentTrips() {
		let date = new Date();
		let formattedDay = this.formatDate(date);
		// const dates = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
		let presentTrips = this.trips.filter((trip) => {
			if (trip.date === formattedDay) {
				return trip;
			}
		});
		return presentTrips;
	}
}

export default Traveler;

// class Traveler {
// 	constructor(traveler) {
// 		this.id = traveler.id;
// 		this.name = traveler.name;
// 		this.travelerType = traveler.travelerType;
// 		this.trips = []; //grab one array for all trip, can push it
// 	}
// 	addMatchingTrips(newTrip) {
// 		// newTrip can be any of past, present, upcoming and pending
// 		if (this.id === newTrip.userID && !this.trips.includes(newTrip.id)) {
// 			this.trips.push(newTrip);
// 		}
// 	}
// 	//calculate total amount whole amount
// 	//butun tripler trip arrayde oradan alip calculate yapmak lazim
// 	//yil boyunca triplere ne kadar harcadim
// 	//(estimatedLodgingCostPerDay: 100) + (estimatedFlightCostPerPerson: 780, * person count)tipdata travelers
// 	// if detination.id === trip id return estimatedFlightCostPerPerson * tripdata traveller
// 	//calculate for all them
// 	calculateAllTrips() {
//         // let total;
// 		const result = this.trips.reduce((amountAllTrip, trip) => {
// 			destinationData.forEach(destination => {
//                 if (destination.id === trip.id) {
//                 amountAllTrip = (destination.estimatedFlightCostPerPerson * trip.travelers) + destination.estimatedLodgingCostPerDay;
//                 }
//             })
//             // const averagePerYear =
// 			// 	destination.estimatedFlightCostPerPerson +
// 			// 	destination.estimatedLodgingCostPerDay;
// 			return amountAllTrip
// 		}, 0);
// 		return result;
// 	}
// }
