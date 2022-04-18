const path = require('path');
let db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");



const Product=db.Product


const categoryController = {
category:async(req,res)=>{
    try{
        let cat=req.params.category
        let products= await Product.findAll({
            include:["discounts","images"],
            where:
            {visibility:1, categories_id:cat}
            
        })
        
        return res.render('products/productsCategory',{products})
        
        }
        catch(error){
            console.log(error)
        }

}
}

module.exports = categoryController;