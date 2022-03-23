const Product = require('../models/Product');

module.exports = class ProductController {
    static async showProducts(req, res) {
        const products = await Product.getProducts().then(products => {
            res.render('products/all', { products });
        });
        //console.log(products);
        //res.render('products/all', { products });
    }

    static createProduct(req, res) {
        res.render('products/create')
    }	

    static createProductPost(req, res) {
        const { name, image, price, description } = req.body;

        const product = new Product(name, image, price, description);

        product.save();
    
        res.redirect('/products');
    }
    static async getProduct(req, res) {
        const product = await Product.getProductById(req.params.id).then(product => {
            res.render('products/product', { product });
        });
    }
  
    static async removeProduct(req, res) {
        await Product.removeProductById(req.params.id).then(() => {
            res.redirect('/products');
        });
    }
    static async editProduct(req, res) {
        const product = await Product.editProductById(req.params.id).then(product => {
            res.render('products/edit', { product });
        });
    }

    static async updateProduct(req, res) {
        const { name, image, price, description } = req.body;
        const product = new Product(name, image, price, description);
        //console.log(product);
        await Product.updateProductById(req.body.id, product);
        res.redirect('/products');
    }
}