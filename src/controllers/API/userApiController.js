const DB=require("../../database/models");
const { Op } = require("sequelize");


module.exports = {
    users:(req,res)=>{
        DB.User
            .findAll()
            .then(user=>{
                let userArray=[];
                for(let i=0; i<user.length;i++){
                    let objeto={
                        id:user[i].id,
                        name:user[i].name,
                        email:user[i].email,
                        detail:'/api/users/'+user[i].id
                    }
                    userArray.push(objeto);
                }
            return res.status(200).json({
                count:user.length,
                users:userArray
            })
        })

    },
    detail:(req,res)=>{
        DB.User
            .findByPk(req.params.id,{include:["avatars"]})
            .then(user=>{
                console.log(user.avatars)
                let propiedad={
                    userInformation:{
                        id:user.id,
                        name:user.name,
                        email:user.email,
                        date:user.date,
                        urlUserAvatar: '/images/user_image/'+ user.avatars[0].url_name
                    
                }}
            return res.status(200).json({
                user:propiedad
            })
        })

    }
}