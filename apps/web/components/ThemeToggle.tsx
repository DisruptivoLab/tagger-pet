'use client';

import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('auto');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'auto';
    setTheme(savedTheme);
    if (savedTheme === 'auto') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'auto') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', newTheme);
    }
  };

  return (
    <div>
      <button onClick={() => handleThemeChange('light')} disabled={theme === 'light'}>Claro</button>
      <button onClick={() => handleThemeChange('dark')} disabled={theme === 'dark'}>Oscuro</button>
      <button onClick={() => handleThemeChange('auto')} disabled={theme === 'auto'}>Auto</button>
    </div>
  );
}
