import { expect } from 'chai';
// const expect = chai.expect;
import Destination from '../src/destination';
import destinationData from '../data/Destination-data';

describe('Destination', () => {
    let destination1;
    let destinationInfo1;
    let destination2;
    let destinationInfo2;

    beforeEach(() => {
        destination1 = destinationData[0]
        destinationInfo1 = new Destination(destination1)
        destination2 = destinationData[1]
        destinationInfo2 = new Destination(destination2)
    });

    it('should be a function', () => {
        expect(Destination).to.be.a('function');
    });

    it('should have an id', () => {
        expect(destination1.id).to.equal(1)
        expect(destination2.id).to.equal(2)
    })

    it('should have a name', () => {
        expect(destination1.destination).to.equal('Lima, Peru');
        expect(destination2.destination).to.equal('Stockholm, Sweden');
    })

    it('should have an estimated lodging cost per day', () => {
        expect(destination1.estimatedLodgingCostPerDay).to.equal(70);
        expect(destination2.estimatedLodgingCostPerDay).to.equal(100);
  })

  it('should have an estimated flight cost per person', () => {
    expect(destination1.estimatedFlightCostPerPerson).to.equal(400);
    expect(destination2.estimatedFlightCostPerPerson).to.equal(780);
  })

  it('should have an image', () => {
    expect(destination1.image).to.equal('https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80')
    expect(destination2.image).to.equal('https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80')
})

  it('should have an alt tag, or a default if there isnt one', () => {
    expect(destination1.alt).to.equal("overview of city buildings with a clear sky")
    expect(destination2.alt).to.equal("city with boats on the water during the day time")
  })

})

