const express = require("express")
const router = express.Router()

const fs = require("fs")
const path = require("path")

const DB = path.join(__dirname,"../database/donations.json")

router.get("/get-donations",(req,res)=>{

  const data = JSON.parse(fs.readFileSync(DB))

  res.json({
    success:true,
    donations:data
  })

})

module.exports = router
