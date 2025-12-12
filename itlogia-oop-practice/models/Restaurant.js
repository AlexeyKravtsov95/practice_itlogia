import {FoodPlace} from "./FoodPlace.js";
import {Reservation} from "./Reservation.js";

export class Restaurant extends FoodPlace{
    constructor(name, address, cuisine, openingTime, closingTime) {
        super(name, address, 'Ресторан', openingTime, closingTime);
        this.cuisine = cuisine;
        this.reservations = [];
    }

    getInfo() {
        return `${super.getInfo()}, Кухня: ${this.cuisine}`;
    }

    addReservation(reservation) {
        if (reservation instanceof Reservation) {
            this.reservations.push(reservation);
        }
    }

    showReservation() {
        console.log(`Бронирование ресторана ${this.name}`)
        this.reservations.forEach((item, index) => {
            console.log(`${index + 1}. ${item.name} - ${item.price}$`);
        })
    }
}