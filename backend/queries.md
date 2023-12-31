<b>Users Table Creation Query:</b>

```
CREATE TABLE Users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);
```

<b>Conversations Table Creation Query:</b>

```
CREATE TABLE Conversations (
  conversation_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES Users(user_id),
  is_shared BOOLEAN DEFAULT false
);
```

<b>Messages Table Creation Query:</b>

```
CREATE TABLE Messages (
  message_id SERIAL PRIMARY KEY,
  conversation_id INTEGER REFERENCES Conversations(conversation_id),
  user_id INTEGER REFERENCES Users(user_id),
  message_text TEXT,
  timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
```
