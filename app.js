const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

// Import Routes
const authRoutes = require('./routes/authRoute')

// app calling
const app = express()

// setup view engine
app.set('view engine', 'ejs')
app.set('views', 'views')

// middleware array
const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({extended: true}),
    express.json()
]
app.use(middleware);

app.use('/auth', authRoutes)

app.get('/', (req, res) => {
    res.json({
        message: 'Hello from the server!'
    })
})

const PORT = process.env.PORT || 8080

// database connection
mongoose.connect(
  "mongodb+srv://sabbir-veer:projectpass@cluster0.nxnywln.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true })
  .then(() => {
      app.listen(PORT, ()=> {
        console.log('Database Connected!..');
        console.log(`app listening on port ${PORT}`);
      })
  })
  .catch(e => {
    return console.log(e);
  })
