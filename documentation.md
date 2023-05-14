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

full application will be served from `app.js`

### Models in our project

- User
- Profile
- Post
- Comment

### Relationship hiararchy in our models

`User` -> `Profile` -> `Post` -> `Comment`
