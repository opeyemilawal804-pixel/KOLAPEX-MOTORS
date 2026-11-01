
import React, { useMemo, useState } from "react";
import "./App.css";
import { cars, USD_TO_NGN } from "./cars";

const brandLogos = [
  { name: "Mercedes-Benz", image: "https://cdn.simpleicons.org/mercedesbenz/ffffff" },
  { name: "BMW", image: "https://cdn.simpleicons.org/bmw/ffffff" },
  { name: "Lamborghini", image: "https://cdn.simpleicons.org/lamborghini/ffffff" },
  { name: "Ferrari", image: "https://cdn.simpleicons.org/ferrari/ffffff" },
  { name: "Porsche", image: "https://cdn.simpleicons.org/porsche/ffffff" },
  { name: "Rolls-Royce", image: "https://cdn.simpleicons.org/rollsroyce/ffffff" },
  { name: "Toyota", image: "https://cdn.simpleicons.org/toyota/ffffff" },
  { name: "Lexus", image: "https://cdn.simpleicons.org/lexus/ffffff" },
];

const categories = [
  "All Vehicles",
  "SUV",
  "Sedan",
  "Sports",
  "Luxury",
  "Electric",
];

const formatMoney = (amount, currency) =>
  new Intl.NumberFormat(currency === "USD" ? "en-US" : "en-NG", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);

function App() {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("All");
  const [category, setCategory] = useState("All Vehicles");
  const [sort, setSort] = useState("featured");
  const [currency, setCurrency] = useState("USD");
  const [selectedCar, setSelectedCar] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const displayedCars = useMemo(() => {
    let result = [...cars];

    if (brand !== "All") {
      result = result.filter(
        (car) => car.brand?.toLowerCase() === brand.toLowerCase()
      );
    }

    if (category !== "All Vehicles") {
      result = result.filter(
        (car) => car.type?.toLowerCase() === category.toLowerCase()
      );
    }

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter((car) =>
        `${car.brand} ${car.name} ${car.year} ${car.type}`
          .toLowerCase()
          .includes(query)
      );
    }

    if (sort === "low-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "high-low") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "newest") {
      result.sort((a, b) => b.year - a.year);
    }

    return result;
  }, [brand, category, search, sort]);

  const getPrice = (price) => {
    const convertedPrice =
      currency === "USD" ? price : price * USD_TO_NGN;

    return formatMoney(convertedPrice, currency);
  };

  const resetFilters = () => {
    setSearch("");
    setBrand("All");
    setCategory("All Vehicles");
    setSort("featured");
  };

  const openBrand = (name) => {
    setBrand(name);
    document.getElementById("inventory")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="website">

      {/* HEADER */}

      <header className="navbar">
        <a href="#home" className="logo" onClick={closeMenu}>
          KOLAPEX<span>.</span>
        </a>

        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          <a href="#home" onClick={closeMenu}>HOME</a>
          <a href="#brands" onClick={closeMenu}>BRANDS</a>
          <a href="#inventory" onClick={closeMenu}>COLLECTION</a>
          <a href="#about" onClick={closeMenu}>ABOUT US</a>
          <a href="#contact" onClick={closeMenu}>CONTACT</a>
          <a href="#inventory" className="nav-button" onClick={closeMenu}>
            EXPLORE CARS
          </a>
        </nav>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </header>

      <main>

        {/* HERO */}

        <section className="hero" id="home">
          <div className="hero-content">

            <div className="subtitle">
              PREMIUM AUTOMOTIVE COLLECTION
            </div>

            <h1>
              DRIVE BEYOND
              <br />
              <span>ORDINARY.</span>
            </h1>

            <p className="hero-description">
              Discover exceptional automobiles.
              Explore world-class engineering, iconic design
              and outstanding performance with KOLAPEX MOTORS.
            </p>

            <div className="hero-buttons">
              <a href="#inventory" className="primary-btn">
                EXPLORE COLLECTION →
              </a>

              <a href="#about" className="secondary-btn">
                DISCOVER OUR BRAND
              </a>
            </div>

            <div className="stats">
              <div>
                <strong>{cars.length}+</strong>
                <span>VEHICLES</span>
              </div>

              <div>
                <strong>{brandLogos.length}</strong>
                <span>FEATURED BRANDS</span>
              </div>

              <div>
                <strong>GLOBAL</strong>
                <span>AUTOMOTIVE VISION</span>
              </div>
            </div>

          </div>
        </section>

        {/* BRANDS */}

        <section className="brands-section" id="brands">

          <div className="section-heading">
            <div className="subtitle">EXCEPTIONAL AUTOMOTIVE BRANDS</div>
            <h2>EXPLORE TOP BRANDS</h2>
            <p>
              Discover iconic names in automotive excellence,
              performance and luxury.
            </p>
          </div>

          <div className="brands-grid">
            {brandLogos.map((item) => (
              <button
                key={item.name}
                type="button"
                className={`brand-item ${
                  brand === item.name ? "active" : ""
                }`}
                onClick={() => openBrand(item.name)}
              >
                <img src={item.image} alt={`${item.name} logo`} />
                <span>{item.name}</span>
              </button>
            ))}
          </div>

        </section>

        {/* INVENTORY */}

        <section className="inventory" id="inventory">

          <div className="section-heading">
            <div className="subtitle">THE KOLAPEX COLLECTION</div>
            <h2>FIND YOUR NEXT DRIVE.</h2>
            <p>
              Browse our automotive collection and discover
              exceptional vehicles selected for every ambition.
            </p>
          </div>

          {/* SEARCH AND FILTERS */}

          <div className="inventory-tools">

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="SEARCH VEHICLES, BRANDS OR MODELS..."
              aria-label="Search vehicles"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Vehicle category"
            >
              {categories.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort vehicles"
            >
              <option value="featured">FEATURED VEHICLES</option>
              <option value="low-high">PRICE: LOW TO HIGH</option>
              <option value="high-low">PRICE: HIGH TO LOW</option>
              <option value="newest">NEWEST FIRST</option>
            </select>

            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              aria-label="Display currency"
            >
              <option value="USD">USD ($)</option>
              <option value="NGN">NGN (₦)</option>
            </select>

          </div>

          <div className="inventory-tools">
            <span className="results-count">
              SHOWING {displayedCars.length} OF {cars.length} VEHICLES
              {brand !== "All" ? ` — ${brand.toUpperCase()}` : ""}
            </span>

            <button
              type="button"
              className="details-button"
              onClick={resetFilters}
            >
              CLEAR ALL FILTERS
            </button>
          </div>

          {/* VEHICLE COLLECTION */}

          {displayedCars.length > 0 ? (
            <div className="car-grid">

              {displayedCars.map((car) => (
                <article className="car-card" key={car.id}>

                  <div className="car-image">
                    <img
                      src={car.image}
                      alt={`${car.year} ${car.brand} ${car.name}`}
                      loading="lazy"
                    />
                  </div>

                  <div className="car-info">

                    <p>{car.brand?.toUpperCase()} · {car.year}</p>

                    <h3>{car.name}</h3>

                    <p>
                      {car.type?.toUpperCase()} · PREMIUM COLLECTION
                    </p>

                    <div className="dual-prices">
                      <strong>{getPrice(car.price)}</strong>
                    </div>

                    <button
                      type="button"
                      className="details-button"
                      onClick={() => setSelectedCar(car)}
                    >
                      VIEW VEHICLE DETAILS →
                    </button>

                  </div>
                </article>
              ))}

            </div>
          ) : (
            <div className="section-heading">
              <h2>NO VEHICLES FOUND</h2>
              <p>
                No vehicles match your current search.
                Try different keywords or clear your filters.
              </p>

              <button
                type="button"
                className="primary-btn"
                onClick={resetFilters}
              >
                VIEW ALL VEHICLES
              </button>
            </div>
          )}

        </section>

        {/* ABOUT */}

        <section className="about-section" id="about">

          <div>
            <div className="subtitle">THE KOLAPEX IDENTITY</div>
            <h2 className="section-heading">
              MORE THAN A CAR.
              <br />
              A STATEMENT OF EXCELLENCE.
            </h2>
          </div>

          <div>
            <p>
              KOLAPEX MOTORS is driven by a passion for exceptional
              automobiles. Our vision brings together automotive
              design, performance and prestige in one destination.
            </p>

            <p>
              From sophisticated executive vehicles to remarkable
              performance machines, we aim to make discovering
              exceptional automobiles an experience worth remembering.
            </p>

            <a href="#inventory" className="primary-btn">
              DISCOVER OUR COLLECTION →
            </a>
          </div>

        </section>

        {/* CONTACT */}

        <section className="contact-section" id="contact">

          <div className="subtitle">YOUR NEXT JOURNEY BEGINS HERE</div>

          <h2 className="section-heading">
            READY FOR SOMETHING EXTRAORDINARY?
          </h2>

          <p>
            Interested in a vehicle? Contact KOLAPEX MOTORS
            to make an enquiry.
          </p>

          <a
            href="mailto:info@kolapexmotors.com?subject=KOLAPEX%20Vehicle%20Enquiry"
            className="primary-btn"
          >
            CONTACT KOLAPEX MOTORS →
          </a>

        </section>

      </main>

      {/* VEHICLE DETAILS */}

      {selectedCar && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedCar(null)}
        >
          <div
            className="car-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Vehicle information"
            onClick={(e) => e.stopPropagation()}
          >

            <img
              src={selectedCar.image}
              alt={`${selectedCar.brand} ${selectedCar.name}`}
            />

            <div className="subtitle">VEHICLE INFORMATION</div>

            <h2>
              {selectedCar.brand} {selectedCar.name}
            </h2>

            <p><strong>MODEL YEAR:</strong> {selectedCar.year}</p>
            <p><strong>CATEGORY:</strong> {selectedCar.type}</p>
            <p><strong>PRICE:</strong> {getPrice(selectedCar.price)}</p>

            <p>
              Contact KOLAPEX MOTORS for further information
              about this vehicle.
            </p>

            <a
              className="primary-btn"
              href={`mailto:info@kolapexmotors.com?subject=${encodeURIComponent(
                `Enquiry about ${selectedCar.brand} ${selectedCar.name}`
              )}`}
            >
              ENQUIRE ABOUT THIS VEHICLE
            </a>

            <button
              type="button"
              className="details-button"
              onClick={() => setSelectedCar(null)}
            >
              CLOSE DETAILS
            </button>

          </div>
        </div>
      )}

      {/* FOOTER */}

      <footer>
        <a href="#home" className="logo">
          KOLAPEX<span>.</span>
        </a>

        <p>
          © {new Date().getFullYear()} KOLAPEX MOTORS.
          ALL RIGHTS RESERVED.
        </p>

        <p>DRIVEN BY EXCELLENCE. DEFINED BY LUXURY.</p>
      </footer>

    </div>
  );
}

export default App;
