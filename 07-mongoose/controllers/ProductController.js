const Product = require('../models/Product');

module.exports = class ProductController {
    static async showProducts(req, res) {
         const products = await Product.find().lean();
        res.render('products/all', { products });
    }

    static createProduct(req, res) {
        res.render('products/create')
    }	

    static async createProductPost(req, res) {
        const { name, image, price, description } = req.body;
        const product = new Product({name, image, price, description});
        await product.save();
        res.redirect('/products');
    }
    
     static async getProduct(req, res) {
        const product = await Product.findById(req.params.id).lean();
        res.render('products/product', { product });
     }
  
     static async removeProduct(req, res) {
            await Product.deleteOne({_id: req.params.id});
            res.redirect('/products');
     }
     static async editProduct(req, res) {
        const product = await Product.findById(req.params.id).lean();
        res.render('products/edit', { product });         
     }

     static async updateProduct(req, res) {
         const { id, name, image, price, description } = req.body;
         const product = {name, image, price, description};
         await Product.updateOne({_id: id}, product);

         res.redirect('/products');
     }

}