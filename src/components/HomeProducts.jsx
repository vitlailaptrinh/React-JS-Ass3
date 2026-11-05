import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { showPopup } from '../redux/actions/popupActions';

const PRODUCTS_API =
  'https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74';

function getProductId(product) {
  const id = product._id;
  return typeof id === 'object' && id !== null ? id.$oid : id;
}

function formatPrice(price) {
  const numericPrice = Number(price);
  return Number.isFinite(numericPrice)
    ? Math.trunc(numericPrice).toLocaleString('de-DE')
    : price;
}

function HomeProducts() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        const response = await fetch(PRODUCTS_API, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        setProducts(Array.isArray(data) ? data.slice(0, 8) : []);
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError('Không tải được danh sách sản phẩm. Vui lòng thử lại sau.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadProducts();
    return () => controller.abort();
  }, []);

  return (
    <section className="home-products" aria-labelledby="trending-products-title">
      <p className="home-products__eyebrow">MADE THE HARD WAY</p>
      <h2 id="trending-products-title">TOP TRENDING PRODUCTS</h2>

      {isLoading && <p className="home-products__message">Đang tải sản phẩm…</p>}
      {error && <p className="home-products__message" role="alert">{error}</p>}

      {!isLoading && !error && (
        <div className="home-products__grid">
          {products.map((product) => (
            <article className="product-card" key={getProductId(product) || product.name}>
              <div className="product-card__image">
                <button
                  className="product-card__image-button"
                  type="button"
                  aria-label={`View details for ${product.name}`}
                  onClick={() => dispatch(showPopup(product))}
                >
                  <img src={product.img1} alt={product.name} loading="lazy" />
                </button>
              </div>
              <h3>{product.name}</h3>
              <p>{formatPrice(product.price)} VND</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default HomeProducts;
