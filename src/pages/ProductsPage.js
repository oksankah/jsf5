import React, { useState, useEffect } from 'react';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');

  const API_URL = 'https://jsflab5.onrender.com/products';

  const fetchProducts = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Помилка завантаження даних');
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    
    const productData = {
      name: newName,
      price: Number(newPrice)
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      });

      if (response.ok) {
        setNewName('');
        setNewPrice('');
        fetchProducts(); 
        alert('Товар додано!');
      } else {
        alert('Помилка при додаванні');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="todo-container-wrapper">
      <div className="app-header">
        <h1>Список товарів</h1>
        <p>Дані з MongoDB</p>
      </div>

      <form onSubmit={handleAddProduct} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          placeholder="Назва товару" 
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          required
          style={{ padding: '8px', flex: 1 }}
        />
        <input 
          type="number" 
          placeholder="Ціна" 
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          required
          style={{ padding: '8px', width: '100px' }}
        />
        <button type="submit" className="login-btn">Додати</button>
      </form>

      {loading && <p>Завантаження...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <ul>
        {products.map((product) => (
          <li key={product._id} className="todo-item" style={{ justifyContent: 'space-between' }}>
            <span><strong>{product.name}</strong></span>
            <span style={{ color: '#28a745', fontWeight: 'bold' }}>{product.price} грн</span>
          </li>
        ))}
      </ul>
      
      {!loading && products.length === 0 && <p style={{textAlign: 'center'}}>Список порожній</p>}
    </div>
  );
};

export default ProductsPage;