import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function formatPrice(price) {
  const numericPrice = Number(price);
  return Number.isFinite(numericPrice)
    ? `${Math.trunc(numericPrice).toLocaleString('de-DE')} VND`
    : '0 VND';
}

function CheckoutPage() {
  const listCart = useSelector((state) => state.cart.listCart);
  const user = useSelector((state) => state.auth.user);
  const [error, setError] = useState('');
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const total = listCart.reduce(
    (sum, product) => sum + Number(product.price || 0) * Number(product.quantity || 1),
    0,
  );

  function handleSubmit(event) {
    event.preventDefault();
    setError('');

    if (listCart.length === 0) {
      setError('Your cart is empty. Add products before placing an order.');
      return;
    }

    setOrderSubmitted(true);
  }

  return (
    <main className="checkout-page">
      <div className="checkout-page__banner">
        <h1>CHECKOUT</h1>
        <nav aria-label="Breadcrumb">
          <Link to="/">HOME</Link>
          <span>/</span>
          <Link to="/cart">CART</Link>
          <span>/</span>
          <span>CHECKOUT</span>
        </nav>
      </div>

      <div className="checkout-layout">
        <section className="checkout-billing" aria-labelledby="billing-title">
          <h2 id="billing-title">BILLING DETAILS</h2>
          <form onSubmit={handleSubmit}>
            <label>
              <span>FULL NAME:</span>
              <input
                type="text"
                name="fullName"
                placeholder="Enter Your Full Name Here!"
                defaultValue={user?.fullName || ''}
                autoComplete="name"
                required
              />
            </label>
            <label>
              <span>EMAIL:</span>
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email Here!"
                defaultValue={user?.email || ''}
                autoComplete="email"
                required
              />
            </label>
            <label>
              <span>PHONE NUMBER:</span>
              <input
                type="tel"
                name="phone"
                placeholder="Enter Your Phone Number Here!"
                defaultValue={user?.phone || ''}
                autoComplete="tel"
                required
              />
            </label>
            <label>
              <span>ADDRESS:</span>
              <input
                type="text"
                name="address"
                placeholder="Enter Your Address Here!"
                autoComplete="street-address"
                required
              />
            </label>

            {error && <p className="checkout-message checkout-message--error" role="alert">{error}</p>}
            {orderSubmitted && (
              <p className="checkout-message checkout-message--success" role="status">
                Order submitted successfully.
              </p>
            )}
            <button className="checkout-submit" type="submit">
              Place order
            </button>
          </form>
        </section>

        <aside className="checkout-summary" aria-labelledby="order-title">
          <h2 id="order-title">YOUR ORDER</h2>
          <div className="checkout-summary__items">
            {listCart.map((product) => (
              <div className="checkout-summary__item" key={product._id?.$oid || product._id}>
                <span>{product.name}</span>
                <span>{formatPrice(product.price)} x {product.quantity || 1}</span>
              </div>
            ))}
            {listCart.length === 0 && <p className="checkout-summary__empty">Your cart is empty.</p>}
          </div>
          <div className="checkout-summary__total">
            <span>TOTAL</span>
            <span>{formatPrice(total)}</span>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default CheckoutPage;
