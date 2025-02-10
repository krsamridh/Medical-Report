const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const url = 'mongodb://localhost:27017';
const dbName = 'medical_records';

app.post('/register', async (req, res) => {
  const { name, email, password, age } = req.body;

  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const usersCollection = db.collection('users');

    const result = await usersCollection.insertOne({
      name,
      email,
      password,
      age,
      dateRegistered: new Date()
    });

    client.close();

    res.status(201).json({ message: 'User registered successfully', userId: result.insertedId });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
