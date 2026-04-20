import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import './BackLink.css';

export function BackLink(): JSX.Element {
  return (
    <Link to="/" className="back-link">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.8233 5.64648L12.5304 6.35359L8.88394 10L12.5304 13.6465L11.8233 14.3536L7.46973 10L11.8233 5.64648Z"
          fill="black"
        />
      </svg>{' '}
      BACK
    </Link>
  );
}
