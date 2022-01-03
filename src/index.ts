import express from "express"
import { getConfig } from "./config"
import { getDatabaseConnection } from "./postgres"

const config = getConfig(process.env)
const { port, path, pgConnString} = config

const db = getDatabaseConnection(pgConnString)

const app = express();
const router = express.Router();

app.use(path, router)


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
});

