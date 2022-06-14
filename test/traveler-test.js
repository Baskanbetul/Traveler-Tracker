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
	let destination1;
	let destination2;
	let trip1;
	let trip2;

	beforeEach(() => {
		destination1 = new Destination(destinationData[0]);
		destination2 = new Destination(destinationData[1]);
		traveler1 = new Traveler(travelerData[0]);
		traveler2 = new Traveler(travelerData[1]);
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
        expect(traveler2.trips.length).to.equal(5)
	});

    it('should get past trip data', () => {
      traveler1.addMatchingTrips(tripData, destinationData);
      traveler1.getPastTrips('2022/06/11');
      expect(traveler1.pastTrips.length).to.equal(2);	
      
      traveler2.addMatchingTrips(tripData, destinationData);
      traveler2.getPastTrips('2022/06/11');
      expect(traveler2.pastTrips.length).to.equal(2);
	});

	it.only('should get upcoming trip data', () => {
        traveler1.addMatchingTrips(tripData, destinationData);
        traveler1.getUpcomingTrips()
		let userTrip = trip1.getUserTripData(1);
		let upcomingTrips = trip1.getUpcomingTrips(userTrip, '2022/06/11');

		expect(upcomingTrips).to.deep.equal([
			{
				id: 1,
				userID: 1,
				destinationID: 1,
				travelers: 1,
				date: '2022/06/12',
				duration: 8,
				status: 'approved',
				suggestedActivities: [],
			},
			{
				id: 2,
				userID: 1,
				destinationID: 2,
				travelers: 5,
				date: '2022/10/04',
				duration: 18,
				status: 'approved',
				suggestedActivities: [],
			},
			{
				id: 6,
				userID: 2,
				destinationID: 6,
				travelers: 3,
				date: '2022/06/29',
				duration: 9,
				status: 'approved',
				suggestedActivities: [],
			},
			{
				id: 7,
				userID: 2,
				destinationID: 7,
				travelers: 5,
				date: '2022/5/28',
				duration: 20,
				status: 'approved',
				suggestedActivities: [],
			},
			{
				id: 9,
				userID: 2,
				destinationID: 9,
				travelers: 5,
				date: '2022/12/19',
				duration: 19,
				status: 'approved',
				suggestedActivities: [],
			},
			{
				id: 10,
				userID: 3,
				destinationID: 11,
				travelers: 6,
				date: '2022/07/23',
				duration: 17,
				status: 'approved',
				suggestedActivities: [],
			},
		]);
	});

	it.skip('should get pending trip data', () => {
		let userTrip = trip1.getUserTripData(1);
		let pendingTrips = trip1.getPendingTrips(userTrip);

		expect(pendingTrips).to.deep.equal([
			{
				id: 71,
				userID: 38,
				destinationID: 28,
				travelers: 1,
				date: '2020/05/26',
				duration: 11,
				status: 'pending',
				suggestedActivities: [],
			},
		]);
	});

	it.skip('should get present trip data', () => {
		let userTrip = trip1.getUserTripData(1);
		let presentTrips = trip1.getPresentTrips(userTrip);

		expect(presentTrips).to.deep.equal([
			{
				id: 1,
				userID: 1,
				destinationID: 1,
				travelers: 1,
				date: '2022/06/12',
				duration: 8,
				status: 'approved',
				suggestedActivities: [],
			},
		]);
	});
});
// })
