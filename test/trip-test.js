// import chai from 'chai';
// // const expect = chai.expect;
// import Trip from '../src/trip';
// import tripData from '../data/Trip-data';

// describe('Trip', () => {
// 	let trip1;
// 	let trip2;

// 	beforeEach(() => {
// 		trip1 = new Trip(tripData[0]);
// 		trip2 = new Trip(tripData[1]);
// 	});

// 	it('should be a function', () => {
// 		expect(Trip).to.be.a('function');
// 	});

// 	it('should have an id', () => {
// 		expect(trip1.id).to.equal(1);
// 		expect(trip2.id).to.equal(2);
// 	});

// 	it('should have an user id', () => {
// 		expect(trip1.userID).to.equal(44);
// 		expect(trip2.userID).to.equal(35);
// 	});

// 	it('should have a destination id', () => {
// 		expect(trip1.destinationID).to.equal(49);
// 		expect(trip2.destinationID).to.equal(25);
// 	});

// 	it('should have count of traveleres', () => {
// 		expect(trip1.travelers).to.equal(1);
// 		expect(trip2.travelers).to.equal(5);
// 	});

// 	it('should have a start date', () => {
// 		expect(trip1.date).to.equal('2022/09/16');
// 		expect(trip2.date).to.equal('2022/10/04');
// 	});

// 	it('should have duration', () => {
// 		expect(trip1.duration).to.equal(8);
// 		expect(trip2.duration).to.equal(18);
// 	});

// 	it('should have a status', () => {
// 		expect(trip1.status).to.equal('approved');
// 		expect(trip2.status).to.equal('approved');
// 	});

// 	it('should start out without suggested activities', () => {
// 		expect(trip1.suggestedActivities).to.equal([]);
// 		expect(trip2.suggestedActivities).to.equal([]);
// 	});
// });
