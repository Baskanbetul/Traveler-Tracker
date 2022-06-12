class Trip {
	constructor(tripData) {
		this.data = tripData;
		// this.id = tripInfo.id,
		// this.userID = tripInfo.userID,
		// this.destinationID = tripInfo.destinationID,
		// this.travelers = tripInfo.travelers,
		// this.date = tripInfo.date,
		// this.duration = tripInfo.duration,
		// this.status = tripInfo.status,
		// this.suggestedActivities = tripInfo.suggestedActivities
	}

	getUserTripData(userId) {
		let getUserId = this.data.filter((trip) => {
			return trip.userID === userId;
		});
		return getUserId;
	}

	getPastTrips(userTripData, currentDay) {
		let pastTrips = this.data.filter(trip => {
			if (trip.date < currentDay) {
				return trip;
			}
		});
		// console.log(pastTrips)
		return pastTrips;
	}

	getUpcomingTrips(userTripData, currentDay) {
		let upcomingTrips = this.data.filter(trip => {
			if (trip.date > currentDay) {
				return trip;
			}
		});
		return upcomingTrips;
	}
    
    getPendingTrips(userTripData) {
        let pendingTrips = this.data.filter(trip => {
            if (trip.status === "pending") {
                return trip
            }
        })
        return pendingTrips
    }

// function formatDatesList(daylist) {
//   let formattedDaylist = daylist.map(day => {
//     var dd = String(day.getDate()).padStart(2, '0');
//     var mm = String(day.getMonth() + 1).padStart(2, '0');
//     var yyyy = day.getFullYear();
//     return day = yyyy + '/' + mm + '/' + dd;
//   })
//     return formattedDaylist
// }

	formatDate(day) {
    var dd = String(day.getDate()).padStart(2, '0');
    var mm = String(day.getMonth() + 1).padStart(2, '0');
    var yyyy = day.getFullYear();
    var formattedDay = yyyy + '/' + mm + '/' + dd;
    return formattedDay;
}

    getPresentTrips() {
        let date = new Date()
		let formattedDay = this.formatDate(date)
        // const dates = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
        let presentTrips = this.data.filter(trip => {
            if (trip.date === formattedDay) {
                return trip
            }
        })
        return presentTrips

    }









}

export default Trip;