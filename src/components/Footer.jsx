const footerSections = [
  {
    title: 'CUSTOMER SERVICES',
    links: ['Help & Contact Us', 'Returns & Refunds', 'Online Stores', 'Terms & Conditions'],
  },
  {
    title: 'COMPANY',
    links: ['What We Do', 'Available Services', 'Latest Posts', 'FAQs'],
  },
  {
    title: 'SOCIAL MEDIA',
    links: ['Twitter', 'Instagram', 'Facebook', 'Pinterest'],
  },
];

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        {footerSections.map((section) => (
          <section className="footer-section" key={section.title}>
            <h2>{section.title}</h2>
            <ul>
              {section.links.map((link) => (
                <li key={link}>
                  <a href="#">{link}</a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </footer>
  );
}

export default Footer;
