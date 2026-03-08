const express = require("express")
const router = express.Router()

const fs = require("fs")
const path = require("path")

const config = require("../config")

const DB_PATH = path.join(__dirname,"../database/donations.json")

let processedIds = new Set()

function readDB(){
  if(!fs.existsSync(DB_PATH)){
    fs.writeFileSync(DB_PATH, JSON.stringify([]))
  }
  return JSON.parse(fs.readFileSync(DB_PATH))
}

function saveDB(data){
  fs.writeFileSync(DB_PATH, JSON.stringify(data,null,2))
}

router.post("/webhook",(req,res)=>{

  const token = req.query.token

  if(token !== config.WEBHOOK.TOKEN){
    return res.status(403).json({success:false})
  }

  const donations = readDB()

  const donationId = req.body.id || Date.now().toString()

  if(processedIds.has(donationId)){
    return res.json({success:true,duplicate:true})
  }

  processedIds.add(donationId)

  let message = req.body.message || ""

  if(message.length > config.DONATION.MAX_MESSAGE_LENGTH){
    message = message.slice(0, config.DONATION.MAX_MESSAGE_LENGTH)
  }

  const donation = {
    id: donationId,
    nama: req.body.name || "Anonymous",
    amount: Number(req.body.amount) || 0,
    message: message,
    timestamp: new Date().toISOString()
  }

  donations.push(donation)

  saveDB(donations)

  console.log("New donation:", donation.nama, donation.amount)

  res.json({success:true})

})

router.get("/get-donations",(req,res)=>{

  const donations = readDB()

  res.json({
    success:true,
    donations:donations
  })

})

module.exports = router
