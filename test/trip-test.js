import chai from 'chai';
const expect = chai.expect;
import Trip from '../src/trip';
import tripData from '../data/Trip-data';
import Destination from '../src/destination';
import destinationData from '../data/Destination-data';

describe('Trip', () => {
	let trip1;
	let trip2;

	beforeEach(() => {
		trip1 = new Trip(tripData);
	});

	it('should be a function', () => {
		expect(Trip).to.be.a('function');
	});

	it('should get user trip data baed on traveler\'s id', () => {
		let userTrip = trip1.getUserTripData(3);

		expect(userTrip).to.deep.equal([
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
		])
	});

		it('should get past trip data', () => {
		let userTrip = trip1.getUserTripData(1);
		let pastTrips = trip1.getPastTrips(userTrip,'2022/06/11');


		expect(pastTrips).to.deep.equal([
			{
				id: 3,
				userID: 1,
				destinationID: 3,
				travelers: 4,
				date: '2022/05/22',
				duration: 17,
				status: 'approved',
				suggestedActivities: [],
			},
			{
				id: 4,
				userID: 1,
				destinationID: 4,
				travelers: 2,
				date: '2022/02/25',
				duration: 10,
				status: 'approved',
				suggestedActivities: [],
			},
			{
				id: 5,
				userID: 2,
				destinationID: 5,
				travelers: 3,
				date: '2022/04/30',
				duration: 18,
				status: 'approved',
				suggestedActivities: [],
			},
			{
				id: 8,
				userID: 2,
				destinationID: 8,
				travelers: 6,
				date: '2022/02/07',
				duration: 4,
				status: 'approved',
				suggestedActivities: [],
			},
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
	})
	
		it('should get upcoming trip data', () => {
		let userTrip = trip1.getUserTripData(1);
		let upcomingTrips = trip1.getUpcomingTrips(userTrip,'2022/06/11');

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
	})

	it('should get pending trip data', () => {
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
	})

	it('should get present trip data', () => {
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

})
})
