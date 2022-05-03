import React from 'react';
import { createRoot } from 'react-dom/client';
import { csrfToken } from '@rails/ujs';
import App from '../components/App';
import axios from 'axios';

document.addEventListener('DOMContentLoaded', () => {
  const root = createRoot(document.getElementById('root'));
  root.render(<App />);
});

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken();
