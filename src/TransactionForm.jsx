import { useState } from 'react'

function TransactionForm({ categories, onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !(Number(amount) > 0)) return;

    onAdd({
      description,
      amount: Number(amount),
      type,
      category,
    });

    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("food");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field field-description">
        <label htmlFor="tx-description">Description</label>
        <input
          id="tx-description"
          type="text"
          placeholder="What was it for?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="field field-amount">
        <label htmlFor="tx-amount">Amount</label>
        <input
          id="tx-amount"
          type="number"
          min="0.01"
          step="0.01"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="field field-type">
        <label htmlFor="tx-type">Type</label>
        <select id="tx-type" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <div className="field field-category">
        <label htmlFor="tx-category">Category</label>
        <select id="tx-category" value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <button type="submit">Record entry</button>
    </form>
  );
}

export default TransactionForm
