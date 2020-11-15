const express = require("express");
const bodyParser = require("body-parser");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();
const port = process.env.PORT || 3001;

const db = require("./queries");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/health", (req, res) => res.send("Hello world from backend"));
app.get("/products", db.getAllProducts);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
