import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onLogout } from '../redux/actions/authActions';

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const user = useSelector((state) => state.auth.user);

  const goTo = (path) => navigate(path);
  const isActive = (path) => pathname === path;

  function handleLogout() {
    localStorage.removeItem('userInfo');
    dispatch(onLogout());
    navigate('/');
  }

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <div className="navbar__group navbar__group--left">
          <button
            className={`navbar__button${isActive('/') ? ' is-active' : ''}`}
            onClick={() => goTo('/')}
            type="button"
          >
            Home
          </button>
          <button
            className={`navbar__button${isActive('/shop') ? ' is-active' : ''}`}
            onClick={() => goTo('/shop')}
            type="button"
          >
            Shop
          </button>
        </div>

        <button
          className="navbar__brand"
          onClick={() => goTo('/')}
          type="button"
          aria-label="Boutique home"
        >
          BOUTIQUE
        </button>

        <div className="navbar__group navbar__group--right">
          <button
            className={`navbar__button navbar__button--icon${isActive('/cart') ? ' is-active' : ''}`}
            onClick={() => goTo('/cart')}
            type="button"
          >
            <svg className="navbar-icon--cart" aria-hidden="true" viewBox="0 0 24 24">
              <path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 1.9-1.4L22 9H7" />
              <circle cx="10" cy="20" r="1.4" />
              <circle cx="18" cy="20" r="1.4" />
            </svg>
            Cart
          </button>
          {user ? (
            <>
              <span className="navbar__identity" aria-label={`Signed in as ${user.fullName || user.email}`}>
                <svg className="navbar-icon--user" aria-hidden="true" viewBox="0 0 24 24">
                  <circle cx="12" cy="7" r="4" />
                  <path d="M4 21v-2a8 8 0 0 1 16 0v2z" />
                </svg>
                {user.fullName || user.email}
                <span className="navbar__caret" aria-hidden="true">▾</span>
              </span>
              <button className="navbar__logout" onClick={handleLogout} type="button">
                ( Logout )
              </button>
            </>
          ) : (
            <button
              className={`navbar__button navbar__button--icon${isActive('/login') ? ' is-active' : ''}`}
              onClick={() => goTo('/login')}
              type="button"
            >
              <svg className="navbar-icon--user" aria-hidden="true" viewBox="0 0 24 24">
                <circle cx="12" cy="7" r="4" />
                <path d="M4 21v-2a8 8 0 0 1 16 0v2z" />
              </svg>
              Login
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
