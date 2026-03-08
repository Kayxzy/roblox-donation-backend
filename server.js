const express = require("express")
const cors = require("cors")

const config = require("./config")
const donationRoutes = require("./routes/donation")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/sociabuzz", donationRoutes)

app.get("/", (req,res)=>{
  res.json({
    service:"Roblox Donation Backend",
    status:"running"
  })
})

app.listen(config.SERVER.PORT, ()=>{
  console.log("Server running on port", config.SERVER.PORT)
})
