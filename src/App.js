import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [entry, setEntry] = useState({ name: '', color: '', brand: '', type: '', size: ''});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/add-entry', entry);
      console.log(response.data);
      setEntry({ name: '', color: '', brand: '', type: '', size: ''}); // Clear the form
      alert('Entry added!');
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <div className="App">
      <h1>Add a Shoe</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={entry.name}
          onChange={(e) => setEntry({ ...entry, name: e.target.value })}
          placeholder="Name"
          required
        />
        <input
          type="text"
          value={entry.color}
          onChange={(e) => setEntry({ ...entry, color: e.target.value })}
          placeholder="Color"
          required
        />
        <input
          type="text"
          value={entry.brand}
          onChange={(e) => setEntry({ ...entry, brand: e.target.value })}
          placeholder="Brand"
          required
        />
        <input
          type="text"
          value={entry.type}
          onChange={(e) => setEntry({ ...entry, type: e.target.value })}
          placeholder="Type"
          required
        />
        <input
          type="text"
          value={entry.size}
          onChange={(e) => setEntry({ ...entry, size: e.target.value })}
          placeholder="Size"
          required
        />
        <button type="submit">Add Shoe</button>
      </form>
    </div>
  );
}

export default App;
