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

## Middleware > authMiddleware

when a user is logged in, a session is created automatically  
and for his/her every next request we will check that he is logged in  
or not. If he is logged then we will find if the user object is existed in database.  
If it is presented in database then we'll bind the information of session with request object.
