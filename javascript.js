// Global Variables
const searchInput = document.querySelector(".search-input");
const locationInput = document.querySelector(".location-input");
const searchSumbit = document.querySelector(".search-submit");
const searchForm = document.querySelector(".search-form");
const searchLocation = document.querySelector(".search-location");
const gallery = document.querySelector(".gallery");
const closeRestaurants = document.querySelector(".near-by-restaurants");
const searchCatogery = document.querySelector(".search-filter").childNodes;
const apiKey = "caeb2499f9f4ccabc7f07ed9bcafbc1f";
let searchValue;
let locationValue;

// Functions

function updateIput(e) {
  searchValue = e.target.value;
}

function updateLocationInput(e) {
  locationValue = e.target.value;
}

const getPosition = () => {
  return new Promise((resolve, reject) => {
    const onSuccess = (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      pos = [lat, lng];

      resolve(pos);
    };

    const onError = () => {
      console.log("Can't get location info");
      reject();
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  });
};

getPosition().then((position) => {
  lat = position[0];
  long = position[1];

  async function fetchApi() {
    const dataFetch = await fetch(
      `https://developers.zomato.com/api/v2.1/geocode?lat=${lat}&lon=${long}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "user-key": apiKey,
        },
      }
    );
    const data = await dataFetch.json();
    const eightRestaurants = data.nearby_restaurants.slice(0, 8);
    const location = data.location;
    displayLocation(location);
    if (data.nearby_restaurants.length === 0) {
      closeRestaurants.innerHTML =
        "<h1>Sorry there are no near by restaurants.</h1>";
      return;
    }
    eightRestaurants.forEach((element) => {
      const nearByRestaurants = element.restaurant;
      displayCards(nearByRestaurants);
    });
  }
  fetchApi();
});

async function fetchLocation(location) {
  const dataFetch = await fetch(
    `https://developers.zomato.com/api/v2.1/locations?query=${location}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "user-key": apiKey,
      },
    }
  );
  const data = await dataFetch.json();
  const location_suggestions = data.location_suggestions[0];
  console.log(location_suggestions);
  async function fetchSearch(element) {
    const dataFetch = await fetch(
      `https://developers.zomato.com/api/v2.1/geocode?lat=${element.latitude}&lon=${element.longitude}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "user-key": apiKey,
        },
      }
    );
    const data = await dataFetch.json();
    console.log(data);
    const eightRestaurants = data.nearby_restaurants.slice(0, 8);
    console.log(eightRestaurants);

    if (data.nearby_restaurants.length === 0) {
      closeRestaurants.innerHTML =
        "<h1>Sorry there are no near by restaurants.</h1>";
      return;
    }
    eightRestaurants.forEach((element) => {
      const nearByRestaurants = element.restaurant;
      displayCards(nearByRestaurants);
    });
  }
  fetchSearch(location_suggestions);
}

async function fetchLocationRoundTwo(location) {
  const dataFetch = await fetch(
    `https://developers.zomato.com/api/v2.1/locations?query=${location}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "user-key": apiKey,
      },
    }
  );
  const data = await dataFetch.json();
  const location_suggestions = data.location_suggestions[0];
  async function fetchSearchRoundTwo(element) {
    const dataFetch = await fetch(
      `https://developers.zomato.com/api/v2.1/search?q=${searchValue}&lat=${element.latitude}&lon=${longitude}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "user-key": apiKey,
        },
      }
    );
    const data = await dataFetch.json();
    console.log(data);

    if (data.nearby_restaurants.length === 0) {
      closeRestaurants.innerHTML =
        "<h1>Sorry there are no near by restaurants.</h1>";
      return;
    }
    eightRestaurants.forEach((element) => {
      const nearByRestaurants = element.restaurant;
      displayCards(nearByRestaurants);
    });
  }
  fetchSearchRoundTwo(location_suggestions);
}

// async function fetchApi() {
// const dataFetch = await fetch(
// "https://developers.zomato.com/api/v2.1/search?lat=51.524403199999995&lon=-0.1507328",
// {
// method: "GET",
// headers: {
// Accept: "application/json",
// "user-key": apiKey,
// },
// }
// );
// const data = await dataFetch.json();
// console.log(data);
// const listing = data.restaurants.map((business) => {
// return business.restaurant;
// });
// //console.log(listing);
// data.restaurants.forEach((list) => {
// const result = list.restaurant;
// displayCards(result);
// });
// }

function displayLocation(element) {
  // Make divs
  const midDiv = document.createElement("div");
  midDiv.classList.add("mid-div");

  // Welcome Message
  const welcomeDiv = document.createElement("div");
  welcomeDiv.classList.add("welcome-div");

  // Welcome text
  const welcomeText = document.createElement("h3");
  welcomeText.classList.add("welcome-text");
  welcomeText.innerText =
    "Welcome to my webpage where you will be able to connect with millions of restaurants right at your finger tips. We hope your experience is satisfying. enjoy!";

  // location card
  const locationDiv = document.createElement("div");
  locationDiv.classList.add("location-div");

  // Top Div
  const imageDiv = document.createElement("div");
  imageDiv.classList.add("image-div");
  // Image
  const image = document.createElement("img");
  image.classList.add("hvr-bounce-out");
  image.alt = element.name;
  image.src = "./images/pin.svg";
  imageDiv.appendChild(image);
  // Bottom Div
  const textDiv = document.createElement("div");
  textDiv.classList.add("text-div");
  // title
  const titleName = document.createElement("p");
  titleName.innerText = "Title: ";
  const titleNr = document.createElement("span");
  titleNr.innerText = element.title;
  titleName.appendChild(titleNr);
  // country-name
  const countryName = document.createElement("p");
  countryName.innerText = "Country Name: ";
  const countryNr = document.createElement("span");
  countryNr.innerText = element.country_name;
  countryName.appendChild(countryNr);
  // city
  const cityName = document.createElement("p");
  cityName.innerText = "City: ";
  const cityNr = document.createElement("span");
  cityNr.innerText = element.city_name;
  cityName.appendChild(cityNr);

  // Append All
  gallery.appendChild(midDiv);
  midDiv.appendChild(welcomeDiv);
  midDiv.appendChild(locationDiv);
  locationDiv.appendChild(imageDiv);
  locationDiv.appendChild(textDiv);
  textDiv.appendChild(titleName);
  textDiv.appendChild(countryName);
  textDiv.appendChild(cityName);
  welcomeDiv.appendChild(welcomeText);
}

function displayCards(element) {
  const foodDiv = document.createElement("div");
  foodDiv.classList.add("food-div");
  foodDiv.classList.add("hvr-bob");
  // Top Div
  const imageDiv = document.createElement("div");
  imageDiv.classList.add("image-div");
  // Image
  const image = document.createElement("img");
  image.classList.add("image");
  image.alt = element.name;
  image.src = element.thumb;
  // Bottom Div
  const textDiv = document.createElement("div");
  textDiv.classList.add("text-div");
  // Name
  const restaurantName = document.createElement("h3");
  restaurantName.classList.add("restaurant-name");
  restaurantName.innerText = element.name;
  // Cuisine
  const cuisineText = document.createElement("p");
  cuisineText.innerText = "Cuisine: ";
  const cuisineNr = document.createElement("span");
  cuisineNr.innerText = element.cuisines;
  cuisineText.appendChild(cuisineNr);
  // Location
  const locationText = document.createElement("p");
  locationText.innerText = "Location: ";
  const locationNr = document.createElement("span");
  locationNr.innerText = element.location.address;
  locationText.appendChild(locationNr);
  // Average price for two
  const averagePriceText = document.createElement("p");
  averagePriceText.innerText = "Average Price For Two: ";
  const averageNr = document.createElement("span");
  averageNr.innerText = element.currency + element.average_cost_for_two;
  averagePriceText.appendChild(averageNr);

  textDiv.appendChild(restaurantName);
  textDiv.appendChild(cuisineText);
  textDiv.appendChild(locationText);
  textDiv.appendChild(averagePriceText);
  imageDiv.appendChild(image);
  foodDiv.appendChild(imageDiv);
  foodDiv.appendChild(textDiv);
  closeRestaurants.appendChild(foodDiv);
}

function clear() {
  gallery.innerHTML = "";
  searchInput.value = "";
  locationInput.value = "";
}

// EventListeners
searchInput.addEventListener("input", updateIput);
locationInput.addEventListener("input", updateLocationInput);
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  clear();
  closeRestaurants.innerHTML = "";
  fetchLocationRoundTwo(locationValue);
});

searchLocation.addEventListener("submit", (e) => {
  e.preventDefault();
  clear();
  closeRestaurants.innerHTML = "";
  console.log(locationValue);
  fetchLocation(locationValue);
  //fetchSearch(locationData);
});

// function displayCards(element) {
// console.log(element);
// const foodDiv = document.createElement("div");
// foodDiv.classList.add("food-div");
// // Top Div
// const imageDiv = document.createElement("div");
// imageDiv.classList.add("image-div");
// // Image
// const image = document.createElement("img");
// image.classList.add("image");
// image.alt = element.name;
// image.src = element.featured_image;
// // Bottom Div
// const textDiv = document.createElement("div");
// textDiv.classList.add("text-div");
// // Name
// const restaurantName = document.createElement("h3");
// restaurantName.classList.add("restaurant-name");
// restaurantName.innerText = element.name;
// // Cuisine
// const cuisineText = document.createElement("p");
// cuisineText.classList.add("cuisine-text");
// cuisineText.innerText = "Cuisine: ";
// const cuisineNr = document.createElement("span");
// cuisineNr.classList.add("population-nr");
// cuisineNr.innerText = element.cuisines;
// cuisineText.appendChild(cuisineNr);
// // Establishment
// const establishmentText = document.createElement("p");
// establishmentText.classList.add("establishment-text");
// establishmentText.innerText = "Establishment: ";
// const establishmentNr = document.createElement("span");
// establishmentNr.classList.add("establishment-nr");
// establishmentNr.innerText = element.establishment;
// establishmentText.appendChild(establishmentNr);
// // Location
// const locationText = document.createElement("p");
// locationText.classList.add("location-text");
// locationText.innerText = "Location: ";
// const locationNr = document.createElement("span");
// locationNr.classList.add("location-nr");
// locationNr.innerText = element.locaton;
// locationText.appendChild(locationNr);
// // Phone Number
// const phoneText = document.createElement("p");
// phoneText.classList.add("phone-text");
// phoneText.innerText = "Phone-Number: ";
// const phoneNr = document.createElement("span");
// phoneNr.classList.add("phone-nr");
// phoneNr.innerText = element.phone_numbers;
// phoneText.appendChild(phoneNr);
// // Opening Times
// const openingTimeText = document.createElement("p");
// openingTimeText.classList.add("opening-time-text");
// openingTimeText.innerText = "Opening-Times: ";
// const openingTimeNr = document.createElement("span");
// openingTimeNr.classList.add("opening-time-nr");
// openingTimeNr.innerText = element.timings;
// openingTimeText.appendChild(openingTimeNr);

// textDiv.appendChild(restaurantName);
// textDiv.appendChild(cuisineText);
// textDiv.appendChild(establishmentText);
// textDiv.appendChild(locationText);
// textDiv.appendChild(phoneText);
// textDiv.appendChild(openingTimeText);
// imageDiv.appendChild(image);
// foodDiv.appendChild(imageDiv);
// foodDiv.appendChild(textDiv);
// closeRestaurants.appendChild(foodDiv);
// }
