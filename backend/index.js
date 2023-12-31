const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

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

app.post("/addUser", (req, res) => {
  const { email, username } = req.body;
  const userEmail = email.toLowerCase().replace(/\./g, "");
  client.query(
    `SELECT * FROM users WHERE email = $1`,
    [userEmail],
    (err, result) => {
      if (!err) {
        if (result.rows.length > 0) {
          res.status(409).json({ error: "Email already exists" });
        } else {
          client.query(
            `INSERT INTO users(username, email) VALUES($1, $2)`,
            [username, userEmail],
            (err, result) => {
              if (!err) {
                res.json(result.rows);
              } else {
                res.status(500).json({ error: err.message });
              }
            }
          );
        }
      } else {
        res.status(500).json({ error: err.message });
      }
    }
  );
});

app.post("/createConversation", (req, res) => {
  const { title, user, question } = req.body;
  const is_shared = false;
  console.log(title, user, question);
  const userEmail = user.toLowerCase().replace(/\./g, "");

  client.query(
    `SELECT * FROM users WHERE email = $1`,
    [userEmail],
    (err, userResult) => {
      if (!err) {
        if (userResult.rows.length > 0) {
          const userId = userResult.rows[0].user_id;
          console.log(userId);
          client.query(
            `INSERT INTO conversations (title, user_id, is_shared) VALUES ($1, $2, $3) RETURNING conversation_id`,
            [title, userId, is_shared],
            (err, conversationResult) => {
              if (!err) {
                client.query(
                  `INSERT INTO messages ( conversation_id, user_id, message_text) VALUES ($1, $2, $3)`,
                  [
                    conversationResult.rows[0].conversation_id,
                    userId,
                    question,
                  ],
                  (err, messageResult) => {
                    if (!err) {
                      res.json(messageResult.rows);
                    } else {
                      res.status(500).json({ error: err.message });
                    }
                  }
                );
              } else {
                res.status(500).json({ error: err.message });
              }
            }
          );
        } else {
          res.status(404).json({ error: "User not found" });
        }
      } else {
        res.status(500).json({ error: err.message });
      }
    }
  );
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
