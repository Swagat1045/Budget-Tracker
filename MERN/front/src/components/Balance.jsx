import React from 'react';

function Balance({ totalBalance, text, setText, amount, setAmount, date, setDate, type, setType, addTransaction }) {
  return (
    <div>
      <div className="balance">
        <h3><b>Balance: ₹{totalBalance}</b></h3>
        <br></br>
      </div>
      <div className="add-transaction mb-4">
        <h3>Add Transaction</h3>
        <label htmlFor="text">Text</label>
        <input type="text" className="form-control mb-3" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." />
        <label htmlFor="amount">Amount</label>
        <input type="number" className="form-control mb-3" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." />
        <label htmlFor="date">Date</label>
        <input type="date" className="form-control mb-3" value={date} onChange={(e) => setDate(e.target.value)} />
        <label htmlFor="type">Type</label>
        <select className="form-control mb-3" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
        </select>
        <button onClick={addTransaction} className="btn btn-primary btn-block">Add Transaction</button>
      </div>
    </div>
  );
}

export default Balance;
