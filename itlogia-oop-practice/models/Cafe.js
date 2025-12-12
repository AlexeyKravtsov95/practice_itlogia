import {FoodPlace} from "./FoodPlace.js";

export class Cafe extends FoodPlace {
    constructor(name, address, openingTime, closingTime) {
        super(name, address, 'Кафе', openingTime, closingTime);
    }
}