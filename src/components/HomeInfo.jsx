const serviceHighlights = [
  { title: 'FREE SHIPPING', description: 'Free shipping worldwide' },
  { title: '24 X 7 SERVICE', description: 'Free shipping worldwide' },
  { title: 'FESTIVAL OFFER', description: 'Free shipping worldwide' },
];

function HomeInfo() {
  return (
    <div className="home-info">
      <section className="home-highlights" aria-label="Store services">
        <div className="container">
          <div className="row gy-4">
            {serviceHighlights.map((item) => (
              <div className="col-12 col-md-4" key={item.title}>
                <div className="home-highlight">
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-newsletter" aria-labelledby="newsletter-title">
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-12 col-md-6">
              <h2 id="newsletter-title">LET'S BE FRIENDS!</h2>
              <p>Nisi nisi tempor consequat laboris nisi.</p>
            </div>
            <div className="col-12 col-md-6">
              <form className="input-group" onSubmit={(event) => event.preventDefault()}>
                <input
                  className="form-control"
                  type="email"
                  placeholder="Enter your email address"
                  aria-label="Email address"
                  required
                />
                <button className="btn btn-dark" type="submit">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeInfo;
