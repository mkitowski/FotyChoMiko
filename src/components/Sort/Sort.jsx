import './Sort.css';

export const Sort = ({show, toggleSortOrder, sortOrder}) => (show ?
            <div className="sort-toggle-container">
          <button
            className="sort-button"
            onClick={toggleSortOrder}
          >
            Sortuj:
            {sortOrder === 'newest' ? (
              <Arrow className="arrow-icon down"/>
            ) : (
              <Arrow className="arrow-icon up" />
   
            )}
          </button>
        </div> : undefined
)

const Arrow = ({className}) => (<svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="drop-shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="black" floodOpacity="0.7"/>
    </filter>
    <linearGradient id="blackBubbleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#444444"/>
      <stop offset="50%" stopColor="#222222"/>
      <stop offset="100%" stopColor="#000000"/>
    </linearGradient>
  </defs>

  <path d="M 9 2 C 9 1 11 1 11 2 L 11 10 L 15 10 C 16 10 16 12 15 12 L 10 18 C 9 19 11 19 10 18 L 5 12 C 4 12 4 10 5 10 L 9 10 Z" fill="url(#blackBubbleGradient)" filter="url(#drop-shadow)"/>

  <path d="M 9.5 2.5 C 10 2 10.5 2 11 2.5" stroke="white" strokeWidth="0.5" strokeLinecap="round" fill="none" opacity="0.7"/>
  <path d="M 10 17.5 C 9.5 18 10.5 18 10 17.5" stroke="white" strokeWidth="0.5" strokeLinecap="round" fill="none" opacity="0.3"/>

</svg>)