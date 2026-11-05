import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const USERS_STORAGE_KEY = 'userArr';

function RegisterPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setError('');

    const formData = new FormData(event.currentTarget);
    const fullName = String(formData.get('fullName') || '').trim();
    const email = String(formData.get('email') || '').trim().toLowerCase();
    const password = String(formData.get('password') || '');
    const phone = String(formData.get('phone') || '').trim();

    if (!fullName || !email || !password.trim() || !phone) {
      setError('Please complete all fields.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length <= 8) {
      setError('Password must be more than 8 characters.');
      return;
    }

    try {
      const storedUsers = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
      const users = Array.isArray(storedUsers) ? storedUsers : [];
      const emailExists = users.some(
        (user) => String(user.email || '').trim().toLowerCase() === email,
      );

      if (emailExists) {
        setError('This email is already registered.');
        return;
      }

      users.push({ fullName, email, password, phone });
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
      navigate('/login', { state: { registrationSuccess: true } });
    } catch (storageError) {
      setError('Could not save your account in this browser. Please try again.');
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="signup-title">
        <h1 id="signup-title">Sign Up</h1>
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            aria-label="Full Name"
            autoComplete="name"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            aria-label="Email"
            autoComplete="email"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            aria-label="Password"
            autoComplete="new-password"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            aria-label="Phone"
            autoComplete="tel"
            required
          />
          {error && <p className="auth-error" role="alert">{error}</p>}
          <button className="auth-submit" type="submit">SIGN UP</button>
        </form>
        <p className="auth-switch">
          Login? <Link to="/login">Click</Link>
        </p>
      </section>
    </main>
  );
}

export default RegisterPage;
