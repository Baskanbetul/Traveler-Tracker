// // This is the JavaScript entry file - your code begins here
// // Do not delete or rename this file ********

// // An example of how you tell webpack to use a CSS (SCSS) file
// import './css/styles.css';

// // An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/pngegg.png'
import './css/styles.css';
import { fetchApiData, postApiData } from './apiCalls.js';
import Traveler from '../src/traveler';
import Trip from '../src/trip';
import Destination from '../src/destination';
import domUpdates from './domUpdates';
// import travelerData from '../data/Traveler-data';

// ** GLOBAL VARIABLES **

let destinationData;
let travelersData;
let tripData;
let currentTraveler;
let travelerId;
let date = new Date();
let currentDay = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;

// ** QUERY SELECTORS **

let clickSubmitButton = document.getElementById('submitFormBtn');
let planningDate = document.getElementById('planningDate');
let selectDestination = document.getElementById('destinationDropdown');
let selectTravelers = document.getElementById('planningNoTravelers');
let planningNoDays = document.getElementById('planningNoDays');
let estimatedCost = document.getElementById('planningCost');
let userInput = document.getElementById('userInput')
let passwordInput = document.getElementById('passwordInput');
let clickLogInButton = document.getElementById('loginButton');

let upcomingTripsView = document.querySelector('.upcoming-trips-view');
let pendingTripsView = document.querySelector('.pending-trips-view');
let totalSpentInfo = document.querySelector('.total-spent-info');
let pastTripsView = document.querySelector('.past-trips-view');



// ** FUNCTIONS **

const getRandomID = (parameter) => {
	return Math.floor(Math.random() * [parameter].length);
};

currentTraveler = getRandomID();

const logIn = () => {
	let userName = userInput.value.split('')
	let id = userName.slice(8).join('');
	let name = userName.slice(0, 8).join('')
	
	let password = passwordInput.value
	if (userInput.value === '' || password === '' || password !== 'traveler') {
		console.log("Please enter correct user name and password"); //LEAVE THIS CONSOLE LOG
	} else {
			travelerId = Number(id) 
			domUpdates.hideLogInPage();
			domUpdates.showAllTrips();
			domUpdates.showDashboard();
			getAllData();
		}
	}








// ** FETCH REQUEST **
const getAllData = () => {
	const travelerPromise = fetchApiData('travelers');
	const tripPromise = fetchApiData('trips');
	const destinationPromise = fetchApiData('destinations');
	
	Promise.all([travelerPromise,tripPromise,destinationPromise])
		.then((value) => {
			let oneTraveler = value[0].travelers.find(traveler => traveler.id === travelerId)
		travelersData = new Traveler(oneTraveler);
		tripData = new Trip(value[1].trips);
		destinationData = new Destination(value[2].destinations);
		travelersData.addMatchingTrips(tripData, destinationData);
		showUserPastTrips();
		showUserUpcomingTrips();
		showUserPendingTrips();
		showTotalSpentInfo();
	})
}

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
		userID: travelersData.id,
		destinationID: matchingTrip.destinationID,
		travelers: Number(selectTravelers.value),
		date: planningDate.value.split('-').join('/'),
		duration: Number(planningNoDays.value),
		status: `pending`,
		suggestedActivities: [],
	};
	
	
	postApiData(newTrip).then(response => {
		tripData.data.push(response.newTrip)
		travelersData.trips = []
		travelersData.pendingTrips =[]
		travelersData.addMatchingTrips(tripData, destinationData)
		showUserPendingTrips();
	});
	getEstimatedCost(newTrip.duration, newTrip.travelers, newTrip.destinationID);
}

// ** DISPLAY FUNCTIONS **

const showUserPastTrips = () => {
	travelersData.getPastTrips()
	travelersData.pastTrips.forEach(trip => {
		// domUpdates.displayUserPastTrip(trip);
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
	estimatedCost.innerHTML = `Estimated Cost: $ ${totalCost}`
}

// ** EVENT LISTENER **

clickSubmitButton.addEventListener('click', planATrip);
clickLogInButton.addEventListener('click', logIn);
