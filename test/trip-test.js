import chai from 'chai';
const expect = chai.expect;
import Trip from '../src/trip';
import tripData from '../data/Trip-data';
import Destination from '../src/destination';
import destinationData from '../data/Destination-data';

describe('Trip', () => {
	let trips;

	beforeEach(() => {
		trips = new Trip(tripData);
	});

	it('should be a function', () => {
		expect(Trip).to.be.a('function');
	});

	it('should store all trip data', () => {
		expect(trips.data).to.equal(tripData)
	})
})

	// it('should get user trip data based on traveler\'s id', () => {
	// 	let userTrip = trip1.getUserTripData(3);

	// 	expect(userTrip).to.deep.equal([
	// 		{
	// 			id: 10,
	// 			userID: 3,
	// 			destinationID: 11,
	// 			travelers: 6,
	// 			date: '2022/07/23',
	// 			duration: 17,
	// 			status: 'approved',
	// 			suggestedActivities: [],
	// 		},
	// 	])
	// });
