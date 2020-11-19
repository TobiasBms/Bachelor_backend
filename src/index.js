const app = require("./http")
const db = require("./db")
require("dotenv").config()

async function initDb() {
  console.log(`Checking database connection...`)
  try {
    await db.authenticate()
    console.log("Database connection OK!")
  } catch (error) {
    console.log("Unable to connect to the database:")
    console.log(error.message)
    process.exit(1)
  }
}

async function init(port) {
  await initDb()
  console.log(`Starting server...`)
  app.listen(port, () => {
    console.log(`Server listening on port ${port}.`)
  })
}

init(process.env.HTTP_PORT)
