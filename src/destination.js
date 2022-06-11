class Destination {
    constructor(destinationInfo) {
        this.id = destinationInfo.id,
        this.name = destinationInfo.name,
        this.lodging = destinationInfo.estimatedLodgingCostPerDay,
        this.flights = destinationInfo.estimatedFlightCostPerPerson,
        this.image = destinationInfo.image,
        this.alt = destinationInfo.alt // || buraya belki 2. bir secenek koyabiliriz 
    }
}

export default Destination;