import { expect } from 'chai';
// const expect = chai.expect;
import Destination from '../src/destination';
import destinationData from '../data/Destination-data';
import Traveler from '../src/traveler';
import travelerData from '../data/Traveler-data';
import Trip from '../src/trip';
import tripData from '../data/Trip-data';

describe('Traveler', () => {
	let traveler1; //2 tane let veriyoruz ki testincalistiginda n macth oldugundan emin olalim
  let traveler2;
  let traveler38;
	let destination1;
	let destination2;
	let trip1;
	let trip2;

	beforeEach(() => {
		destination1 = new Destination(destinationData[0]);
		destination2 = new Destination(destinationData[1]);
		traveler1 = new Traveler(travelerData[0]);
    traveler2 = new Traveler(travelerData[1]);
    traveler38 = new Traveler(travelerData[10])
		trip1 = new Trip(tripData[0]);
		trip2 = new Trip(tripData[1]);
	});

	it('should be a function', () => {
		expect(Traveler).to.be.a('function');
	});

	it('should have an id', () => {
		expect(traveler1.id).to.equal(1);
		expect(traveler2.id).to.equal(2);
	});

	it('should have a name', () => {
		expect(traveler1.name).to.equal('Ham Leadbeater');
		expect(traveler2.name).to.equal('Rachael Vaughten');
	});

	it('should have traveler type', () => {
		expect(traveler1.travelerType).to.equal('relaxer');
		expect(traveler2.travelerType).to.equal('thrill-seeker');
	});

	it('should have all of past, present, upcoming and pending trips', () => {
		expect(traveler1.trips).to.deep.equal([]);
		expect(traveler2.trips).to.deep.equal([]);
	});

	it('should add trips to travelers trip', () => {
		traveler1.addMatchingTrips(tripData, destinationData);
    expect(traveler1.trips.length).to.equal(4);
    
    traveler2.addMatchingTrips(tripData, destinationData);
    expect(traveler2.trips.length).to.equal(5);

    traveler38.addMatchingTrips(tripData, destinationData);
    expect(traveler38.trips.length).to.equal(1);
	});

  it('should get past trip data', () => {
    traveler1.addMatchingTrips(tripData, destinationData);
    traveler1.getPastTrips();
    expect(traveler1.pastTrips.length).to.equal(2);	
    
    traveler2.addMatchingTrips(tripData, destinationData);
    traveler2.getPastTrips();
    expect(traveler2.pastTrips.length).to.equal(2);

    traveler38.addMatchingTrips(tripData, destinationData);
    traveler38.getPastTrips();
    expect(traveler38.pastTrips.length).to.equal(1);
	});

	it('should get upcoming trip data', () => {
    traveler1.addMatchingTrips(tripData, destinationData);
    traveler1.getUpcomingTrips();
    expect(traveler1.upcomingTrips.length).to.equal(1);

    traveler2.addMatchingTrips(tripData, destinationData);
    traveler2.getUpcomingTrips();
    expect(traveler2.upcomingTrips.length).to.equal(3);

    traveler38.addMatchingTrips(tripData, destinationData);
    traveler38.getUpcomingTrips();
    expect(traveler38.upcomingTrips.length).to.equal(0);
	});

	it('should get pending trip data', () => {
		traveler1.addMatchingTrips(tripData, destinationData);
		traveler1.getPendingTrips();
    expect(traveler1.pendingTrips.length).to.equal(0);
    
    traveler2.addMatchingTrips(tripData, destinationData);
    traveler2.getPendingTrips();
    expect(traveler2.pendingTrips.length).to.equal(0);

    traveler38.addMatchingTrips(tripData, destinationData);
    traveler38.getPendingTrips();
    expect(traveler38.pendingTrips.length).to.equal(1);
	});

	it('should get present trip data', () => {
		traveler1.addMatchingTrips(tripData, destinationData);
		traveler1.getPresentTrips();
    expect(traveler1.presentTrips.length).to.equal(1);
    
    traveler2.addMatchingTrips(tripData, destinationData);
    traveler2.getPresentTrips();
    expect(traveler2.presentTrips.length).to.equal(0);

    traveler38.addMatchingTrips(tripData, destinationData);
    traveler38.getPresentTrips();
    expect(traveler38.presentTrips.length).to.equal(0);
	});
});
