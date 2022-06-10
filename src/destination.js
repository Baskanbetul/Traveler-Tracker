class Destination {
    constructor(destinationInfo) {
        this.id = destinationInfo.id,
        this.destination = destinationInfo.destination,
        this.estimatedLodgingCostPerDay = destinationInfo.estimatedLodgingCostPerDay,
        this.estimatedFlightCostPerPerson = destinationInfo.estimatedFlightCostPerPerson,
        this.image = destinationInfo.image,
        this.alt = destinationInfo.alt // || buraya belki 2. bir secenek koyabiliriz 
    }
}

export default Destination;