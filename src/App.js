import React, { useState } from 'react';
import { Routes, Route, NavLink, Link } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';

const SiteHeader = ({ isAuth, onLogout }) => (
  <header className="site-header">
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

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth') === 'true');

  const handleLogin = () => {
    localStorage.setItem('isAuth', 'true');
    setIsAuth(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuth');
    setIsAuth(false);
  };

  return (
    <div className="app-container">
      <SiteHeader isAuth={isAuth} onLogout={handleLogout} />
      <main className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route 
            path="/profile"
            element={
              <ProtectedRoute isAuth={isAuth}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <footer className="footer">© 2025. Всі права захищені.</footer>
    </div>
  );
}

export default App;