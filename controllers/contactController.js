const Contact = require('../models/ContactModel');
// const Cart = require('../models/CartModel');
// const User = require('../models/UserModel');
// const config = require('config');
// const stripe = require('stripe')(config.get('StripeAPIKey'));

exports.get_all = async (req,res) => {
    const userId = req.params.id;
    Contact.find({userId}).sort({date:-1}).then(orders => res.json(orders));
}

exports.submit = async (req,res) => {
    try{
        // const userId = req.params.id;
        const {name,email,desc} = req.body;
        if(!name && !email && !desc){
            return res.status(400).json({message: 'Please enter all fields'});
        }else{
            // let user = await User.findOne({_id: userId});   
            // if(user){
                const contact = await Contact.create({
                    name,
                    email,
                    desc
                });
                //const data = await Cart.findByIdAndDelete({_id:cart.id});
                return res.status(201).json(contact);
            // }else{
            //     return res.status(500).json({message:"The user id you are using does not exist."});
            // }
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: error.message});
    }
}