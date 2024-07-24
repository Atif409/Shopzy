const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const connectDB = require('./connection/dbConnection');
const phoneVerificationRoutes = require('./routes/phoneVerificationRoutes');
const customerRoutes = require('./routes/customerRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
const productRoutes = require('./routes/productRoutes');
const messageRoutes = require('./routes/messageRoutes');
const borrowRoutes = require('./routes/borrowRoutes');
const cart = require('./routes/cart')
const order= require('./routes/orderRoutes')


const app = express();
const port = 8000;

// Create an HTTP server and wrap the Express app
const server = http.createServer(app);

// Attach Socket.IO to the server
const io = socketIo(server);

// Middleware
app.use(cors({
    origin: 'http://192.168.43.92:8000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
connectDB();

// Attach the Socket.IO instance to the Express app
app.set('socketio', io);

// Route files
app.use('/phone-verification', phoneVerificationRoutes);
app.use('/customer', customerRoutes);
app.use('/seller', sellerRoutes);
app.use('/products', productRoutes);
app.use('/messages', messageRoutes);
app.use('/borrow', borrowRoutes)
app.use('/cart', cart)
app.use('/order', order)
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Listen with the HTTP server instead of the Express app
server.listen(port, () => {
  console.log('Server is running on port', port);
});
