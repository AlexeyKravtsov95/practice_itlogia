import {Cafe} from "./models/Cafe.js";
import {Restaurant} from "./models/Restaurant.js";
import {Reservation} from "./models/Reservation.js";
import {MichelinRestaurant} from "./models/MichelinRestaurant.js";
import {CoffeeShop} from "./models/CoffeeShop.js";

Promise.all([
    'cafes.json',
    'restaurants.json',
    'michelin-restaurants.json',
    'coffee-shops.json',
].map(url => fetch('./data/' + url).then(response => response.json())))
    .then(dataArray => {
        processData(dataArray);
    })
    .catch(error => {
        console.log("Ошибка загрузки данных: ", error)
    });

const foodPlaces = {
    cafes: [],
    restaurants: [],
    michelineRestaurants: [],
    coffeeShops: [],
}

const TYPE_CAFE = 'cafe'
const TYPE_RESTAURANT = 'restaurant'
const TYPE_MICHELIN_RESTAURANT = 'michelin-restaurant'
const TYPE_COFFEE_SHOP = 'coffee-shop'

function processData(data) {
    processCafes(data[0]);
    processRestaurants(data[1]);
    processMichelinRestaurants(data[2]);
    processCoffeeShops(data[3]);

    generateTableForFoodPlaces(foodPlaces.cafes, TYPE_CAFE)
    generateTableForFoodPlaces(foodPlaces.restaurants, TYPE_RESTAURANT)
    generateTableForFoodPlaces(foodPlaces.michelineRestaurants, TYPE_MICHELIN_RESTAURANT)
    generateTableForFoodPlaces(foodPlaces.coffeeShops, TYPE_COFFEE_SHOP)

}

function processCafes(cafes) {
    cafes.forEach(item => {
        const cafe = new Cafe(item.name, item.address, item.openingTime, item.closingTime);
        item.menu.forEach(menuItem => {
            cafe.addToMenu({ name: menuItem.name, price: menuItem.price });
        });
        foodPlaces.cafes.push(cafe);
    });
}

function processRestaurants(restaurants) {
    restaurants.forEach(item => {
        const restaurant = new Restaurant(item.name, item.address, item.cuisine, item.openingTime, item.closingTime);
        item.menu.forEach(menuItem => {
            restaurant.addToMenu({ name: menuItem.name, price: menuItem.price });
        });
        item.reservations.forEach(reservationItem => {
            restaurant.addReservation(new Reservation(reservationItem.name, reservationItem.time));
        });
        foodPlaces.restaurants.push(restaurant);
    });
}

function processMichelinRestaurants(michelineRestaurants) {
    michelineRestaurants.forEach(item => {
        const restaurant = new MichelinRestaurant(item.name, item.address, item.cuisine, item.mainChef, item.rating, item.openingTime, item.closingTime);
        item.menu.forEach(menuItem => {
            restaurant.addToMenu({ name: menuItem.name, price: menuItem.price });
        });
        item.reservations.forEach(reservationItem => {
            restaurant.addReservation(new Reservation(reservationItem.name, reservationItem.time));
        });
        foodPlaces.michelineRestaurants.push(restaurant);
    });
}

function processCoffeeShops(coffeeShops) {
    coffeeShops.forEach(item => {
        const coffeeShop = new CoffeeShop(item.name, item.address, item.seatingCapacity, item.openingTime, item.closingTime);
        item.menu.forEach(menuItem => {
            coffeeShop.addToMenu({ name: menuItem.name, price: menuItem.price });
        });
        if(item.specialOffer) {
            coffeeShop.specialOffer = item.specialOffer;
        }
        foodPlaces.coffeeShops.push(coffeeShop);
    });
}

function generateTableForFoodPlaces(data, type) {
    const tableBody = document.getElementById(type + '-tb');
    data.forEach((foodPlace, index) => {
        const row = tableBody.insertRow();
        row.insertCell().innerText = index + 1;
        row.insertCell().innerText = foodPlace.name;
        row.insertCell().innerText = foodPlace.address;
        row.insertCell().innerText = foodPlace.workingHours;

        if (type === TYPE_RESTAURANT || type === TYPE_MICHELIN_RESTAURANT) {
            row.insertCell().innerText = foodPlace.cuisine;
        }

        let ul = document.createElement("ul");
        foodPlace.menu.forEach((menuItem) => {
            const li = document.createElement("li");
            li.innerText = menuItem.name + ' - ' + menuItem.price + ' $';
            ul.appendChild(li);
        });
        row.insertCell().appendChild(ul);

        if (type === TYPE_RESTAURANT || type === TYPE_MICHELIN_RESTAURANT) {
            let ul = document.createElement("ul");
            foodPlace.reservations.forEach((reservationItem) => {
                const li = document.createElement("li");
                li.innerText = reservationItem.name + ' - ' + reservationItem.time;
                ul.appendChild(li);
            });
            row.insertCell().appendChild(ul);
        }

        if (type === TYPE_MICHELIN_RESTAURANT) {
            row.insertCell().innerText = foodPlace.rating;
            row.insertCell().innerText = foodPlace.mainChef;
        }

        if (type === TYPE_COFFEE_SHOP) {
            row.insertCell().innerText = foodPlace.seatingCapacity;
            row.insertCell().innerText = foodPlace.specialOffer;
        }

        row.insertCell().innerText = foodPlace.isOpen() ? 'Да' : 'Нет';
    })
}