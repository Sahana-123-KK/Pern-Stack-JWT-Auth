const express = require("express")
const app = express()
const cors = require("cors")
app.use(express.json())
app.use(cors())
const pool = require("./db")
app.get("/",(req,res)=>{
    res.json("Welcome to this backend Route")
})

app.use("/auth",require("./routes/jwtauth"))
app.use("/dashboard",require("./routes/dashboard"))
app.listen(8000,()=>{
    console.log("Connected To JWT Backend in PORT 8000...")
})

// Dont use 6000 Port ,it doesn't work