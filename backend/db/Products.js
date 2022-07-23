const mongoose = require('mongoose');
// schema
const productSchema = new mongoose.Schema ({
    product_name : String,
    product_price : String,
    product_category : String,
    product_add_userId : String,
    product_company : String,

});

// model 
module.exports = mongoose.model('products', productSchema)
