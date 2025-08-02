import './Hero.css';

export const Hero = () => {
  return (
      <div className="hero-and-header-wrapper">
        <div className="hero-section">
          <img
            src="https://lh3.googleusercontent.com/pw/AP1GczMtEibzrOSbVfekYJO3OWVyaP-ZWYBWidCCP9qM8z0-eQ1fUGyUv4ftOogV6t0AVtZHm6aYEI9gyTwzBMmtCIIJIHkjAsfpDVFjgvlKAQl_L03M1BaTWqknGkHbvvGQbWr5w8UpeS5FBH65wI-cvu7o=w1126-h752-s-no-gm?authuser=0"
            alt="Obraz hero"
            className="hero-image"
          />
        </div>
        <div className="header-content">
          <img
            src="https://gdansk.dominikanie.pl/wp-content/uploads/sites/17/2022/10/CHOR_logo_warianty.jpg"
            alt="Logo Dominikanów"
            className="logo-image"
          />
          <h1 className="main-title">
            Zdjęcia ChoMików
          </h1>
        </div>
      </div> 
  );
}