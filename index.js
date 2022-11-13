const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient } = require('mongodb');

const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());

// -------Database------------

const main = async () => {
  const uri = 'mongodb://localhost:27017';
  const client = new MongoClient(uri);
  try {
    const usersCollection = client.db('serverdb').collection('users');

    app.get('/users', async (req, res) => {
      const cursor = usersCollection.find({});
      const users = await cursor.toArray();
      // usersCollection.insertOne({ name: 'test', email: 'test@emai.com' });
      res.send(users);
    });
  } catch (error) {
    console.log(error);
  } finally {
  }
};

main().catch(console.error);

// -------Database------------

app.get('/', (req, res) => {
  res.send('Server running!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
