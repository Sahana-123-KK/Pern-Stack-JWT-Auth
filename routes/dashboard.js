const pool = require("../db")
const checkAuthorized = require("../middlewares/authorization")

const router = require("express").Router()

router.get("/",checkAuthorized,async(req,res)=>{
    try {
        const userid = req.user
        const user = await pool.query("SELECT user_name FROM users WHERE user_id = $1",[userid])
        res.json(user.rows[0])
    } catch (error) {
        console.log(error)
        return res.status(500).json("Server Error")
    }
})

module.exports = router