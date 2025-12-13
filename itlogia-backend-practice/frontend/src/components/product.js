import {UrlManager} from "../utils/url-manager.js";

export class Product {
    constructor() {
        this.productElement = document.getElementById('product');

        this.id = UrlManager.getQueryParams()['id'];

        this.getProduct(this.id)
            .then(products => this.fillProduct(products));
    }

    async getProduct(id) {
        const response = await fetch(`http://localhost:3000/api/products/${id}`);
        return await response.json();
    }

    fillProduct(product) {
        if (product) {
            const titleElement = document.createElement('div');
            titleElement.className = 'title';
            titleElement.innerText = product.title;

            const descriptionElement = document.createElement('div');
            descriptionElement.className = 'description';
            descriptionElement.innerText = product.description;

            const priceElement = document.createElement('div');
            priceElement.className = 'price';
            priceElement.innerText = product.price + ' $';

            this.productElement.appendChild(titleElement);
            this.productElement.appendChild(descriptionElement);
            this.productElement.appendChild(priceElement);
        }
    }
}