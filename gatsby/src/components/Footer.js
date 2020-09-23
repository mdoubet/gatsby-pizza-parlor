import React from 'react';
import { _SiteName } from '../utils/config';

export default function Footer() {
  return (
    <footer>
      <p>
        &copy; {_SiteName} {new Date().getFullYear()}
      </p>
    </footer>
  );
}
