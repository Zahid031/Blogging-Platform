const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require("connect-mongodb-session")(session);

// Import Routes
const authRoutes = require('./routes/authRoute')
const dashboardRoutes = require('./routes/dashboardRoute')

// import middleware
const {bindUserWithRequest} = require('./middleware/authMiddleware');
const setLocals = require('./middleware/setLocals')

const MONGO_URI = "mongodb+srv://sabbir-veer:projectpass@cluster0.nxnywln.mongodb.net/?retryWrites=true&w=majority";

const store = new MongoDBStore({
  uri: MONGO_URI,
  collection: "sessions",
  expires: 1000 * 60 * 60 * 2
});

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
    express.json(),
    session({
      secret: process.env.SECRET_KEY || 'SECRET_KEY',
      resave: false,
      saveUninitialized: false,
      store: store
    }),
    bindUserWithRequest(),
    setLocals()
]
app.use(middleware);

app.use('/auth', authRoutes)
app.use('/dashboard', dashboardRoutes)


app.get('/', (req, res) => {
    res.json({
        message: 'Hello from the server!'
    })
})

const PORT = process.env.PORT || 8080

// database connection 
mongoose.connect(
  MONGO_URI,
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
