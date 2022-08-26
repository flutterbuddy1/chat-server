const UserModel = require("../models/UserModel.js");

class User {
    static getUsers = async (req,res) => {
        try {
            const users = await UserModel.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(404).json({message:error.message});
        }
    }
    static createUser = async (req, res)=>{
        const user = req.body;
        console.log(user);
        const check = await UserModel.find({username:user.username});
        if(check.length > 0){
            res.status(409).json({message:"Username already Exiest"});
        }else{
            const newUser = new UserModel({
                name:user.name,
                username:user.username,
                password:user.password
            });

            try {
                await newUser.save();
                res.status(201).json(newUser);
            } catch (error) {
                res.status(409).json({message:error.message});
            }
        }
        
    }

    static login = async (req,res)=>{
        const user = req.body;
        try {
            const loggedUser = await UserModel.find({username:user.username,password:user.password});
            if(loggedUser.length > 0){
                res.status(200).json(loggedUser); 
            }else{
                res.status(422).json({message:"Username/Password not valid"}); 
            }
        } catch (error) {
            res.status(409).json({message:error.message});
        }        
    }
}

module.exports = User;  