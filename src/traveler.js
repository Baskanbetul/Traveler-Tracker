class Traveler {
    constructor(traveler) {
        this.id = traveler.id
        this.name = traveler.name
        this.travelerType = traveler.travelerType
        this.trips = []
    }
    addMatchingTrips(trip) {
        if (this.id === trip.userID) {
            this.trips.push(trip)
        }
    }
}