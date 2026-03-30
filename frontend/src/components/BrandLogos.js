// Custom SVG brand logos for brands not available in react-icons

export const ColesLogo = ({ size = 22, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 14.5c-1 .9-2.2 1.5-3.5 1.5-3.04 0-5.5-2.46-5.5-5.5S8.96 7 12 7c1.3 0 2.5.5 3.5 1.5l-1.8 1.8c-.5-.5-1.1-.8-1.7-.8-1.66 0-3 1.34-3 3s1.34 3 3 3c.6 0 1.2-.3 1.7-.8l1.8 1.8z" fill={color}/>
  </svg>
);

export const WoolworthsLogo = ({ size = 22, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C10.5 2 9.2 2.8 8.5 4C7.5 3.5 6.3 3.5 5.3 4.2C4.3 4.9 3.8 6 4 7.1C3 7.7 2.3 8.8 2.3 10C2.3 11.2 3 12.3 4 12.9C3.8 14 4.3 15.1 5.3 15.8C6.3 16.5 7.5 16.5 8.5 16C9.2 17.2 10.5 18 12 18C13.5 18 14.8 17.2 15.5 16C16.5 16.5 17.7 16.5 18.7 15.8C19.7 15.1 20.2 14 20 12.9C21 12.3 21.7 11.2 21.7 10C21.7 8.8 21 7.7 20 7.1C20.2 6 19.7 4.9 18.7 4.2C17.7 3.5 16.5 3.5 15.5 4C14.8 2.8 13.5 2 12 2z" fill={color}/>
    <path d="M12 19v3M10 21.5h4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const SevenElevenLogo = ({ size = 22, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="3" width="20" height="18" rx="3" fill={color} opacity="0.15"/>
    <text x="12" y="17" textAnchor="middle" fill={color} fontSize="16" fontWeight="900" fontFamily="Arial, sans-serif">7</text>
  </svg>
);

export const SheinLogo = ({ size = 22, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.5 7C6.5 7 8 5 12 5s5.5 2 5.5 4.5c0 2-1.5 3-3.5 3.5-2 .5-3.5 1.5-3.5 3.5 0 2.5 2 4 5.5 4s5.5-2 5.5-2" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
  </svg>
);

export const CottonOnLogo = ({ size = 22, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="4" width="22" height="16" rx="2" fill={color} opacity="0.1"/>
    <text x="12" y="15.5" textAnchor="middle" fill={color} fontSize="9" fontWeight="800" fontFamily="Arial, sans-serif">CO</text>
  </svg>
);

export const ForeverNewLogo = ({ size = 22, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L14.5 8.5L21.5 9.5L16.5 14L18 21L12 17.5L6 21L7.5 14L2.5 9.5L9.5 8.5L12 2Z" fill={color} opacity="0.2" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);

export const AmazonLogo = ({ size = 22, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 17.5C5.5 20 8.5 21.5 12 21.5C16 21.5 19.5 19.5 21.5 17" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M20 16l2 1.5-1 2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 13c0-3.5 2-6.5 5-6.5s5 3 5 6.5c0 1.5-.5 2.5-1.5 3-1 .5-2 0-2-1V9.5" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/>
    <circle cx="10" cy="12" r="2" stroke={color} strokeWidth="1.8" fill="none"/>
  </svg>
);
