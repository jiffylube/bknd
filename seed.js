// Import Mongoose library
let mongoose = require("mongoose")

// Connect to MongoDB
let mongooseConfig = { useNewUrlParser: true, useUnifiedTopology:true }
mongoose.connect("mongodb://127.0.0.1:27017/bknd", mongooseConfig)

// Event Listeners
mongoose.connection.on('connected', () => console.log("Connected to database"))
mongoose.connection.on('disconnected', () => console.log("Disconnected from database"))
mongoose.connection.on('error', error => console.error("Database error", error))

// Create Mongoose Model
let RollerCoaster = mongoose.model('RollerCoaster', mongoose.Schema({
  name: String,
  year: Number,
  speed: Number
}))

let RollerCoasters = 
  [
    {
      name: "Formula Rosa",
      year: 2010,
      speed: 149.1
    },
    {
      name: "Top Thrill Dragster",
      year: 2003,
      speed: 120
    },
    {
      name: "Kingda Ka",
      year: 2005,
      speed: 128
    }
  ]

// Insert Data into database
RollerCoaster
  .deleteMany({})
  .then(() => RollerCoaster.create(RollerCoasters))
  .then(() => {
    console.log("Inserted roller coaster")
    mongoose.connection.close()
  })
  .catch(error => { console.error("Error inserting roller coaster", error) })