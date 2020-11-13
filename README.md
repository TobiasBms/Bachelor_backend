# Bachelor Backend
Backend for bachelor project. Frontend project is located [here](https://github.com/TobiasBms/Bachelor_frontend).

This project is a REST API built in Node.js with [Restify](http://restify.com/) and [Sequelize](https://sequelize.org/). It uses a MySQL database.

## Setting up local environment
### Requirements
The project requires Node.js and a MySQL server.

### Set up project
Clone repository
```
git clone https://github.com/TobiasBms/Bachelor_backend
```
Install packages
```
npm install
```
Compile and start local server with hot reload
```
npm start
```

### Configuration
The project uses [dotenv](https://github.com/motdotla/dotenv) to load environment from a `.env` file. A sample `.env.sample` file is included in the project. Rename the file to `.env` and fill in your connection details.
```
HTTP_PORT=3001
DB_HOST="localhost"
DB_USERNAME="root"
DB_PASSWORD=""
DB_SCHEMA="test"
```

### Set up database
Execute `db.sql` to set up the database schema.
```
mysql -h DB_HOST -u DB_USERNAME -p DB_PASSWORD DB_SCHEMA < db.sql
```

## Project structure
Here is the project shown in a tree structure with important files highlighted.
```
bachelor_backend
|   README.md - This file
|   package.json - Project dependencies and metadata
|
\---src - Application source code
    |   index.js - Initializes database connection and starts node server
    |
    +---db - Database connection and models
    |   |   index.js - Exports Sequelize db instance and creates models and associations
    |   |
    |   +---associations - Relationships between models
    |   |   index.js - Exports function to dynamically apply all associations
    |   |
    |   \---models - Sequelize model definitions
    |       index.js - Exports all model definitions
    |               
    \---http - REST API
        |   index.js - Exports Restify server, registers middleware and routes
        |   utils.js - Exports utility functions for the API
        |
        \---routes - Routes/controllers that expose CRUD operations
```