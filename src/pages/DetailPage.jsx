import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { addCart } from '../redux/actions/cartActions';

const PRODUCTS_API =
  'https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74';

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

function DetailPage() {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const [products, setProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [cartMessage, setCartMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      setIsLoading(true);
      setError('');

      try {
        const response = await fetch(PRODUCTS_API, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        const productList = Array.isArray(data) ? data : [];
        setProducts(productList);

        const currentProduct = productList.find(
          (item) => String(getProductId(item)) === productId,
        );
        setSelectedImage(currentProduct?.img1 || '');
        setQuantity(1);
        setCartMessage('');

        if (!currentProduct) {
          setError('Không tìm thấy sản phẩm này.');
        }
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError('Không tải được thông tin sản phẩm. Vui lòng thử lại sau.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadProducts();
    return () => controller.abort();
  }, [productId]);

  const product = useMemo(
    () => products.find((item) => String(getProductId(item)) === productId),
    [productId, products],
  );

  const relatedProducts = useMemo(
    () =>
      product
        ? products.filter(
            (item) =>
              item.category === product.category &&
              String(getProductId(item)) !== productId,
          )
        : [],
    [product, productId, products],
  );

  if (isLoading) {
    return <div className="detail-page detail-page__message">Loading product…</div>;
  }

  if (error || !product) {
    return (
      <div className="detail-page detail-page__message" role="alert">
        {error || 'Không tìm thấy sản phẩm này.'}
      </div>
    );
  }

  const productImages = [product.img1, product.img2, product.img3, product.img4].filter(Boolean);

  return (
    <main className="detail-page">
      <section className="detail-overview">
        <div className="detail-gallery">
          <div className="detail-gallery__thumbnails" aria-label="Product images">
            {productImages.map((image, index) => (
              <button
                className={`detail-gallery__thumbnail${selectedImage === image ? ' is-selected' : ''}`}
                key={`${image}-${index}`}
                onClick={() => setSelectedImage(image)}
                type="button"
                aria-label={`Show product image ${index + 1}`}
              >
                <img src={image} alt="" />
              </button>
            ))}
          </div>
          <div className="detail-gallery__main">
            <img src={selectedImage || product.img1} alt={product.name} />
          </div>
        </div>

        <div className="detail-info">
          <h1>{product.name}</h1>
          <p className="detail-info__price">{formatPrice(product.price)}</p>
          {product.short_desc && <p className="detail-info__short-description">{product.short_desc}</p>}
          <p className="detail-info__category">
            <strong>CATEGORY:</strong> <span>{product.category}</span>
          </p>

          <div className="detail-quantity" aria-label="Product quantity">
            <span>QUANTITY</span>
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => setQuantity((current) => Math.max(1, current - 1))}
            >
              ‹
            </button>
            <output>{quantity}</output>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => setQuantity((current) => current + 1)}
            >
              ›
            </button>
            <button
              className="detail-quantity__add"
              onClick={() => {
                dispatch(addCart(product, quantity));
                setCartMessage(`${quantity} item${quantity === 1 ? '' : 's'} added to cart.`);
              }}
              type="button"
            >
              Add to cart
            </button>
          </div>
          {cartMessage && <p className="detail-cart-message" role="status">{cartMessage}</p>}
        </div>
      </section>

      <section className="detail-description" aria-labelledby="description-title">
        <span className="detail-description__tab">DESCRIPTION</span>
        <h2 id="description-title">PRODUCT DESCRIPTION</h2>
        <p>{product.long_desc || product.short_desc}</p>
      </section>

      <section className="detail-related" aria-labelledby="related-title">
        <h2 id="related-title">RELATED PRODUCTS</h2>
        {relatedProducts.length > 0 ? (
          <div className="detail-related__grid">
            {relatedProducts.map((relatedProduct) => {
              const relatedId = getProductId(relatedProduct);
              return (
                <Link
                  className="detail-related__card"
                  key={relatedId}
                  to={`/detail/${relatedId}`}
                >
                  <img src={relatedProduct.img1} alt={relatedProduct.name} loading="lazy" />
                  <h3>{relatedProduct.name}</h3>
                  <p>{formatPrice(relatedProduct.price)}</p>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="detail-related__empty">No related products found.</p>
        )}
      </section>
    </main>
  );
}

export default DetailPage;
