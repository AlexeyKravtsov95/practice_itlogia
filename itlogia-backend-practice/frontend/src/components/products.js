export class Products {
    constructor() {
        this.productsElement = document.getElementById('products');

        this.getProducts()
            .then(products => this.fillProducts(products));
    }

    async getProducts() {
        const response = await fetch('http://localhost:3000/api/products');
        return await response.json();
    }

    fillProducts(products) {
        if (products && products.length > 0) {
            products.forEach(product => {
                const productElement = document.createElement('a');
                productElement.className = 'product';
                productElement.href = '/#/product?id=' + product.id;

                const titleElement = document.createElement('div');
                titleElement.className = 'title';
                titleElement.innerText = product.title;

                const descriptionElement = document.createElement('div');
                descriptionElement.className = 'description';
                descriptionElement.innerText = product.description;

                const priceElement = document.createElement('div');
                priceElement.className = 'price';
                priceElement.innerText = product.price + ' $';

                productElement.appendChild(titleElement);
                productElement.appendChild(descriptionElement);
                productElement.appendChild(priceElement);

                this.productsElement.appendChild(productElement);
            })
        }
    }
}