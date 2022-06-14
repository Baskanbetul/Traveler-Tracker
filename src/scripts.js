// // This is the JavaScript entry file - your code begins here
// // Do not delete or rename this file ********

// // An example of how you tell webpack to use a CSS (SCSS) file
// import './css/styles.css';

// // An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'


// console.log('This is the JavaScript entry file - your code begins here.');

import './css/styles.css';
import { fetchApiData } from './apiCalls.js';
import Traveler from '../src/traveler';
import Trip from '../src/trip';
import Destination from '../src/destination';
import travelerData from '../data/Traveler-data';
// import travelerData from '../data/Traveler-data';
// import travelerData from '../data/Traveler-data'

// ** GLOBAL VARIABLES **

let destinationData;
let travelersData;
let tripData;
let currentTraveler;
let travelerId;
let date = new Date()
let currentDay = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`


// ** QUERY SELECTORS **

let pastTripButton = document.getElementById('pastTripBtn');
let upcomingTripButton = document.getElementById('upcomingTripBtn');
let pendingTripButton = document.getElementById('pendingTripBtn');
let selectStartDate = document.getElementById('');
let selectDestination = document.getElementById('');
let selectDays = document.getElementById('');
let selectTravelers = document.getElementById('');
let clickSubmit = document.getElementById('submitFormBtn');
let estimatedCost  = document.getElementById('');


let pastTripsView = document.querySelector('.past-trips-view');
let upcomingTripsView = document.querySelector('.upcoming-trips-view');
let pendingTripsView = document.querySelector('.pending-trips-view');
let totalSpentInfo = document.querySelector('.total-spent-info');

// let trip-destination-name =
// ** FUNCTIONS **

const getRandomID = (parameter) => {
    return Math.floor(Math.random() * [parameter].length);
};

currentTraveler = getRandomID();
// console.log(currentTraveler)
//that should return random id 




// ** FETCH REQUEST **


// fetchApiData('travelers').then((value) => {
//     console.log(value.travelers)
//     travelerId = getRandomID(value.travelers)
//     travelersData = new Traveler(value.travelers[travelerId]);
// })
// // instantiate new trip 
// fetchApiData('trips').then((value) => {
// 	console.log(value.trips);
// 	tripData = new Trip(value.trips)
// });

// fetchApiData('destinations').then((value) => {
// 	console.log(value.destinations);
// 	destinationData = value;
// });

const travelerPromise = fetchApiData('travelers');
// console.log(travelerPromise)
const tripPromise = fetchApiData('trips');
const destinationPromise = fetchApiData('destinations');

Promise.all([travelerPromise,tripPromise,destinationPromise])
.then((value) => {
	travelerId = getRandomID(value[0].travelers); //that line needs to be random number to make dynamic
	travelersData = new Traveler(value[0].travelers[37]); //travelerId
	tripData = new Trip(value[1].trips)
	// console.log(value[2].destinations);
	destinationData = new Destination(value[2].destinations);
	travelersData.addMatchingTrips(tripData, destinationData);
	// console.log(travelersData.trips, "88")
	// console.log(value[1].trips);
    // console.log(value[2].destinations);
	showUserPastTrips();
	showUserUpcomingTrips();
	showUserPendingTrips();
	showTotalSpentInfo();
})

// when I click past trips 
// ilk bilgileri buraya nasil koyabilirim buton olmadan

// display function 

const showUserPastTrips = () => {
	travelersData.getPastTrips()
	travelersData.pastTrips.forEach(trip => {
		pastTripsView.innerHTML += `
		 <h5 class="trip-destination-name">Past Trips destination name: ${trip.destination.destination}</h5>
      <div class="card-box" id="tripDestinationName">
        <p class="start-date">Start date:${trip.date}</p>
        <p class="travelers">Travelers:${trip.travelers}</p>
        <p class="duration">Duration:${trip.duration}</p>
        <p class="status">Status:${trip.status}</p>
        <p class="trip-cost">Trip Cost: ${destinationData.calculateTripsExpenses(trip.duration, trip.travelers, trip.destination.id)}</p>
        <p class="cost-per-day">Cost Per Day: ${trip.destination.estimatedLodgingCostPerDay}</p>
        <p class="cost-per-traveler">Cost Per Traveler: ${trip.destination.estimatedFlightCostPerPerson}</p>
      </div>
		`;
	})

	// console.log(travelersData.pastTrips, "93")
	// travelersData.getPastTrips(currentDay);
}

const showUserUpcomingTrips = () => {
	travelersData.getUpcomingTrips()
	// console.log('UPCOMING', travelersData.upcomingTrips)
	travelersData.upcomingTrips.forEach(trip => {
		upcomingTripsView.innerHTML += `
		<h5 class="trip-destination-name">Upcoming Trips destination name: ${trip.destination.destination}</h5>
        <div class="card-box" id="tripDestinationName">
          <p class="trip-details">Trip Details:</p>
          <p class="start-date">Start date: ${trip.date}</p>
          <p class="travelers">Travelers: ${trip.travelers}</p>
          <p class="duration">Duration: ${trip.duration}</p>
          <p class="status">Status: ${trip.status}</p>
          <p class="trip-cost">Trip Cost: ${destinationData.calculateTripsExpenses(trip.duration, trip.travelers, trip.destination.id)}</p>
          <p class="cost-per-day">Cost Per Day: ${trip.destination.estimatedLodgingCostPerDay}</p>
          <p class="cost-per-traveler">Cost Per Traveler: ${trip.destination.estimatedFlightCostPerPerson}</p>
        </div>
		`;
	})
	
}

const showUserPendingTrips = () => {
	travelersData.getPendingTrips();
	// console.log(travelersData, "")
	travelersData.pendingTrips.forEach((trip) => {
		// console.log(trip, "LALALAALALA")
		pendingTripsView.innerHTML += `
		 <h5 class="trip-destination-name">Pending Trips destination name:${trip.destination.destination} </h5>
          <div class="card-box" id="tripDestinationName">
            <p class="trip-details">Trip Details:</p>
            <p class="start-date">Start date: ${trip.date}</p>
            <p class="travelers">Travelers: ${trip.travelers}</p>
            <p class="duration">Duration: ${trip.duration}</p>
            <p class="status">Status: ${trip.status}</p>
            <p class="trip-cost">Trip Cost: ${destinationData.calculateTripsExpenses(trip.duration, trip.travelers, trip.destination.id)}</p>
            <p class="cost-per-day">Cost Per Day: ${trip.destination.estimatedLodgingCostPerDay}</p>
            <p class="cost-per-traveler">Cost Per Traveler: ${trip.destination.estimatedFlightCostPerPerson}</p>
          </div>
		`;
	});
}

const showTotalSpentInfo = () => {
	// console.log('>>>>>>.', travelersData.trips)
	let amountSpent = destinationData.calculateTotalTravelExpenses(travelersData.trips);
	totalSpentInfo.innerHTML = `This year you had spent a total of: $ ${amountSpent}`
}