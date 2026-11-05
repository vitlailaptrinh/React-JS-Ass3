import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const PRODUCTS_API =
  'https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74';

const categoryGroups = [
  {
    title: 'IPHONE & MAC',
    categories: [
      { label: 'iPhone', value: 'iphone' },
      { label: 'iPad', value: 'ipad' },
      { label: 'Macbook', value: 'macbook' },
    ],
  },
  {
    title: 'WIRELESS',
    categories: [
      { label: 'Airpod', value: 'airpod' },
      { label: 'Watch', value: 'watch' },
    ],
  },
  {
    title: 'OTHER',
    categories: [
      { label: 'Mouse', value: 'mouse' },
      { label: 'Keyboard', value: 'keyboard' },
      { label: 'Other', value: 'other' },
    ],
  },
];

function getProductId(product) {
  const id = product._id;
  return typeof id === 'object' && id !== null ? id.$oid : id;
}

function formatPrice(price) {
  const numericPrice = Number(price);
  return Number.isFinite(numericPrice)
    ? `${Math.trunc(numericPrice).toLocaleString('de-DE')} VND`
    : price;
}

function ProductList() {
  const [category, setCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
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
        setProducts(Array.isArray(data) ? data : []);
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

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase();
    return products.filter((product) => {
      const matchesCategory = category === 'all' || product.category === category;
      const matchesName = product.name.toLocaleLowerCase().includes(normalizedSearch);
      return matchesCategory && matchesName;
    });
  }, [category, products, searchTerm]);

  return (
    <div className="shop-page">
      <aside className="shop-sidebar" aria-label="Product categories">
        <button
          className={`shop-sidebar__title${category === 'all' ? ' is-selected' : ''}`}
          onClick={() => setCategory('all')}
          type="button"
        >
          APPLE
        </button>
        <button
          className={`shop-sidebar__item${category === 'all' ? ' is-selected' : ''}`}
          onClick={() => setCategory('all')}
          type="button"
        >
          All
        </button>

        {categoryGroups.map((group) => (
          <section className="shop-sidebar__group" key={group.title}>
            <h2>{group.title}</h2>
            {group.categories.map((item) => (
              <button
                className={`shop-sidebar__item${category === item.value ? ' is-selected' : ''}`}
                key={item.value}
                onClick={() => setCategory(item.value)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </section>
        ))}
      </aside>

      <section className="shop-results" aria-label="Products">
        <div className="shop-results__toolbar">
          <p>{isLoading ? 'Loading products…' : `${filteredProducts.length} products`}</p>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search products by name"
            aria-label="Search products by name"
          />
        </div>

        {error && <p className="shop-message" role="alert">{error}</p>}
        {!isLoading && !error && filteredProducts.length === 0 && (
          <p className="shop-message">Không tìm thấy sản phẩm phù hợp.</p>
        )}

        {!isLoading && !error && filteredProducts.length > 0 && (
          <div className="shop-product-grid">
            {filteredProducts.map((product) => {
              const productId = getProductId(product);
              return (
                <Link
                  className="shop-product-card"
                  key={productId || product.name}
                  to={`/detail/${productId}`}
                >
                  <div className="shop-product-card__image">
                    <img src={product.img1} alt={product.name} loading="lazy" />
                  </div>
                  <h2>{product.name}</h2>
                  <p>{formatPrice(product.price)}</p>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default ProductList;
