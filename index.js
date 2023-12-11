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

// Define a simple schema for a "shoe" collection (ODM)
const shoeSchema = new mongoose.Schema({
  name: { type: String, index: true },
  color: { type: String, index: true },
  brand: String,
  type: String,
  size: { type: String, index: true },
});

// create a model
const Entry = mongoose.model('shoe', shoeSchema);

// POST endpoint to add a new shoe
app.post('/add-entry', async (req, res) => {

  // create a new form for the relevant entries
  const { name, color, brand, type, size } = req.body;
  const newEntry = new Entry({ name, color, brand, type, size, });
  console.log(newEntry)

  // save the new entries to db
  try {
    await newEntry.save();
    console.log("good")
    res.status(201).json(newEntry);
  } catch (error) {
    console.error(error)
    console.log("bad")
    res.status(400).send(error);
  }
});

// GET endpoint to get shoe entries
app.get('/getFromDb', async(req, res) => {


  Entry.find()
  .then(shoes => res.json(shoes))
  .catch(err => res.json(err))

  // console.log(res.data)
  console.log("done")

})

app.post('/findByColor', async (req, res) => {
  try {
      console.log(req.body.color);
      const color = req.body.color; 

      // find all entries with the given color
      const entries = await Entry.find({ color: color }).exec(); 
      console.log("entries " + entries)
      // if entries are found, send them back to the client
      if (entries.length > 0) {
          return res.json(entries);
      } else {
        return res.json([]);
      }
  } catch (error) {
      // if there's an error, log it and return a server error status
      console.error("bad");
      res.status(500).send(error.message);
  }
});

app.post('/findByBrand', async (req, res) => {
  try {
      console.log(req.body.brand);
      const brand = req.body.brand; 

      // find all entries with the given color
      const entries = await Entry.find({ brand: brand }).exec(); // .exec() returns a true promise
      console.log("entries " + entries)
      // if entries are found, send them back to the client
      if (entries.length > 0) {
          return res.json(entries);
      } else {
          return res.json([]);
      }
  } catch (error) {
      // if there's an error, log it and return a server error status
      console.error("bad");
      res.status(500).send(error.message);
  }
});

app.post('/findByType', async (req, res) => {
  try {
      console.log(req.body.type);
      const type = req.body.type; 

      // find all entries with the given color
      const entries = await Entry.find({ type: type }).exec(); // .exec() returns a true promise
      console.log("entries " + entries)
      // if entries are found, send them back to the client
      if (entries.length > 0) {
          return res.json(entries);
      } else {
          return res.json([]);
      }
  } catch (error) {
      // if there's an error, log it and return a server error status
      console.error("bad");
      res.status(500).send(error.message);
  }
});

app.post('/findBySize', async (req, res) => {
  try {
      console.log(req.body.size);
      const size = req.body.size; 

      // find all entries with the given color
      const entries = await Entry.find({ size: size }).exec(); // .exec() returns a true promise
      console.log("entries " + entries)
      // if entries are found, send them back to the client
      if (entries.length > 0) {
          return res.json(entries);
      } else {
          return res.json([]);
      }
  } catch (error) {
      // if there's an error, log it and return a server error status
      console.error("bad");
      res.status(500).send(error.message);
  }
});

// POST endpoint to update an existing shoe
app.post('/update-entry', async (req, res) => {
  const { name, color, brand, type, size} = req.body;

  try {
    await Entry.updateOne({name : name}, {
      $set: {
        color: color,
        brand, brand,
        type, type,
        size, size
      }
    });
    console.log("good")
    // res.status(201).json(newEntry);
    return res.json({ status: "ok", data: "updated" })
  } catch (error) {
    console.error("bad")
    // res.status(400).send(error);
    res.status(500).send(error.message);
  }
});

//POST endpoint to delete an existing shoe
app.post('/delete-entry', async (req, res) => {
  
  const { name } = req.body;

  try {
    console.log(req.body)
    console.log(name)
    var foundEntry = await Entry.findOne({name : name});
    console.log(foundEntry)

    await Entry.deleteOne( {name : name} );
    console.log("good")
    return res.json({ status: "ok", data: "deleted" })
  } catch (error) {
    console.log("bad")
    console.error(error)
    // res.status(400).send(error);
    return res.json({ status: "fart", data: "bad" })
  }
});

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  // console.log(mongoUri)
  console.log(mongoose.version)
});
