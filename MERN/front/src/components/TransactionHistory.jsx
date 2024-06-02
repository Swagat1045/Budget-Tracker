import React from 'react';

function TransactionHistory({ transactions, deleteTransaction }) {
  // Sort transactions by date in descending order (latest date first)
  const sortedTransactions = transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="transaction-history">
      <h3>Transaction History</h3>
      <ul className="list-group">
        {sortedTransactions.map(transaction => (
          <li key={transaction._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{transaction.text}</strong><br />
              <small className={transaction.amount >= 0 ? 'text-success' : 'text-danger'}>
                <strong>₹{transaction.amount.toFixed(2)}</strong>
              </small><br />
              <small className="text-muted">{transaction.date.split('T')[0]}</small>
            </div>
            <button onClick={() => deleteTransaction(transaction._id)} className="btn btn-danger btn-sm">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionHistory;

