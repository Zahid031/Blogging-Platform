# Club Management System

## Detailed Documentation

### Directories

> - **models** - to contain all models of our app
> - **controllers** - to contain all controllers
> - **views** - to contain all views or templating files
> - **routes** - to handle or serve all routes from here
> - **middleware** - to contain all necessary middlewares
> - **config** - to contain all production and development level config files
> - **utils** - to contain all custom utility tools developed by us
> - **validator** - to validate all types of authentication
> - **public** - to serve all types of public directory
> - **api** - to contain all REST api
> - **playground** - testing for validation

full application will be served from `app.js`

### Models in our project

- User
- Profile
- Post
- Comment

### Relationship hiararchy in our models

`User` -> `Profile` -> `Post` -> `Comment`

### Routes

1. authRoute
   - all auth related routes such as login, logout, signup will be handled here
2. dashboardRoute
   - only logged in users can access
3. routes
   - to handle all routes from this file

### Controllers

1. authController
   - authentication related functionalities will be exported from here
   - Controller functions
     - signupGetController
     - signupPostController
     - loginGetController
     - loginPostConrtoller
     - logoutController
2. dashboardController

### Views

    - pages/auth contains
        - login page
        - signup page
    -pages/dashboard
        - dashboard

    - partials
        - header
        - footer
        - navigation

### Third party libraries

    - bcrypt
    used for hashing password

### Validation

    - express-validator
    used for setting up validation of our system
    * folder structure
    - playground > validator.js

### Authentication with cookie and session

    packages used:
    - express-session
    - connect-mongodb-session

## Middleware

1. middleware
   - to handle and use all middlewares from this file
2. authMiddleware  
   when a user is logged in, a session is created automatically  
   and for his/her every next request we will check that he is logged in  
   or not. If he is logged then we will find if the user object is existed in database.  
   If it is presented in database then we'll bind the information of session with request object.

## utils > Flash

Flash is used to create alert message in view.  
The flash is a special area of the session used for storing messages.  
Messages are written to the flash and cleared after being displayed to the user.  
The flash is typically used in combination with redirects, ensuring that the message is  
available to the next page that is to be rendered.  
 package used:

- connect-flash  
  First, setup sessions as usual by enabling cookieParser and session middleware. Then, use flash middleware provided by connect-flash.

## Environment Variable

environment variable is used to make secure variables which don't have  
access outside of development environment or other users.  
Such as db username and db password can be stored as environment variables  
to make those variable secure.  
 package used:

- dotenv

## Config

configuration of development and production is applied here.  
 file formats:

- default.json  
  default rules will be written here
- development.json  
  configuration rules for development will be applied here
- production.json  
  configuration rules for production will be applied here
- custom-environment-variables.json  
  custom configuraton rules such as db username, password, secret key and so on

package used:

- config  
  this package identifies the value of NODE_ENV is either development or production and rest of the rules are applied based on it.

## Error handling and Debugging

package used:

- debug
  this npm package is used to print various types of errors and declarations in console.
  -chalk
  we can colorize different text in our console

* pages/error
  - 404.ejs
    this page serves 404 error that is requesting to access any route that doesn't exist
  - 500.ejs
    this page serves any kind of internal server error
  - both controller are applied in app.js file
