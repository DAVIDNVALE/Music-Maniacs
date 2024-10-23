import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const UserController = {
    register: async (req, res) => {
        try{
            const newUser = await User.create(req.body)
            const userToken = jwt.sign(
                {userID:newUser._id, username:newUser.username},
                process.env.SECRET_KEY
            )
            res.cookie('userToken', userToken, {httpOnly:true})
            res.status(201).json(newUser)
        }
        catch(err){
            res.status(500).json(err)
        }
    },
    login: async (req, res) => {
        try{
            const {email, password} = req.body
            const potentialUser = await User.findOne({email})
            if(!potentialUser){
                return res.status(404).json({message:'User not found register now'})
            }
            const passwordsMatch = await bcrypt.compare(password, potentialUser.password)
            if(!passwordsMatch){
                return res.status(400).json({message:'Invalid credentials'})
            }
            const userToken = jwt.sign(
                {userID:potentialUser._id, username:potentialUser.username},
                process.env.SECRET_KEY
            )
            res.cookie('userToken', userToken, {httpOnly:true})
            res.status(201).json(potentialUser)
        }
        catch(err){
            res.status(500).json(err) 
        }
    },
    logout: async (req, res) => {
        res.clearCookie('userToken')
        res.status(200).json({message:'Successfully Logged Out!'})
    },
    getLoggedInUser: async (req, res) => {
        try{
            const {id} = req.params
            const user = await User.findById(id)
            res.status(200).json(user)
        }
        catch(err){
            res.status(500).json(err)   
        }
    }
}