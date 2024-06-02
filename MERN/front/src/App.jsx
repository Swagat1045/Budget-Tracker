import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Balance from './components/Balance';
import TransactionHistory from './components/TransactionHistory';
import ContactUs from './components/ContactUs';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('credit'); // Default to credit type

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await axios.get('http://localhost:5000/transactions');
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    }

    fetchTransactions();
  }, []);

  const addTransaction = async () => {
    if (text.trim() === '' || amount.trim() === '' || date.trim() === '') {
      alert('Please enter text, amount, and date');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/transactions', {
        text,
        amount: (type === 'credit' ? +amount : -amount), // Adjust amount based on type
        date,
        type
      });

      setTransactions([...transactions, response.data]);
      setText('');
      setAmount('');
      setDate('');
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/transactions/${id}`);
      setTransactions(transactions.filter(transaction => transaction._id !== id));
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const totalBalance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0).toFixed(2);

  return (
    <Router>
      <div className="d-flex">
        <div className="sidebar bg-light p-3">
          <h2>Menu</h2>
          <ul className="list-unstyled">
            <li><Link to="/balance">Balance</Link></li>
            <li><Link to="/transaction-history">Transaction History</Link></li>
            <li><Link to="/contact-us">Contact Us</Link></li>
          </ul>
        </div>
        <div className="content p-4 flex-grow-1">
          <Routes>
            <Route path="/balance" element={
              <Balance
                totalBalance={totalBalance}
                text={text}
                setText={setText}
                amount={amount}
                setAmount={setAmount}
                date={date}
                setDate={setDate}
                type={type}
                setType={setType}
                addTransaction={addTransaction}
              />
            } />
            <Route path="/transaction-history" element={
              <TransactionHistory
                transactions={transactions}
                deleteTransaction={deleteTransaction}
              />
            } />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/" element={<h2>Welcome to the Budget Tracker</h2>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
