import { useNavigate } from 'react-router-dom';
import HomeCategories from '../components/HomeCategories';
import HomeInfo from '../components/HomeInfo';
import HomeProducts from '../components/HomeProducts';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <section
        className="home-banner"
        aria-label="Season collection offer"
        style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/banner1.jpg)` }}
      >
        <div className="home-banner__copy">
          <p className="home-banner__eyebrow">NEW INSPIRATION 2020</p>
          <h1>
            20% OFF ON NEW
            <br />
            SEASON
          </h1>
          <button
            className="home-banner__button"
            onClick={() => navigate('/shop')}
            type="button"
          >
            Browse collections
          </button>
        </div>
      </section>
      <HomeCategories />
      <HomeProducts />
      <HomeInfo />
    </div>
  );
}

export default HomePage;
