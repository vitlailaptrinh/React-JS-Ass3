import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hidePopup } from '../redux/actions/popupActions';

function formatPrice(price) {
  const numericPrice = Number(price);
  return Number.isFinite(numericPrice)
    ? `${Math.trunc(numericPrice).toLocaleString('de-DE')} VND`
    : price;
}

function Popup() {
  const dispatch = useDispatch();
  const { isVisible, product } = useSelector((state) => state.popup);

  useEffect(() => {
    if (!isVisible) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') dispatch(hidePopup());
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch, isVisible]);

  if (!isVisible || !product) return null;

  return (
    <div className="popup-backdrop">
      <button
        className="popup-backdrop__scrim"
        type="button"
        aria-label="Close product details"
        onClick={() => dispatch(hidePopup())}
      />
      <section
        className="product-popup"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-popup-title"
      >
        <button
          className="product-popup__close"
          type="button"
          aria-label="Close popup"
          onClick={() => dispatch(hidePopup())}
        >
          ×
        </button>
        <div className="product-popup__image">
          <img src={product.img1} alt={product.name} />
        </div>
        <div className="product-popup__details">
          <p className="product-popup__category">{product.category}</p>
          <h2 id="product-popup-title">{product.name}</h2>
          <p className="product-popup__price">{formatPrice(product.price)}</p>
          {product.short_desc && <p>{product.short_desc}</p>}
          {product.long_desc && <p>{product.long_desc}</p>}
        </div>
      </section>
    </div>
  );
}

export default Popup;
