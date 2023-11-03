const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://nmma:gxcf2We89325@mongocluster.41ne6cn.mongodb.net/shoes?retryWrites=true&w=majority";

const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Replace 'mydatabase' with your database name and use your MongoDB URI if not local
const mongoUri = uri;
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define a simple schema for a "shoe" collection
const shoeSchema = new mongoose.Schema({
  name: String,
  color: String,
  brand: String,
  type: String,
  size: String,
});
const Entry = mongoose.model('shoe', shoeSchema);

// POST endpoint to add a new shoe
app.post('/add-entry', async (req, res) => {
  const { name, color, brand, type, size} = req.body;
  const newEntry = new Entry({ name, color, brand, type, size, });

  try {
    await newEntry.save();
    console.log("good")
    res.status(201).json(newEntry);
  } catch (error) {
    console.log("bad")
    res.status(400).send(error);
  }
});

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(mongoose.version)
});
