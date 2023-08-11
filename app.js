require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const config = require('config')
const chalk = require('chalk')

const setMiddleware = require('./middleware/middleware')
const setRoutes = require('./routes/routes')


const MONGO_URI = `mongodb+srv://${config.get('db-username')}:${config.get('db-password')}@cluster0.nxnywln.mongodb.net/?retryWrites=true&w=majority`;


// app calling
const app = express();

// setup view engine
app.set("view engine", "ejs");
app.set("views", "views");

// Using middleware from middleware directory
setMiddleware(app)
// Using routes from route directory
setRoutes(app)

app.use((req, res, next) => {
  let error = new Error('404 Page Not Found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  if(error.status === 404) {
    return res.render('pages/error/404', {flashMessage: {}})
  }
  console.log(chalk.red.inverse(error.message));
  console.log(error);
  res.render('pages/error/500', {flashMessage: {}})
})

const PORT = process.env.PORT || 8080;

// database connection
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(chalk.green('Database Connected!..'));
      console.log(chalk.blue(`app listening on port ${PORT}`));
    });
  })
  .catch((e) => {
    return console.log(e);
  });
