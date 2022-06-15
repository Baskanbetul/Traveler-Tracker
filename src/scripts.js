import './images/pngegg.png'
import './css/styles.css';
import { fetchApiData, postApiData } from './apiCalls.js';
import Traveler from '../src/traveler';
import Trip from '../src/trip';
import Destination from '../src/destination';
import domUpdates from './domUpdates';

// ** GLOBAL VARIABLES **

let destinationData;
let travelersData;
let tripData;
let travelerId;

// ** QUERY SELECTORS **

let clickSubmitButton = document.getElementById('submitFormBtn');
let planningDate = document.getElementById('planningDate');
let selectDestination = document.getElementById('destinationDropdown');
let selectTravelers = document.getElementById('planningNoTravelers');
let planningNoDays = document.getElementById('planningNoDays');
let userInput = document.getElementById('userInput')
let passwordInput = document.getElementById('passwordInput');
let clickLogInButton = document.getElementById('loginButton');

// ** FUNCTIONS **

const logIn = () => {
	let userName = userInput.value.split('');
	let id = userName.slice(8).join('');
	let password = passwordInput.value
	if (userInput.value === '' || password === '' || password !== 'traveler') {
		domUpdates.displayLogInError();
	} else {
			domUpdates.hideLogInError();
			travelerId = Number(id) 
			domUpdates.hideLogInPage();
			domUpdates.showAllTrips();
			domUpdates.showDashboard();
			getAllData();
		}
	}


// ** FETCH  GET REQUEST **

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
		domUpdates.displayTravelerName(travelersData); 
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
		id: Date.now() + tripData.data.length + 1,
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
		domUpdates.displayUserPastTrip(trip, destinationData);
	})
}

const showUserUpcomingTrips = () => {
	travelersData.getUpcomingTrips()
	travelersData.upcomingTrips.forEach(trip => {
		domUpdates.displayUserUpcomingTrips(trip, destinationData);
	})
}

const showUserPendingTrips = () => {
	domUpdates.clearPendingTrips();
	travelersData.getPendingTrips();
	travelersData.pendingTrips.forEach((trip) => {
		domUpdates.displayUserPendingTrips(trip, destinationData);
	});
}

const showTotalSpentInfo = () => {
	let amountSpent = destinationData.calculateTotalTravelExpenses(travelersData.trips);
	domUpdates.displayTotalSpentInfo(amountSpent);
}

const getEstimatedCost = (duration, travelers, id) => {
	let totalCost = destinationData.calculateTripsExpenses(duration, travelers, id);
	domUpdates.displayEstimatedCost(totalCost)
}

// ** EVENT LISTENER **

clickSubmitButton.addEventListener('click', planATrip);
clickLogInButton.addEventListener('click', logIn);
