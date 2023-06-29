const Order = require('../models/OrderModel');
const Cart = require('../models/CartModel');
const User = require('../models/UserModel');
// const config = require('config');
// const stripe = require('stripe')(config.get('StripeAPIKey'));

exports.get_orders = async (req,res) => {
    const userId = req.params.id;
    Order.find({userId}).sort({date:-1}).then(orders => res.json(orders));
}

exports.checkout = async (req,res) => {
    try{
        const userId = req.params.id;
        const {items,bill} = req.body;
        //let cart = await Cart.findOne({userId});
        let user = await User.findOne({_id: userId});
        const email = user.email;
        if(user){
            const charge = true;
            if(!charge) throw Error('Payment failed');
            if(charge){
                const order = await Order.create({
                    userId,
                    items: items,
                    bill: bill
                });
                //const data = await Cart.findByIdAndDelete({_id:cart.id});
                return res.status(201).json(order);
            }
        }
        else{
            res.status(500).json({message:"You do not have items in cart"});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Something went wrong"});
    }
}