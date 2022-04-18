const DB=require("../../database/models");
const { Op } = require("sequelize");

const Product=DB.Product
const User=DB.User
module.exports = {
    
    ultimProduct:async(req,res)=>{
        try{
            Product
            .findAll({include:["discounts","categories","images","sizes","colors"]})
            .then(prod=>{
                let ultimo=prod[prod.length-1]
                let product={
                    id:ultimo.id,
                    name:ultimo.name,
                    price:ultimo.price,
                    description:ultimo.description,
                    stock:ultimo.stock,
                    stock_min:ultimo.stock_min,
                    stock_max:ultimo.stock_max,
                    visibility:ultimo.visibility,
                    recommended:ultimo.recommended,
                    discount:ultimo.discounts.name,
                    category:ultimo.categories.name,
                    image:ultimo.images[0].url_name,
                    size:ultimo.sizes.name,
                    color:ultimo.colors.name
                }
                return res.status(200).json({
                    lastProduct:product
                })
            })
        }catch(error){console.log(error)}
        

    },
    ultimUser:async(req,res)=>{
        try{
            User
            .findAll({include:["avatars","rols"]})
            .then(user=>{
                
                let ultimo=user[user.length-1]
                
                let person={
                    id:ultimo.id,
                    name:ultimo.name,
                    email:ultimo.email,
                    date:ultimo.date,
                    rol:ultimo.rols.name,
                    avatar:ultimo.avatars[0].url_name
                }
                return res.status(200).json({
                    lastUser:person
                })
            })
        }catch(error){console.log(error)}
        

    }

}