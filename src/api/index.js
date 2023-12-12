const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");
const url = 'mongodb+srv://shopzy:shopzyOwner123@shopzy.ikdh2qm.mongodb.net/'
mongoose.connect(url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(
    () => {
        console.log("Connected to MongoDB")
    }
).catch(
    (err) => {
        console.log("Connecting to MongoDb Failed!", err);
    }
);

app.listen(port, () => {
    console.log("Server is Running on port ", port);
})

//endpoint to register in the app