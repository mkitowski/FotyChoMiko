import React, { useState, useEffect } from 'react';
import './App.css'; // Importujemy nowy plik CSS
import { GalleryCard } from './components/GalleryCard/GalleryCard.jsx';

const App = () => {
  const [galleries, setGalleries] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest' (najnowsze) lub 'oldest' (najstarsze)

  const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1gi3nlMPCWRgwcslnSg9DtMCfz50nw7ZlEbcSJab0Lr8/gviz/tq?tqx=out:csv&gid=0';

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const response = await fetch(GOOGLE_SHEET_CSV_URL);
        if (!response.ok) {
          throw new Error(`Błąd HTTP: ${response.status}`);
        }
        const csvText = await response.text();
        const lines = csvText.split('\n').slice(1);

        const groupedGalleries = {};

        lines.forEach(line => {
          const columns = line.match(/(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|([^,]*))/g)?.map(col => {
            return col ? col.replace(/^"|"$/g, '').replace(/""/g, '') : '';
          });

          if (columns && columns.length >= 7) {
            const dateString = columns[0];
            const title = columns[2]; 
            const link = columns[4]; 
            const thumbnail = columns[6];

            const parts = dateString.split('.');
            let formattedDateString = '';
            if (parts.length === 3) {
              formattedDateString = `${parts[2]}-${parts[1]}-${parts[0]}`;
            } else {

              formattedDateString = dateString;
            }

            const date = new Date(formattedDateString);
            if (isNaN(date.getTime())) {
              console.warn(`Nieprawidłowy format daty dla galerii "${title}": ${dateString}`);
              return;
            }
            const year = date.getFullYear();

            if (!groupedGalleries[year]) {
              groupedGalleries[year] = [];
            }
            groupedGalleries[year].push({ date: date, title, link, thumbnail });
          }
        });

        for (const year in groupedGalleries) {
          groupedGalleries[year].sort((a, b) => b.date.getTime() - a.date.getTime());
        }

        setGalleries(groupedGalleries);
      } catch (err) {
        console.error("Błąd podczas pobierania danych:", err);
        setError("Nie udało się pobrać danych galerii. Spróbuj ponownie później.");
      } finally {
        setLoading(false);
      }
    };

    fetchGalleries();
  }, []);



  const sortedYears = Object.keys(galleries).sort((a, b) => {
    if (sortOrder === 'newest') {
      return b - a;
    } else {
      return a - b;
    }
  });

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => (prevOrder === 'newest' ? 'oldest' : 'newest'));
  };

  return (
    <div className="app-container">
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

      {/* Kontrolka sortowania */}
      {!loading && !error && Object.keys(galleries).length > 0 && (
        <div className="sort-toggle-container">
          <button
            className="sort-button"
            onClick={toggleSortOrder}
          >
            Sortuj: {sortOrder === 'newest' ? 'Najnowsze' : 'Najstarsze'}
            {sortOrder === 'newest' ? (
              <svg className="arrow-icon down" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 13l5 5 5-5H7z"/>
              </svg>
            ) : (
              <svg className="arrow-icon up" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 11l5-5 5 5H7z"/>
              </svg>
            )}
          </button>
        </div>
      )}

      {loading ? (
        <div className="loading-message">Ładowanie galerii...</div>
      ): undefined}

      {error ? (
        <div className="error-message">
          {error}
        </div>
      ) : undefined}

      {!loading && !error && (
        <div className="gallery-sections-container">
          {Object.keys(galleries).length === 0 && (
            <div className="no-galleries-message">
              Brak galerii do wyświetlenia. Upewnij się, że Google Sheet zawiera dane i daty są poprawne.
            </div>
          )}
          {sortedYears.map(year => (
            <section key={year} className="gallery-year-section">
              <h2 className="year-header">{year} (<span className="gallery-count">{galleries[year].length}</span>)</h2>
              <div className="gallery-grid">
                {galleries[year].sort((a, b) => {
                  if (sortOrder === 'oldest') {
                    return a.date.getTime() - b.date.getTime();
                  }
                  return b.date.getTime() - a.date.getTime();
                }).map((gallery, index) => (
                  <GalleryCard
                    key={index}
                    title={gallery.title}
                    link={gallery.link}
                    thumbnail={gallery.thumbnail}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
