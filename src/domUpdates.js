
//QUERY SELECTORS
let logInPage = document.getElementById("loginForm");
let pastTripsView = document.querySelector('.past-trips-view');
let upcomingTripsView = document.querySelector('.upcoming-trips-view');
let pendingTripsView = document.querySelector('.pending-trips-view');
let totalSpentInfo = document.querySelector('.total-spent-info');
let dashboard = document.querySelector(".dashboard-view");
let allTrips = document.querySelector(".all-trips-view");
let estimatedCost = document.getElementById('planningCost');
let welcome = document.querySelector('.welcome');
let postErrorField = document.querySelector('.post-error-field');
let logInWarning = document.getElementById('warnings');

let domUpdates = {
	displayUserPastTrip(trip, destinationData) {
    pastTripsView.innerHTML += `
      <article tabindex="0">
        <img class="trip-view" src=${trip.destination.image} alt=${trip.destination.alt}>
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
      </article>
		`;
  },

  displayUserUpcomingTrips(trip, destinationData) {
    upcomingTripsView.innerHTML += `
      <article tabindex="0">
        <img class="trip-view" src=${trip.destination.image} alt=${trip.destination.alt}>
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
      </article>
		`;
  },

  displayUserPendingTrips(trip, destinationData) {
    pendingTripsView.innerHTML += `
    <article tabindex="0">
      <img class="trip-view" src=${trip.destination.image} alt=${trip.destination.alt}>
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
    </article>
		`;
  },

  clearPendingTrips() {
    pendingTripsView.innerHTML = ' ';
  },

  displayTotalSpentInfo(amountSpent) {
    totalSpentInfo.innerHTML = `This year you had spent a total of: $ ${amountSpent}`;
  },

  displayEstimatedCost(totalCost) {
    estimatedCost.innerHTML = `Estimated Cost: $ ${totalCost}`
  },

  displayTravelerName(travelersData) {
    welcome.innerHTML = `Hi ${travelersData.name}, welcome back again. Let's gooo!`
  },
  
  displayPostError() {
    domUpdates.removeHidden(postErrorField);
  },

  hidePostError() {
    domUpdates.addHidden(postErrorField);
  },

  displayLogInError() {
    domUpdates.removeHidden(logInWarning);
  },

  hideLogInError() {
    domUpdates.addHidden(logInWarning);
  },

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