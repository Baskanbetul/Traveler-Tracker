class Destination {
	constructor(destinationData) {
		this.data = destinationData;
	}

	calculateTripsExpenses(duration, travelers, id) {

		let agentFee = 0;
		const userTrip = this.data.filter((destination) => destination.id === id);
		const expenseForTrip = userTrip.reduce((acc, cur) => {
			acc += cur.estimatedLodgingCostPerDay * duration;
			acc += cur.estimatedFlightCostPerPerson * travelers;
			return acc;
		}, 0);
		agentFee = expenseForTrip * 0.1;
		return expenseForTrip + agentFee;
	}

	getCurrentYear() {
		var today = new Date();
		var yyyy = today.getFullYear();
		return yyyy;
	}

	calculateTotalTravelExpenses(tripData) {
		let agentFee = 1.1;
		const currentYear = this.getCurrentYear();
		const expenseForYearlyTrip = tripData.reduce((totalPrice, trip) => {
			let getdestinations = this.data.forEach((destination) => {
				if (destination.id === trip.destinationID && trip.date.includes(currentYear)) {
					totalPrice += destination.estimatedLodgingCostPerDay * trip.duration;
					totalPrice += destination.estimatedFlightCostPerPerson * trip.travelers;
				}
			});
			return Number((totalPrice * agentFee).toFixed(2));
		}, 0);
		return expenseForYearlyTrip;
	}
}

export default Destination;
