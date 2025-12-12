const fs = require('fs');
const path = require('path');

class ProductModel {
    static async findAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, '../db', 'products.json'), 'utf-8',(err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(data));
                }
            })
        })
    }
}

module.exports = ProductModel;