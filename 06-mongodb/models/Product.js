const conn = require('../db/conn');

const { ObjectId } = require('mongodb');

class Products {
    constructor(name, image, price, description) {
        this.name = name;
        this.image = image;
        this.price = price;
        this.description = description;
    }
    save() {
        const product = conn.db().collection('products').insertOne({
            name: this.name,
            image: this.image,
            price: this.price,
            description: this.description
        });
        return product;
    }

    static getProducts() {
        const products = conn.db().collection('products').find().toArray();
        return products;
    }

    static async getProductById(id) {
        const  product = await conn.db().collection('products').findOne({ _id: ObjectId(id) });
        return product;
    }

    static async removeProductById(id) {
        const product = await conn.db().collection('products').deleteOne({ _id: ObjectId(id) });
        return product;
    }

    static async editProductById(id) {
        const product = await conn.db().collection('products').findOne({ _id: ObjectId(id) });
        return product;
    }

/*     static async updateProductById(id, product) {
        const updatedProduct = await conn.db().collection('products').updateOne({ _id: ObjectId(id) },
         { $set: { 
                    name: product.name, 
                    image: product.image, 
                    price: product.price, 
                    description: product.description } });
        return updatedProduct;
    } */
    
    updateProductById(id) {
        conn.db().collection('products').updateOne({ _id: ObjectId(id) },
         { $set: this});
        return;
    }
}

module.exports = Products;