const express = require('express');
const router = express.Router();
const Product = require('../models/Products');
const upload = require('../middleware/upload');

// Endpoint to add a new product
router.post('/add', upload.array('images', 10), async (req, res) => {
  try {
    const { name, description, category, price, quantity, sellerId } = req.body;
    const imageUrls = req.files.map(file => `/uploads/${file.filename}`);

    const newProduct = new Product({
      name,
      description,
      category,
      price,
      quantity,
      images: imageUrls,
      seller: sellerId,
    });

    await newProduct.save();
    console.log('Product added successfully:', newProduct);
    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Failed to add product' });
  }
});

// Endpoint to edit a product
router.put('/edit/:id', upload.array('images', 10), async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, description, category, price, quantity } = req.body;
    const imageUrls = req.files.map(file => `/uploads/${file.filename}`);

    const updatedProduct = await Product.findByIdAndUpdate(productId, {
      name,
      description,
      category,
      price,
      quantity,
      images: imageUrls,
    }, { new: true });

    console.log('Product updated successfully:', updatedProduct);
    res.status(200).json({ message: 'Product updated successfully', updatedProduct });
  } catch (error) {
    console.error('Error editing product:', error);
    res.status(500).json({ message: 'Failed to edit product' });
  }
});

// Endpoint to delete a product
router.delete('/delete/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    await Product.findByIdAndDelete(productId);
    console.log('Product deleted successfully:', productId);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Failed to delete product' });
  }
});

// Endpoint to get all products
router.get('/all', async (req, res) => {
  try {
    const products = await Product.find();
    console.log('All products fetched:', products.length);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

// Endpoint to get products by category
router.get('/category/:category', async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category });
    console.log(`Products fetched for category ${category}:`, products.length);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ message: 'Failed to fetch products by category' });
  }
});

// Endpoint to get products by seller
router.get('/seller/:sellerId', async (req, res) => {
  try {
    const sellerId = req.params.sellerId;
    const products = await Product.find({ seller: sellerId });
    console.log(`Products fetched for seller ${sellerId}:`, products.length);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products by seller:', error);
    res.status(500).json({ message: 'Failed to fetch products by seller' });
  }
});

// Helper function to get date 12 hours ago
const getDate12HoursAgo = () => {
  const date = new Date();
  date.setHours(date.getHours() - 12);
  return date;
};

// Endpoint to get new arrivals (products added in the last 12 hours)
router.get('/new-arrivals', async (req, res) => {
  try {
    const date12HoursAgo = getDate12HoursAgo();
    const products = await Product.find({ createdAt: { $gte: date12HoursAgo } });
    console.log('New arrivals fetched:', products.length);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching new arrivals:', error);
    res.status(500).json({ message: 'Failed to fetch new arrivals' });
  }
});


// Endpoint to get product by ID
router.get('/product/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ message: 'Failed to fetch product' });
  }
});

module.exports = router;
