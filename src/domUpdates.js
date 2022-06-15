// import '../src/scripts'
// import './css/styles.css';
// import { fetchApiData, postApiData } from './apiCalls.js';
// import Traveler from '../src/traveler';
// import Trip from '../src/trip';
// import Destination from '../src/destination';

let logInPage = document.getElementById("loginForm");
// let pastTripsView = document.querySelector('.past-trips-view');
// let upcomingTripsView = document.querySelector('.upcoming-trips-view');
// let pendingTripsView = document.querySelector('.pending-trips-view');
// let totalSpentInfo = document.querySelector('.total-spent-info');
let dashboard = document.querySelector(".dashboard-view");
let allTrips = document.querySelector(".all-trips-view");


let domUpdates = {
	// displayUserPastTrip(trip) {
  //   		pastTripsView.innerHTML += `
	// 	<img class="trip-view" src=${trip.destination.image}
	// 	<h5 class="trip-destination-name">Past Trips destination name: ${trip.destination.destination}</h5>
	// 	<div class="card-box" id="tripDestinationName">
	// 	<p class="start-date">Start date:${trip.date}</p>
	// 	<p class="travelers">Travelers:${trip.travelers}</p>
	// 	<p class="duration">Duration:${trip.duration}</p>
	// 	<p class="status">Status:${trip.status}</p>
	// 	<p class="trip-cost">Trip Cost: ${destinationData.calculateTripsExpenses(trip.duration, trip.travelers, trip.destination.id)}</p>
	// 	<p class="cost-per-day">Cost Per Day: ${trip.destination.estimatedLodgingCostPerDay}</p>
	// 	<p class="cost-per-traveler">Cost Per Traveler: ${trip.destination.estimatedFlightCostPerPerson}</p>
	// 	</div>
	// 	`;
  // },
  hideLogInPage() {
   domUpdates.addHidden(logInPage)
  },
  
  showAllTrips() {
    domUpdates.removeHidden(allTrips)
  },
  
  showDashboard() {
    domUpdates.removeHidden(dashboard)

  },

  addHidden (element) {
    element.classList.add("hidden")
  },

  removeHidden (element) {
    element.classList.remove("hidden")
  },

};






export default domUpdates;