import { expect } from 'chai';
// const expect = chai.expect;
import Destination from '../src/destination';
import destinationData from '../data/Destination-data';
import Traveler from '../src/traveler';
import travelerData from '../data/Traveler-data';

describe('Traveler', () => {
    let traveler1; //2 tane let veriyoruz ki testincalistiginda n macth oldugundan emin olalim 
    let traveler2;
    let destination1;
    let destination2;

    beforeEach(() => {
        destination1 = new Destination(destinationData[0])
        destination2 = new Destination(destinationData[1])
        traveler1 = new Traveler(travelerData[0])
        traveler2 = new Traveler(travelerData[1])

    });

    it('should be a function', () => {
        expect(Traveler).to.be.a('function');
    });

    it('should have an id', () => {
        expect(traveler1.id).to.equal(1)
        expect(traveler2.id).to.equal(2)
    })

    it('should have a name', () => {
        expect(traveler1.name).to.equal('Ham Leadbeater');
        expect(traveler2.name).to.equal('Rachael Vaughten');
    })

     it('should have traveler type', () => {
        expect(traveler1.travelerType).to.equal('relaxer');
        expect(traveler2.travelerType).to.equal('thrill-seeker');
    })

     it('should have all of past, present, upcoming and pending trips', () => {
        expect(traveler1.trips).to.deep.equal([]);

        addMatchingTrips(newTrip); 
        addMatchingTrips(newTrip); 
        
        expect(traveler2.trips).to.deep.equal();
    })
})