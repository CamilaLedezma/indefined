const DB=require("../../database/models");
const { Op } = require("sequelize");

const Product=DB.Product
module.exports = {
    products:(req,res)=>{
        Product
            .findAll()
            .then(prod=>{
                let categoriesCount=[];
                let prodArray=[];
                let cate1=0
                let cate2=0
                let cate3=0
                let cate4=0

                for(let i=0; i<prod.length;i++){
                    if(prod[i].categories_id==1){
                        cate1++;
                    }else if(prod[i].categories_id==2){
                        cate2++;
                    }else if(prod[i].categories_id==3){
                        cate3++; 
                    }else{cate4++}
                    let objeto={
                        id:prod[i].id,
                        name:prod[i].name,
                        description:prod[i].description,
                        detail:'/api/products/'+prod[i].id
                    }
                    prodArray.push(objeto)
                    
                }
                categoriesCount[0]={
                    name:"remeras",
                    quantity:cate1
                },
                categoriesCount[1]={
                    name:"pantalones",
                    quantity:cate2
                },
                categoriesCount[2]={
                    name:"abrigos",
                    quantity:cate3
                },
                categoriesCount[3]={
                    name:"accesorios",
                    quantity:cate4
                }
                let countCategories=categoriesCount.length
                

            return res.status(200).json({
                count:prod.length,
                countByCategory:countCategories,
                typesCategory:categoriesCount,
                products:prodArray
            })
        })

    },
    detail:async(req,res)=>{
        try{
            let id=req.params.id;
            Product
            .findByPk(id, 
                {include:["discounts","categories","images","sizes","colors"]})
            .then(prod=>{
                
                let  array=[
                    {category:prod.categories.name},
                    {size:prod.sizes.name},
                    {color:prod.colors.name},
                    {discount:prod.discounts.name}
                ]
                res.status(200).json({
                    productDetail:{
                        id:prod.id,
                        name:prod.name,
                        price:prod.price,
                        description:prod.description,
                        stock:prod.stock,
                        stock_min:prod.stock_min,
                        stock_max:prod.stock_max
                    },
                    arrayRelational:array,
                    urlImage:'/images/product-image/'+ prod.images[0].url_name
                    
                    
                })
                
                
            })}
            catch(err){console.log(err)}
        
        

    },
    list:async(req,res)=>{
        try{
            Product
            .findAll(
                {include:["discounts","categories","images","sizes","colors"]})
            .then(prod=>{
                let productArray=[]
                for(let i=0; i<prod.length; i++){
                    let objeto={
                        id:prod[i].id,
                        name:prod[i].name,
                        price:prod[i].price,
                        description:prod[i].description,
                        stock:prod[i].stock,
                        stock_min:prod[i].stock_min,
                        stock_max:prod[i].stock_max,
                        category:prod[i].categories.name,
                        size:prod[i].sizes.name,
                        color:prod[i].colors.name,
                        discount:prod[i].discounts.name,
                        image:prod[i].images[0].url_name
                    }
                    productArray.push(objeto)
                }
                res.status(200).json({
                    products:productArray,
                })
                
                
            })}
            catch(err){console.log(err)}
}
}