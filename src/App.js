import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [entry, setEntry] = useState({ name: '', color: '', brand: '', type: '', size: ''});
  const [name, setName] = useState( {name : ''} );
  const [color, setColor] = useState( {color : ''} );
  const [brand, setBrand] = useState( {brand : ''} );
  const [type, setType] = useState( {type : ''} );
  const [size, setSize] = useState( {size : ''} );
  const [shoes, setShoes] = useState([]);

  useEffect(()=> {
    axios.get('http://localhost:5000/getFromDb')
    .then(shoes => setShoes(shoes.data))
    .catch(err => console.log(err))
    console.log(shoes)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/add-entry', entry);
      console.log(response.data);
      setEntry({ name: '', color: '', brand: '', type: '', size: ''}); // Clear the form
      alert('Entry added!');
      axios.get('http://localhost:5000/getFromDb')
      .then(shoes => setShoes(shoes.data))
      .catch(err => console.log(err))
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/update-entry', entry);
      console.log(response.data);
      setEntry({ name: '', color: '', brand: '', type: '', size: ''}); // Clear the form
      alert('Entry updated!');
      axios.get('http://localhost:5000/getFromDb')
      .then(shoes => setShoes(shoes.data))
      .catch(err => console.log(err))
    } catch (error) {
      alert('Entry doesn\'t exist!')
      console.error('There was an error!', error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      console.log(name)
      const response = await axios.post('/delete-entry', name)
      console.log(response.data);
      setName({name : ''}); // Clear the form
      alert('Entry deleted!');
      axios.get('http://localhost:5000/getFromDb')
      .then(shoes => setShoes(shoes.data))
      .catch(err => console.log(err))
    } catch (error) {
      alert('Entry doesn\'t exist!')
      console.error('There was an error!', error);
    }
  };

  const handleColor = async (e) => {
    e.preventDefault();

    try {
      console.log(color)
      // send a post call w/ color as parameter
      await axios.post('/findByColor', {
        color: color.color,
      })
      .then(
        shoes => setShoes(shoes.data)
      )
      .catch(err => console.log(err))
      setColor({color : ''}); // Clear the form
    } catch (error) {
      alert('Entry doesn\'t exist!')
      console.error('There was an error!', error);
    }
  };

  const handleBrand = async (e) => {
    e.preventDefault();

    try {
      console.log(brand)
      // send a post call w/ color as parameter
      await axios.post('/findByBrand', {
        brand: brand.brand,
      })
      .then(
        shoes => setShoes(shoes.data)
      )
      .catch(err => console.log(err))
      setBrand({brand : ''}); // Clear the form
    } catch (error) {
      alert('Entry doesn\'t exist!')
      console.error('There was an error!', error);
    }
  };
  
  const handleType = async (e) => {
    e.preventDefault();

    try {
      console.log(type)
      // send a post call w/ color as parameter
      await axios.post('/findByType', {
        type: type.type,
      })
      .then(
        shoes => setShoes(shoes.data)
      )
      .catch(err => console.log(err))
      setType({type : ''}); // Clear the form
    } catch (error) {
      alert('Entry doesn\'t exist!')
      console.error('There was an error!', error);
    }
  };

  const handleSize = async (e) => {
    e.preventDefault();

    try {
      console.log(size)
      // send a post call w/ color as parameter
      await axios.post('/findBySize', {
        size: size.size,
      })
      .then(
        shoes => setShoes(shoes.data)
      )
      .catch(err => console.log(err))
      setSize({size : ''}); // Clear the form
    } catch (error) {
      alert('Entry doesn\'t exist!')
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

      <div className="w-100 vh-100 d-flex justify-contentcneter align-items-center">
        <div className="w-50">
      <h1> Your shoes </h1>
      <table>
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Color
            </th>
            <th>
              Brand
            </th>
            <th>
              Type
            </th>
            <th>
              Size
            </th>
          </tr>
        </thead>
        <tbody>

          {
            Array.isArray(shoes) && shoes.map(shoes => {
              return <tr>
                <td>{shoes.name}</td>
                <td>{shoes.color}</td>
                <td>{shoes.brand}</td>
                <td>{shoes.type}</td>
                <td>{shoes.size}</td>
              </tr>
            })
          }

        </tbody>
      </table>
      </div>
      
      </div>

      <h1> Find By Color </h1>
      <form onSubmit={handleColor}>
        <input
          type="text"
          value={color.color}
          onChange={(e) => setColor( {...color, color: e.target.value })}
          placeholder="Color"
          required
        />
      <button type="submit">Find Shoe</button>
      </form>

      <h1> Find By Brand </h1>
      <form onSubmit={handleBrand}>
        <input
          type="text"
          value={brand.brand}
          onChange={(e) => setBrand( {...brand, brand: e.target.value })}
          placeholder="Brand"
          required
        />
      <button type="submit">Find Shoe</button>
      </form>

      <h1> Find By Type </h1>
      <form onSubmit={handleType}>
        <input
          type="text"
          value={type.type}
          onChange={(e) => setType( {...type, type: e.target.value })}
          placeholder="Type"
          required
        />
      <button type="submit">Find Shoe</button>
      </form>

      <h1> Find By Size </h1>
      <form onSubmit={handleSize}>
        <input
          type="text"
          value={size.size}
          onChange={(e) => setSize( {...size, size: e.target.value })}
          placeholder="Type"
          required
        />
      <button type="submit">Find Shoe</button>
      </form>

      <h1>Update Shoe</h1>

      <form onSubmit={handleUpdate}>
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
        <button type="submit">Update Shoe</button>
      </form>

    <h1>Delete Shoe</h1>

  <form onSubmit={handleDelete}>
    <input
      type="text"
      value={name.name}
      onChange={(e) => setName( {...name, name: e.target.value })}
      placeholder="Name"
      required
    />
  <button type="submit">Delete Shoe</button>
  </form>
    </div>
  );
}

export default App;
