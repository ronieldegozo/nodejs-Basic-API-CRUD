const express = require('express');
const router = express.Router();
const Order = require('../models/order'); //Order Came from Order Model
const mongoose = require('mongoose');



//get all orders
router.get('/', (req,res,next)=>{
    Order.find()
    .exec()
    .then(result =>{
        console.log(result);
        res.status(200).json(result);
    })

    .catch((err) =>{
        console.log(err);
        res.status(404).json({
            error: err
        })
    })
})


//POST A NEW ORDER
router.post('/', (req,res,next)=>{
    
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        quantity: req.body.quantity,
        color: req.body.color
    });

    order
    .save()
    .then(result =>{
        console.log(result)
    })
    .catch(err => console.log(err));
    
    res.status(201).json({
        message: 'Handling POST Request for Orders',
        createdProduct: order
    })
})


//GET SPECIPIC ID OF YOUR ORDER
router.get('/:orderId', (req,res,next)=>{
    
    const id = req.params.orderId;
    Order.findById(id)
    .exec()
    .then(doc =>{
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
})



// GET THE SPECIFIC ID OF YOUR ORDER THEN UPDATE
router.patch('/:orderId', (req,res,next) =>{

    const id = req.params.orderId;
    const updateOrder = {};

    for(const ops of req.body) {
        updateOrder[ops.orderName] = ops.value;
    }

    Order.update({_id: id}, {$set: updateOrder })

    .exec()
    .then((result) =>{
        console.log(result);
        res.status(200).json(result);
    })

    .catch((err) =>{
        console.log(err);
        res.status(404).json({error: err});
    })

})


//GET ALSO THE SPECIFIC ID OF YOUR ORDER THEN DELETE
router.delete('/:orderId', (req,res,next)=>{
    const id = req.params.orderId; //orderId must the same in the /:orderId at the top
    Order.remove({_id: id})

    .then((result)=>{
        console.log(result);
        res.status(200).json(result);
    })

    .catch((err) =>{
        console.log(err);
        res.status(404).json({
            error: err
        })
    })

})


module.exports = router;