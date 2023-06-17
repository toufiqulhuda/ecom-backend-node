
const Product = require("../models/ProductModel")
// const jwt = require("jsonwebtoken");

exports.all = async (req, res) => {
    try {
        const allProduct = await Product.find(req.query);
        if(allProduct){
            return res.status(200).json(allProduct)
        }else{
            return res.status(404).json({message: "No record found."})
        }
    } catch (error) {
        return res.status(500).json({message: error.message}) 
    }
    
};

// get paramiter wise Product
exports.getOne = async (req, res) => {
    try {
        const {id} = req.params.id
        // if(!id) return res.status(404).json({message: "No record found"})
        const oneProduct = await Product.findById(id);
        if(oneProduct){
            return res.status(200).json(oneProduct)
        }else{
            return res.status(404).json({message: "No record found."})
        }
    } catch (error) {
        
        return res.status(500).json({message: "No record found."})
    }
}

// exports.getByCata = async (req, res) => {
//     try {
//         const {id} = req.params
//         const oneProduct = await Product.findById(id);
//         if(oneProduct){
//             return res.status(200).json(oneProduct)
//         }else{
//             return res.status(404).json({message: "No record found."})
//         }
//     } catch (error) {
        
//         return res.status(500).json({message: error.message})
//     }
// }

// insert Product
exports.add = async (req, res) => {
    try {
        // console.log(req.body);
        const Products = await Product.create(req.body)
        return res.status(200).json(Products)
    } catch (error) {
        
        return res.status(500).json({message: error.message})
    }
}

// update Product
exports.update = async (req, res) => {
    try {
        const {id} = req.params
        const updateOneProduct = await Product.findByIdAndUpdate(id,req.body);
        if(!updateOneProduct){
            return res.status(404).json({message: `No record found to update with id ${id}`}) 
        }
        const updateProduct = await Product.findById(id);
        return res.status(200).json(updateProduct)
    } catch (error) {
    
        return res.status(500).json({message: error.message})
    } 
}

// delete Product
exports.delete = async (req, res) => {
    try {
        const {id} = req.params
        const deleteOneProduct = await Product.findByIdAndDelete(id);
        if(!deleteOneProduct){
            return res.status(404).json({message: `No record found with ${id}`}) 
        }
        const allProduct = await Product.find({});
        return res.status(200).json(allProduct)
    } catch (error) {
        return res.status(500).json({message: error.message})
    } 
}
