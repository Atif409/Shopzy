const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// database connection
const connectDB = require('./connection/dbConnection');

// Route files
const phoneVerificationRoutes = require('./routes/phoneVerificationRoutes');
const customerRoutes = require('./routes/customerRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
const sendConnectionRequest = require('./routes/sendConnectionRequest');
const acceptConnectionRequest = require('./routes/acceptConnectionRequest');
const declineConnectionRequest = require('./routes/declineConnectionRequest');

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Route files
app.use('/phone-verification', phoneVerificationRoutes);
app.use('/customer', customerRoutes);
app.use('/seller', sellerRoutes);
app.use('/seller-connection-requests/send', sendConnectionRequest);
app.use('/seller-connection-requests/accept', acceptConnectionRequest);
app.use('/seller-connection-requests/decline', declineConnectionRequest);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log('Server is Running on port ', port);
});
