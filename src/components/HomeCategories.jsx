import { useNavigate } from 'react-router-dom';

const categories = [
  { name: 'iPhone', image: `${process.env.PUBLIC_URL}/product_1.png`, size: 'wide' },
  { name: 'Mac', image: `${process.env.PUBLIC_URL}/product_2.png`, size: 'wide' },
  { name: 'iPad', image: `${process.env.PUBLIC_URL}/product_3.png`, size: 'regular' },
  { name: 'Watch', image: `${process.env.PUBLIC_URL}/product_4.png`, size: 'regular' },
  { name: 'AirPods', image: `${process.env.PUBLIC_URL}/product_5.png`, size: 'regular' },
];

function HomeCategories() {
  const navigate = useNavigate();

  return (
    <section className="home-categories" aria-labelledby="categories-title">
      <p className="home-categories__eyebrow">CAREFULLY CREATED COLLECTIONS</p>
      <h2 id="categories-title">BROWSE OUR CATEGORIES</h2>

      <div className="home-categories__grid">
        {categories.map((category) => (
          <button
            className={`category-card category-card--${category.size}`}
            key={category.name}
            onClick={() => navigate('/shop')}
            type="button"
            aria-label={`Browse ${category.name} products`}
          >
            <img src={category.image} alt={`${category.name} category`} />
          </button>
        ))}
      </div>
    </section>
  );
}

export default HomeCategories;
