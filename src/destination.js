class Destination {
    constructor(destinationInfo) {
        this.id = destinationInfo.id,
        this.name = destinationInfo.destination,
        this.lodging = destinationInfo.estimatedLodgingCostPerDay,
        this.flights = destinationInfo.estimatedFlightCostPerPerson,
        this.image = destinationInfo.image,
        this.alt = destinationInfo.alt  || "city with boats on the water during the day time"
    }
}

export default Destination;