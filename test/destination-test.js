import { expect } from 'chai';
// const expect = chai.expect;
import Destination from '../src/destination';
import destinationData from '../data/Destination-data';
import tripData from '../data/Trip-data';
import travelerData from '../data/Traveler-data';
import Traveler from '../src/traveler';

describe('Destination', () => {
  let destination;
	let tripDatas;
	let traveler1;
	let traveler2;
  let userTripData;

    // let destination1;
    // let destinationInfo1;
    // let destination2;
    // let destinationInfo2;

    beforeEach(() => {
      destination = new Destination(destinationData);
			tripDatas = tripData
			traveler1 = new Traveler(travelerData[0]);
    	traveler2 = new Traveler(travelerData[1]);
      userTripData = [
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
					id: 3,
					userID: 1,
					destinationID: 3,
					travelers: 4,
					date: '2022/05/22',
					duration: 17,
					status: 'approved',
					suggestedActivities: [],
				},
			];
        // destination1 = destinationData[0]
        // destinationInfo1 = new Destination(destination1)
        // destination2 = destinationData[1]
        // destinationInfo2 = new Destination(destination2)
    });

    it('should be a function', () => {
        expect(Destination).to.be.a('function');
    });

      it('should be an instance of Destination', () => {
				expect(destination).to.be.instanceOf(Destination);
			});

      it('should have a property containing all destinations', () => {
      expect(destination.data).to.deep.equal(destinationData);
  });

    it('should be able to calculate trip expenses per a year', () => {
      const userTrip = destination.calculateTripsExpenses(8, 1, 1); 
      expect(userTrip).to.equal(1056)
    })

	it('should be able to calculate total travel expenses ', () => {
		traveler1.addMatchingTrips(tripData, destinationData);
			const expenseForYearlyTrip = destination.calculateTotalTravelExpenses(traveler1.trips);
			expect(expenseForYearlyTrip).to.equal(15422.00);
		});
  })

    








//     it('should have an id', () => {
//         expect(destination1.id).to.equal(1)
//         expect(destination2.id).to.equal(2)
//     })

//     it('should have a name', () => {
//         expect(destination1.destination).to.equal('Lima, Peru');
//         expect(destination2.destination).to.equal('Stockholm, Sweden');
//     })

//     it('should have an estimated lodging cost per day', () => {
//         expect(destination1.estimatedLodgingCostPerDay).to.equal(70);
//         expect(destination2.estimatedLodgingCostPerDay).to.equal(100);
//   })

//   it('should have an estimated flight cost per person', () => {
//     expect(destination1.estimatedFlightCostPerPerson).to.equal(400);
//     expect(destination2.estimatedFlightCostPerPerson).to.equal(780);
//   })

//   it('should have an image', () => {
//     expect(destination1.image).to.equal('https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80')
//     expect(destination2.image).to.equal('https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80')
// })

//   it('should have an alt tag, or a default if there isnt one', () => {
//     expect(destination1.alt).to.equal("overview of city buildings with a clear sky")
//     expect(destination2.alt).to.equal("city with boats on the water during the day time")
//   })
