  import { useState } from 'react';
import './GalleryCard.css';

  export const GalleryCard = ({ title, link, thumbnail }) => {
    const [thumbnailError, setThumbnailError] = useState(false);

    const handleClick = () => {
      window.open(link, '_blank');
    };

    return (
      <div className="gallery-card" onClick={handleClick}>
        {thumbnail && !thumbnailError ? (
          <img
            src={thumbnail}
            alt={title}
            className="gallery-thumbnail"
            onError={() => setThumbnailError(true)}
          />
        ) : (
          <div className="gallery-placeholder-icon">
            <svg className="icon-svg" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 3h16a2 2 0 012 2v14a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2zm1 2v10.586l3-3 3 3L16.414 7l3.586 3.586V5H5zm0 14h14v-2.414l-3.586-3.586L11 15.586l-3-3L5 16.586V19zm10-7a2 2 0 100-4 2 2 0 000 4z"/>
            </svg>
          </div>
        )}
        <h3 className="gallery-title">{title}</h3>
      </div>
    );
  };