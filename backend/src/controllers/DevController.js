const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {

    async index(req, res){  //funçao pra saber quem ainda nao levou like/dislike
        const { user } = req.headers;

        const loggedDev = await Dev.findById(user);

        const users = await Dev.find({
            $and: [
                { _id: { $ne: user } },  //me traz todos os usuarios que _id nao seja igual ($ne (not equal))
                { _id: { $nin: loggedDev.likes } },
                { _id: { $nin: loggedDev.dislikes } },
            ],
        })
        
        return res.json(users);
    },


    async store(req, res){ //guarda na DataBase os dados provenientes do github
       const { username } = req.body;

       const userExists = await Dev.findOne({ user: username });//procura usuário existente
       if(userExists) {
           return res.json(userExists);
       }
 
       const response = await axios.get(`https://api.github.com/users/${username}`);

       const{ name, bio, avatar_url: avatar } = response.data;

       const dev = await Dev.create({
           name,
           user: username,
           bio,
           avatar
       })

        return res.json(dev);
    }
};