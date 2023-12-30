const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();

const { Client } = require("pg");
const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "kanon890@",
  database: "postgres",
});

client.connect();

client.query("SELECT * FROM users", (err, res) => {
  if (!err) {
    console.log(res.rows);
  } else {
    console.log(err);
  }
});
