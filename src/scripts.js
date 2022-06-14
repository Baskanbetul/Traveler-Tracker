// // This is the JavaScript entry file - your code begins here
// // Do not delete or rename this file ********

// // An example of how you tell webpack to use a CSS (SCSS) file
// import './css/styles.css';

// // An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'


// console.log('This is the JavaScript entry file - your code begins here.');

import './css/styles.css';
import { fetchApiData, postApiData } from './apiCalls.js';
import Traveler from '../src/traveler';
import Trip from '../src/trip';
import Destination from '../src/destination';
// import travelerData from '../data/Traveler-data';
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

let clickSubmitButton = document.getElementById('submitFormBtn');
let planningDate = document.getElementById('planningDate');
let selectDestination = document.getElementById('destinationDropdown');
let selectTravelers = document.getElementById('planningNoTravelers');
let planningNoDays = document.getElementById('planningNoDays');
let estimatedCost = document.getElementById('planningCost');

let pastTripsView = document.querySelector('.past-trips-view');
let upcomingTripsView = document.querySelector('.upcoming-trips-view');
let pendingTripsView = document.querySelector('.pending-trips-view');
let totalSpentInfo = document.querySelector('.total-spent-info');
// let planningNoDays = document.querySelector('.planning-no-days');
// p;
// planning - no - travelers;
// destination - dropdown;
// let trip-destination-name =


// ** FUNCTIONS **

const getRandomID = (parameter) => {
	return Math.floor(Math.random() * [parameter].length);
};

currentTraveler = getRandomID();
// console.log(currentTraveler)
//that should return random id 

// ** FETCH REQUEST **

const travelerPromise = fetchApiData('travelers');
const tripPromise = fetchApiData('trips');
const destinationPromise = fetchApiData('destinations');

Promise.all([travelerPromise,tripPromise,destinationPromise])
.then((value) => {
	console.log(value[1], "LABELLL74")
	travelerId = getRandomID(value[0].travelers); //that line needs to be random number to make dynamic
	travelersData = new Traveler(value[0].travelers[8]); //travelerId
	console.log(travelersData)
	tripData = new Trip(value[1].trips)
	destinationData = new Destination(value[2].destinations);
	travelersData.addMatchingTrips(tripData, destinationData);
	showUserPastTrips();
	showUserUpcomingTrips();
	showUserPendingTrips();
	showTotalSpentInfo();
})

// ** POST REQUEST **

const planATrip = (event) => {
	event.preventDefault();
	let tripDestination = selectDestination.value //destination input value
	let matchingDestination = destinationData.data.find(destination => {
		if (destination.destination === tripDestination) {
			return destination
		}
	})
	let matchingTrip = tripData.data.find(trip => {
		if (trip.destinationID === matchingDestination.id) {
			return trip
		}
	})
	let newTrip = {
		id: tripData.data.length + 1,
		userID: matchingTrip.userID,
		destinationID: matchingTrip.destinationID,
		// destinationID: Date.now(),
		travelers: Number(selectTravelers.value),
		date: planningDate.value.split('-').join('/'),
		duration: Number(planningNoDays.value),
		status: `pending`,
		suggestedActivities: [],
	};
	console.log('NEW TRIP', newTrip)
	getEstimatedCost(newTrip.duration, newTrip.travelers, newTrip.destinationID);
	postApiData(newTrip).then(response => {
		console.log('RESPONSE', response.newTrip)
		tripData.data.push(response.newTrip)
		travelersData.trips = []
		// travelersData.pendingTrips =[]
		travelersData.addMatchingTrips(tripData, destinationData)
		travelersData.getPendingTrips()
	});
	showUserPendingTrips();
	console.log('TRAV DAT', tripData)
}

// ** DISPLAY FUNCTIONS **

const showUserPastTrips = () => {
	travelersData.getPastTrips()
	travelersData.pastTrips.forEach(trip => {
		pastTripsView.innerHTML += `
		<img class="trip-view" src=${trip.destination.image}
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
	
	// travelersData.getPastTrips(currentDay);
}

const showUserUpcomingTrips = () => {
	travelersData.getUpcomingTrips()
	travelersData.upcomingTrips.forEach(trip => {
		upcomingTripsView.innerHTML += `
		<img class="trip-view" src=${trip.destination.image}
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
	pendingTripsView.innerHTML = " "
	travelersData.getPendingTrips();
	console.log(travelersData.pendingTrips, "22")
	travelersData.pendingTrips.forEach((trip) => {
		pendingTripsView.innerHTML += `
		<img class="trip-view" src=${trip.destination.image}>
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
	let amountSpent = destinationData.calculateTotalTravelExpenses(travelersData.trips);
	totalSpentInfo.innerHTML = `This year you had spent a total of: $ ${amountSpent}`
}

const getEstimatedCost = (duration, travelers, id) => {
	let totalCost = destinationData.calculateTripsExpenses(duration, travelers, id);
	estimatedCost.innerHTML += `Estimated Cost: $ ${totalCost}`
}

// const reloadData = () => {

// 	// Promise.all([travelerPromise, tripPromise, destinationPromise])
// 	// 	.then((value) => {
// 	// 		// console.log(value[1], 'LABELLL74')
// 	// 		// travelerId = getRandomID(value[0].travelers); //that line needs to be random number to make dynamic
// 	// 		travelersData = new Traveler(value[0].travelers[8]); //travelerId
// 	// 		tripData = new Trip(value[1].trips);
// 	// 		destinationData = new Destination(value[2].destinations);
// 	// 		travelersData.addMatchingTrips(tripData, destinationData);
// 	// 		travelersData.getPendingTrips()
// 	// 		showUserPastTrips();
// 	// 		showUserUpcomingTrips();
// 	// 		showUserPendingTrips();
// 	// 		showTotalSpentInfo();
// 		// });
// }


// ** EVENT LISTENER **

clickSubmitButton.addEventListener('click', planATrip);