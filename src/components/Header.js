import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Header = ({ isAuth, onLogout }) => {
  return (
    <header className="header">
      <nav>
        <NavLink to="/">Головна</NavLink>
        <NavLink to="/news">Новини</NavLink>
        <NavLink to="/profile">Профіль</NavLink>
      </nav>
      <div className="auth-controls">
        {isAuth ? (
          <button onClick={onLogout} className="logout-btn">Вийти</button>
        ) : (
          <Link to="/login" className="login-btn">Увійти</Link>
        )}
      </div>
    </header>
  );
};

export default Header;