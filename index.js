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

// ------------------------------------------------------------------------------------------------------

// Import Express
const { request } = require('express')
const { response } = require('express')
let express = require('express')

// Make a new Express App
let app = express()

// Let app parese JSON in HTTP request bodies
app.use(express.json())

// Root endpoint
app.get('/', (request, response) => {
  response.send("Hello, World!")
})

// Create
app.post('/roller-coaster', (request, response) => {
  let rollerCoaster = request.body
  RollerCoaster
    .create(rollerCoaster)
    .then(()=> response.send("Success"))
})
// Read One
app.get('/roller-coaster/:id', (request, response) => {
  response.send("Create a roller coaster " + request.params.id)
})
// Read All
app.get('/roller-coaster', (request, response) => {
  RollerCoaster
    .find()
    .then(rollerCoasters => response.json(rollerCoasters))
})
// Update
app.put('/roller-coaster/:id', (request, response) => {
  response.send("Update roller coaster " + request.params.id)
})
// Delete
app.delete('/roller-coaster/:id', (request, response) => {
  response.send("Delete roller coaster " + request.params.id)
})


// Create Server, listen on Port 9000
const PORT = 9000
let server = app.listen(PORT)

server.on('listening' , () => console.log("Listening on Port " + PORT))
server.on('error' , error => console.error("😢", error))