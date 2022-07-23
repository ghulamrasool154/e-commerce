const express = require('express');
const app = express();
const Config = require('./db/Config');
const User = require('./db/User');

const Product = require('./db/Products')

const cors = require('cors')
app.use(express.json());
app.use(cors());


//  register api
app.post("/register", async (request, response)=>{
    
    let user = new User(request.body);
    let result = await user.save();
    request = result.toObject();
    delete result.password;
    response.send(result);
;})

// login api

app.post("/login", async (request,response)=>{

    if(request.body.password  && request.body.email){
        let user = await User.findOne(request.body).select('-password');
        if(user){
            response.send(user);
        }else{
            response.send('Your Emial or password is not exited');
        }
    }
    else{
        response.send('Your Emial or password is not same');
    }
})

// add product api

app.post('/add_product', async (request,response)=>{

    let product = new Product(request.body);
    let result = await product.save();
    response.send(result);

    console.log(" product__ => ", result);

})


// show all product api

app.get('/products', async(request, response)=>{
    let result = await Product.find();
    if(result.length > 0){
        response.send(result)

    }else{
        response.send([])
    }
})


// delete api 

app.delete('/product/:id', async(request, response)=>{

    const result = await Product.deleteOne({
        _id : request.params.id
    })
    response.send(result);

})


// update api 
app.get("/product/:id", async(request, response)=>{
    
    let result = await Product.findOne({
        _id : request.params.id
    })
    if(result){
        response.send(result);
    }
    else{
        response.send('Sorry NO reacord found');
    }

    console.log('result =>', result)
})


// app.put("/product/:id",async(request, response)=>{

//     let result = await Product.updateOne(
//         { _id : request.params.id},
//      {})
//  )

// }


app.put("/product/:id", async (request, response)=>{
    let result = await Product.updateOne({
        _id : request.params.id
    }, {
        $set : request.body
    })
    response.send(result);
})



app.get("/search/:key", async (request, response)=>{

    let result = await Product.find({
        "$or" :[
            { product_name : { $regex :  request.params.key}}
        ]
    });
    response.send(result);
})






app.listen(5000) 

// mongodb://localhost:27017
// ecommerce_dashboard
// users