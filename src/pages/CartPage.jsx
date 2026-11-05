import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCart, updateCart } from '../redux/actions/cartActions';

function getProductId(product) {
  const id = product._id;
  return typeof id === 'object' && id !== null ? id.$oid : id;
}

function formatPrice(price) {
  const numericPrice = Number(price);
  return Number.isFinite(numericPrice)
    ? `${Math.trunc(numericPrice).toLocaleString('de-DE')} VND`
    : '0 VND';
}

function CartPage() {
  const dispatch = useDispatch();
  const listCart = useSelector((state) => state.cart.listCart);
  const [couponMessage, setCouponMessage] = useState('');

  const subtotal = listCart.reduce(
    (sum, product) => sum + Number(product.price || 0) * Number(product.quantity || 1),
    0,
  );

  function changeQuantity(product, amount) {
    dispatch(updateCart(getProductId(product), Math.max(1, Number(product.quantity || 1) + amount)));
  }

  function handleCouponSubmit(event) {
    event.preventDefault();
    setCouponMessage('Coupon codes are not configured yet.');
  }

  return (
    <main className="cart-page">
      <div className="cart-page__banner">
        <h1>CART</h1>
        <span>CART</span>
      </div>

      <h2 className="cart-page__title">SHOPPING CART</h2>

      {listCart.length === 0 ? (
        <section className="cart-empty">
          <p>Your shopping cart is empty.</p>
          <Link className="cart-action cart-action--continue" to="/shop">
            ←&nbsp; Continue shopping
          </Link>
        </section>
      ) : (
        <div className="cart-layout">
          <section className="cart-items" aria-label="Shopping cart products">
            <div className="cart-table__header">
              <span>IMAGE</span>
              <span>PRODUCT</span>
              <span>PRICE</span>
              <span>QUANTITY</span>
              <span>TOTAL</span>
              <span>REMOVE</span>
            </div>

            {listCart.map((product) => {
              const productId = getProductId(product);
              const quantity = Number(product.quantity) || 1;
              const itemTotal = Number(product.price || 0) * quantity;
              return (
                <article className="cart-item" key={productId}>
                  <Link className="cart-item__image" to={`/detail/${productId}`}>
                    <img src={product.img1} alt={product.name} />
                  </Link>
                  <Link className="cart-item__product" to={`/detail/${productId}`}>
                    {product.name}
                  </Link>
                  <span className="cart-item__price">{formatPrice(product.price)}</span>
                  <div className="cart-item__quantity" aria-label={`Quantity for ${product.name}`}>
                    <button
                      type="button"
                      aria-label={`Decrease ${product.name} quantity`}
                      onClick={() => changeQuantity(product, -1)}
                    >
                      ‹
                    </button>
                    <output>{quantity}</output>
                    <button
                      type="button"
                      aria-label={`Increase ${product.name} quantity`}
                      onClick={() => changeQuantity(product, 1)}
                    >
                      ›
                    </button>
                  </div>
                  <span className="cart-item__total">{formatPrice(itemTotal)}</span>
                  <button
                    className="cart-item__remove"
                    type="button"
                    aria-label={`Remove ${product.name} from cart`}
                    onClick={() => dispatch(deleteCart(productId))}
                  >
                    <svg aria-hidden="true" viewBox="0 0 24 24">
                      <path d="M4 7h16M9 7V4h6v3m3 0-.8 13H6.8L6 7m4 3v6m4-6v6" />
                    </svg>
                  </button>
                </article>
              );
            })}

            <div className="cart-actions">
              <Link className="cart-action cart-action--continue" to="/shop">
                ←&nbsp; Continue shopping
              </Link>
              <Link className="cart-action cart-action--checkout" to="/checkout">
                Proceed to checkout&nbsp; →
              </Link>
            </div>
          </section>

          <aside className="cart-summary" aria-label="Cart total">
            <h2>CART TOTAL</h2>
            <div className="cart-summary__line">
              <span>SUBTOTAL</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="cart-summary__line cart-summary__line--total">
              <span>TOTAL</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <form className="cart-coupon" onSubmit={handleCouponSubmit}>
              <input type="text" placeholder="Enter your coupon" aria-label="Coupon code" />
              <button type="submit">♔&nbsp; Apply coupon</button>
              {couponMessage && <p role="status">{couponMessage}</p>}
            </form>
          </aside>
        </div>
      )}
    </main>
  );
}

export default CartPage;
