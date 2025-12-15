const ProductModel = require('../models/product');

class ProductsController {
    static async getProducts(req, res) {
        const products = await ProductModel.findAll();
        res.send(products);
    }

    static async getProduct(req, res) {
        const {id} = req.params;
        const product = await ProductModel.find(id);
        res.send(product);
    }

    static async addProduct(req, res) {
        const product = await ProductModel.create(req.body);
        res.send(product);
    }

    static async changeProduct(req, res) {
        const {id} = req.params;
        const product = await ProductModel.change(id, req.body);
        res.send(product);
    }

    static async deleteProduct(req, res) {
        const {id} = req.params;
        const product = await ProductModel.delete(id);
        res.send({});
    }
}

module.exports = ProductsController;