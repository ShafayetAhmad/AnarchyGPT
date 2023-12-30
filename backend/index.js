const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
app.use(express.json());

const { Client } = require("pg");
const client = new Client({
  host: process.env.DB_host,
  user: process.env.DB_user,
  port: process.env.DB_port,
  password: process.env.DB_password,
  database: process.env.DB_database,
});

client.connect();

app.get("/getUsers", (req, res) => {
  client.query("SELECT * FROM users", (err, result) => {
    if (!err) {
      res.json(result.rows);
    } else {
      res.status(500).json({ error: err.message });
    }
  });
});

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
