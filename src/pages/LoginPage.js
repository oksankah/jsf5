import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'Admin' && password === '12345') {
      onLogin();
      navigate('/profile'); 
    } else {
      setError('Ім\'я користувача або пароль введені не вірно');
    }
  };

  return (
    <div>
      <h1>Вхід на сайт</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Ім'я користувача:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Пароль:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Увійти</button>
      </form>
    </div>
  );
};

export default LoginPage;