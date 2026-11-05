import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { onLogin } from '../redux/actions/authActions';

function LoginPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(
    location.state?.registrationSuccess ? 'Registration successful. Please sign in.' : '',
  );

  function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSuccess('');

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !password) {
      setError('Please enter both your email and password.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    let users;
    try {
      const savedUsers = JSON.parse(localStorage.getItem('userArr') || '[]');
      users = Array.isArray(savedUsers) ? savedUsers : [];
    } catch {
      setError('Could not read saved accounts. Please register again.');
      setPassword('');
      return;
    }

    const matchedUser = users.find(
      (user) =>
        String(user.email || '').trim().toLowerCase() === normalizedEmail &&
        user.password === password,
    );

    if (!matchedUser) {
      setError('Email or password is incorrect. Please try again.');
      setPassword('');
      return;
    }

    const currentUser = {
      fullName: matchedUser.fullName || matchedUser.name || '',
      email: matchedUser.email,
      phone: matchedUser.phone || '',
    };

    try {
      localStorage.setItem('userInfo', JSON.stringify(currentUser));
      dispatch(onLogin(currentUser));
      setSuccess(`Welcome, ${currentUser.fullName || currentUser.email}!`);
      setPassword('');
    } catch {
      setError('Could not save your sign-in state in this browser.');
    }
  }

  return (
    <main
      className="auth-page"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/banner1.jpg)` }}
    >
      <section className="auth-card auth-card--signin" aria-labelledby="signin-title">
        <h1 id="signin-title">Sign In</h1>
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            aria-label="Email"
            autoComplete="email"
            required
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            aria-label="Password"
            autoComplete="current-password"
            required
          />
          {error && <p className="auth-error" role="alert">{error}</p>}
          {success && <p className="auth-success" role="status">{success}</p>}
          <button className="auth-submit" type="submit">SIGN IN</button>
        </form>
        <p className="auth-switch">
          Create an account? <Link to="/register">Sign up</Link>
        </p>
        {success && (
          <p className="auth-continue">
            <Link to="/">Continue to the store</Link>
          </p>
        )}
      </section>
    </main>
  );
}

export default LoginPage;
