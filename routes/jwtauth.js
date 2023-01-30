const express = require("express")
const router = express.Router()
const pool = require("../db")
const bcrypt = require("bcryptjs")
const jwtGenerator  = require("../utils/jwtGenerator")

router.get("/",(req,res)=>{
    res.json("HELLO")
})

router.post("/register",async(req,res)=>{
    try {
        const{name,email,password} = req.body
        const exists = await pool.query("SELECT FROM users WHERE user_email = $1",[email])
        if(exists.rows.length!==0){
            return res.status(401).json("User Already Exists")
        }
        const salt = await bcrypt.genSalt(10)
        const hased = await bcrypt.hash(password,salt)

        const newUser = await pool.query("INSERT INTO users (user_email,user_name,user_password) VALUES ($1,$2,$3) RETURNING *",[email,name,hased])

        // res.json(newUser.rows[0])
        const token = jwtGenerator(newUser.rows[0].user_id)
        res.json({token})

        // Bycrypt password

        
    } catch (error) {
        console.log(error)
        return res.status(500).json("Internal Server Error")
    }
})

router.post("/login",async(req,res)=>{
    try {
        const{email,password} = req.body

        const exists = await pool.query("SELECT * FROM users WHERE user_email = $1",[email])
        if(exists.rows.length===0){
            return res.status(401).json("Email Or Password Incorrect")
        }
        const valid = await bcrypt.compare(password,exists.rows[0].user_password)
        if(!valid){
            return res.status(401).json("Email or Password Incorrect")
        }

        const token = jwtGenerator(exists.rows[0].user_id)
        res.json({token})
    } catch (error) {
        console.log(error)
        return res.status(500).json("Internal Server Error")
    }
})



module.exports = router