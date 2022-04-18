const fs=require('fs');
const path = require('path');
let db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const {validationResult} = require('express-validator');
const imageController= require('../controllers/imageController')
const User=db.User
const Product= db.Product;
const mainController= {
    index: async(req, res) =>{
        try{
            
            let categories=await db.Category.findAll()
            let products=await Product.findAll({
                include:["discounts","images","categories"],
                where: {recommended:1, visibility:1}
            })
                
                return res.render('products/index',{products,categories})
            
            
            
        }
        catch(error){
            console.log(error)
        }
    },
    
    
    show:async(req,res)=>{
        try{
            let usuario= req.session.userLogged
            if(usuario.roles_id==1){
                let products=await Product.findAll({
                    include:["discounts","images"],
                })
                
                return res.render('products/productsAdmin',{products})
            }else{
                return res.render('yoda')
            }
            
        }
        catch(error){
            console.log(error)
        }
    },
    
    
    description:(req,res)=>{
        return res.render('tablaTalles')
    },
    preguntas:(req,res)=>{
        return res.render('preguntas')
    },
    
}
module.exports = mainController;