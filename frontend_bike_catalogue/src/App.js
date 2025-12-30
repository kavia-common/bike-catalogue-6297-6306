import React, { useState, useEffect } from "react";
import "./App.css";

// ========================
// PUBLIC_INTERFACE
function Header() {
  /** Header bar with project name */
  return (
    <header className="bh-header" role="banner">
      Bikers Heaven &nbsp; <span style={{
        background: "var(--success)",
        color: "#fff",
        borderRadius: "6px",
        fontSize: "1rem",
        marginLeft: "0.5em",
        padding: "0.1em 0.5em"
      }}>Bike Catalogue</span>
    </header>
  );
}

// PUBLIC_INTERFACE
function BikeCard({ bike }) {
  /** Card component that displays a bike's image and details */
  return (
    <article className="bike-card" tabIndex={0} aria-label={`${bike.name} - ${bike.model}`}>
      <img
        src={bike.image}
        alt={`${bike.name} - ${bike.model}`}
        className="bike-image"
        loading="lazy"
      />
      <div className="bike-details">
        <div className="bike-title">{bike.name}</div>
        <div className="bike-meta">{bike.model}</div>
        <div className="bike-price" aria-label={`${bike.price} USD`}>
          ${bike.price.toLocaleString()}
        </div>
      </div>
    </article>
  );
}

// PUBLIC_INTERFACE
function BikeGrid({ bikes }) {
  /** Responsive grid of BikeCards */
  if (!bikes.length) {
    return <div style={{ color: "var(--secondary)", textAlign: "center", marginTop: "2rem" }}>No bikes available.</div>;
  }
  return (
    <section className="bike-grid" aria-label="Bike list">
      {bikes.map((bike) => (
        <BikeCard key={bike.id} bike={bike} />
      ))}
    </section>
  );
}

// PUBLIC_INTERFACE
function useBikesData() {
  /**
   * Hook to get bike data.
   * Will use mock data (local), but if REACT_APP_API_BASE is available in .env, will have placeholder for API fetch in the future.
   */
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Placeholder API base logic
    const apiBase = process.env.REACT_APP_API_BASE;
    if (apiBase && false) {
      // For now, mock fetch only (false disables until integration)
      setLoading(true);
      // e.g. fetch(`${apiBase}/bikes`) ... setBikes(data)
    } else {
      // Local sample/mock data
      setBikes([
        {
          id: "1",
          name: "Trek Domane AL 2",
          model: "2023 Road",
          price: 1299,
          image:
            "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?h=200&w=400&fit=crop"
        },
        {
          id: "2",
          name: "Canyon Grand Canyon 7",
          model: "2022 Mountain",
          price: 1499,
          image:
            "https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?h=200&w=400&fit=crop"
        },
        {
          id: "3",
          name: "Specialized Sirrus X 4.0",
          model: "2023 Hybrid",
          price: 1799,
          image:
            "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?h=201&w=401&fit=crop"
        },
        {
          id: "4",
          name: "Santa Cruz Chameleon",
          model: "2023 Trail",
          price: 1999,
          image:
            "https://images.pexels.com/photos/127642/pexels-photo-127642.jpeg?h=200&w=400&fit=crop"
        }
      ]);
      setLoading(false);
    }
  }, []);
  return { bikes, loading };
}

// PUBLIC_INTERFACE
function App() {
  /** App shell with header, grid of bikes, and proper theming/layout */
  const [theme, setTheme] = useState("light");
  const { bikes, loading } = useBikesData();

  // Apply theme (future: theme toggle)
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.style.background = "var(--background)";
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="bh-main-bg">
      <Header />
      {/* Theme toggle kept for future development if desired */}
      {/* <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button> */}

      <main aria-label="Bikes catalogue" style={{ maxWidth: 1200, margin: "auto" }}>
        <h1 style={{
          color: "var(--primary)",
          textAlign: "center",
          margin: "1.3rem 0 0.7rem 0",
          fontWeight: 800,
          fontSize: "1.95rem",
          letterSpacing: ".5px"
        }}>Discover Your Dream Bike</h1>
        <p style={{
          color: "var(--secondary)",
          textAlign: "center",
          margin: "0 0 1.5rem 0",
          fontSize: "1.05rem"
        }}>
          Browse our collection of high-quality bikes with modern styles and the best prices.
        </p>
        {loading ? (
          <div style={{ color: "var(--secondary)", textAlign: "center", marginTop: "2rem" }}>Loading bikes...</div>
        ) : (
          <BikeGrid bikes={bikes} />
        )}
      </main>
      <footer className="bh-footer">
        &copy; {new Date().getFullYear()} Bikers Heaven &mdash; Bike Catalogue | Crafted with <span role="img" aria-label="bike">🚴‍♂️</span>
      </footer>
    </div>
  );
}
export default App;
