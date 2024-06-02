
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://Swagat:Swagat10.@cluster0.ur1ca0m.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once('open', () => console.log('Connected to MongoDB'));

// Transaction Schema
const transactionSchema = new mongoose.Schema({
  text: String,
  amount: Number,
  date: Date // Added date field
});

const Transaction = mongoose.model('Transaction', transactionSchema);

// Routes
// Get all transactions
app.get('/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a transaction
app.post('/transactions', async (req, res) => {
  const { text, amount, category, date } = req.body;
  if (!text || !amount || !date) {
    return res.status(400).json({ message: 'Text, amount, and date are required' });
  }

  try {
    const newTransaction = new Transaction({
      text,
      amount,
      date
    });

    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a transaction
app.delete('/transactions/:id', async (req, res) => {
  try {
    await Transaction.findByIdAndRemove(req.params.id);
    res.json({ message: 'Transaction deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start server
app.listen(5000);