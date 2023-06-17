const Cart = require('../models/CartModel');
const Product = require('../models/ProductModel');

exports.get_cart_items = async (req,res) => {
    const userId = req.params.id;
    try{
        let cart = await Cart.findOne({userId});
        if(cart && cart.items.length>0){
            return res.status(200).json(cart);
        }
        else{
            return res.status(200).json();
        }
    }
    catch(err){
        return res.status(500).json({message:"Something went wrong"});
    }
}

exports.add_cart_item = async (req,res) => {
    const userId = req.params.id;
    const { productId, quantity } = req.body;

    try{
        let cart = await Cart.findOne({userId});
        let product = await Product.findOne({_id: productId});
        if(!product){
            res.status(404).json({message:"Product not found!"})
        }
        const price = product.price;
        const name = product.name;

        if(cart){
            // if cart exists for the user
            let itemIndex = cart.items.findIndex(p => p.productId == productId);

            // Check if product exists or not
            if(itemIndex > -1)
            {
                let productItem = cart.items[itemIndex];
                productItem.quantity += quantity;
                cart.items[itemIndex] = productItem;
            }
            else {
                cart.items.push({ productId, name, quantity, price });
            }
            cart.bill += quantity*price;
            cart = await cart.save();
            return res.status(201).json(cart);
        }
        else{
            // no cart exists, create one
            const newCart = await Cart.create({
                userId,
                items: [{ productId, name, quantity, price }],
                bill: quantity*price
            });
            return res.status(201).json(newCart);
        }       
    }
    catch (err) {
        console.log(err);
        res.status(500).json({message:"Something went wrong"});
    }
}

exports.delete_item = async (req,res) => {
    const userId = req.params.userId;
    const productId = req.params.itemId;
    try{
        let cart = await Cart.findOne({userId});
        let itemIndex = cart.items.findIndex(p => p.productId == productId);
        if(itemIndex > -1)
        {
            let productItem = cart.items[itemIndex];
            cart.bill -= productItem.quantity*productItem.price;
            cart.items.splice(itemIndex,1);
        }
        cart = await cart.save();
        return res.status(201).json(cart);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({message:"Something went wrong"});
    }


}