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
  const { title, user } = req.body;
  const is_shared = false;
  console.log(title, user);
  const userEmail = user.toLowerCase().replace(/\./g, "");

  client.query(
    `SELECT * FROM users WHERE email = $1`,
    [userEmail],
    (err, userResult) => {
      if (!err) {
        if (userResult.rows.length > 0) {
          const userId = userResult.rows[0].user_id;

          client.query(
            `INSERT INTO conversations (title, user_id, is_shared) VALUES ($1, $2, $3) RETURNING conversation_id`,
            [title, userId, is_shared],
            (err, conversationResult) => {
              if (!err) {
                var convId = conversationResult.rows[0].conversation_id;
                console.log(convId);
                res.json(convId);
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

app.post("/askFirstMessage", (req, res) => {
  const { conversationId, title, email } = req.body;

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let answerMessage = [];
  let answerText = "";

  for (let i = 0; i < 200; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    answerText += characters.charAt(randomIndex);
  }

  client.query(
    `UPDATE conversations SET title = $1 WHERE conversation_id = $2`,
    [title, conversationId],
    (err, result) => {
      if (!err) {
        const userEmail = email.toLowerCase().replace(/\./g, "");
        client.query(
          `SELECT user_id FROM users WHERE email = $1`,
          [userEmail],
          (err, userResult) => {
            if (!err) {
              const userId = userResult.rows[0].user_id;
              client.query(
                `INSERT INTO messages (conversation_id, message_text, user_id) VALUES ($1, $2, $3) RETURNING *`,
                [conversationId, title, userId],
                (err, questionResult) => {
                  answerMessage.push(questionResult.rows[0]);
                  if (!err) {
                    client.query(
                      `INSERT INTO messages (conversation_id, message_text, user_id) VALUES ($1, $2, $3) RETURNING *`,
                      [conversationId, answerText, 3],
                      (err, answerResult) => {
                        answerMessage.push(answerResult.rows[0]);
                        if (!err) {
                          console.log(answerMessage);
                          res.json(answerMessage);
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
              res.status(500).json({ error: err.message });
            }
          }
        );
      } else {
        res.status(500).json({ error: err.message });
      }
    }
  );
});

app.get("/getConversations", (req, res) => {
  client.query(`SELECT * FROM conversations`, (err, result) => {
    if (!err) {
      console.log(result.rows);
      res.json(result.rows);
    } else {
      res.status(500).json({ error: err.message });
    }
  });
});

app.get("/getMessages", (req, res) => {
  const conversationId = req.query.conversationId;
  client.query(
    `SELECT * FROM messages WHERE conversation_id = $1 ORDER BY message_id ASC`,
    [conversationId],
    (err, result) => {
      if (!err) {
        console.log(result.rows);
        res.json(result.rows);
      } else {
        res.status(500).json({ error: err.message });
      }
    }
  );
});

app.post("/addMessage", async (req, res) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let answerMessage = [];
  let answerText = "";

  for (let i = 0; i < 200; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    answerText += characters.charAt(randomIndex);
  }

  const { conversationId, question } = req.body;

  client.query(
    `SELECT user_id FROM conversations WHERE conversation_id = $1`,
    [conversationId],
    (err, userResult) => {
      if (!err) {
        console.log(conversationId, question, userResult.rows[0].user_id);
        client.query(
          `INSERT INTO messages (conversation_id, message_text, user_id ) VALUES ($1, $2, $3) RETURNING *`,
          [conversationId, question, userResult.rows[0].user_id],
          (err, conversationResult1) => {
            if (!err) {
              answerMessage.push(conversationResult1.rows[0]);
              client.query(
                `INSERT INTO messages (conversation_id, message_text, user_id ) VALUES ($1, $2, $3) RETURNING *`,
                [conversationId, answerText, 3],
                (err, conversationResult2) => {
                  if (!err) {
                    answerMessage.push(conversationResult2.rows[0]);
                    console.log(answerMessage);
                    res.json(answerMessage);
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
