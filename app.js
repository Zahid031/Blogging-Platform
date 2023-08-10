require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");
const config = require('config')

// Import Routes
const authRoutes = require("./routes/authRoute");
const dashboardRoutes = require("./routes/dashboardRoute");

// playground routes
// const validatorRoute = require('./playground/validator')

// import middleware
const { bindUserWithRequest } = require("./middleware/authMiddleware");
const setLocals = require("./middleware/setLocals");

// sabbir-veer projectpass
const MONGO_URI = `mongodb+srv://${config.get('db-username')}:${config.get('db-password')}@cluster0.nxnywln.mongodb.net/?retryWrites=true&w=majority`;

const store = new MongoDBStore({
  uri: MONGO_URI,
  collection: "sessions",
  expires: 1000 * 60 * 60 * 2,
});

// app calling
const app = express();

// console.log(process.env.NODE_ENV);
// console.log(app.get('env'));
// const config = require('./config/config')
// if(app.get('env').toLowerCase() === 'development') {
//   console.log(config.dev.name);
// } else {
//   console.log(config.prod.name);
// }
console.log(config.get('name'));

// setup view engine
app.set("view engine", "ejs");
app.set("views", "views");

// middleware array
const middleware = [
  morgan("dev"),
  express.static("public"),
  express.urlencoded({ extended: true }),
  express.json(),
  session({
    secret: config.get('secret'),
    resave: false,
    saveUninitialized: false,
    store: store,
  }),
  bindUserWithRequest(),
  setLocals(),
  flash(),
];
app.use(middleware);

app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);
// app.use('/playground', validatorRoute)

app.get("/", (req, res) => {
  res.json({
    message: "Hello from the server!",
  });
});

const PORT = process.env.PORT || 8080;

// database connection
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database Connected!..");
      console.log(`app listening on port ${PORT}`);
    });
  })
  .catch((e) => {
    return console.log(e);
  });
