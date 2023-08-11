const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const flash = require('connect-flash')
const config = require("config");
const MongoDBStore = require("connect-mongodb-session")(session);
const {bindUserWithRequest} = require('./authMiddleware')
const setLocals = require('./setLocals')

const MONGO_URI = `mongodb+srv://${config.get("db-username")}:${config.get(
  "db-password"
)}@cluster0.nxnywln.mongodb.net/?retryWrites=true&w=majority`;

const store = new MongoDBStore({
  uri: MONGO_URI,
  collection: "sessions",
  expires: 1000 * 60 * 60 * 2,
});

const middleware = [
  morgan("dev"),
  express.static("public"),
  express.urlencoded({ extended: true }),
  express.json(),
  session({
    secret: config.get("secret"),
    resave: false,
    saveUninitialized: false,
    store: store,
  }),
  flash(),
  bindUserWithRequest(),
  setLocals()
];

module.exports = app => {
    middleware.forEach(m => {
        app.use(m)
    })
}