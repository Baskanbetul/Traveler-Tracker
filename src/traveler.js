import destinationData from "../data/Destination-data";

class Traveler {
	constructor(traveler) {
		this.id = traveler.id;
		this.name = traveler.name;
		this.travelerType = traveler.travelerType;
		this.trips = []; //grab one array for all trip, can push it
	}
	addMatchingTrips(newTrip) {
		// newTrip can be any of past, present, upcoming and pending
		if (this.id === newTrip.userID && !this.trips.includes(newTrip.id)) {
			this.trips.push(newTrip);
		}
	}
	//calculate total amount whole amount
	//butun tripler trip arrayde oradan alip calculate yapmak lazim
	//yil boyunca triplere ne kadar harcadim
	//(estimatedLodgingCostPerDay: 100) + (estimatedFlightCostPerPerson: 780, * person count)tipdata travelers
	// if detination.id === trip id return estimatedFlightCostPerPerson * tripdata traveller 
	//calculate for all them
	calculateAllTrips() {
        // let total;
		const result = this.trips.reduce((amountAllTrip, trip) => {
			destinationData.forEach(destination => {
                if (destination.id === trip.id) {
                amountAllTrip = (destination.estimatedFlightCostPerPerson * trip.travelers) + destination.estimatedLodgingCostPerDay;
                }
            })
            // const averagePerYear =
			// 	destination.estimatedFlightCostPerPerson +
			// 	destination.estimatedLodgingCostPerDay;
			return amountAllTrip
		}, 0);
		return result;
	}
}