'use client';
import { useEffect, useState } from 'react';

type ThemeMode = 'auto' | 'light' | 'dark';

export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>('auto');

  useEffect(() => {
    const html = document.documentElement;
    if (mode === 'auto') {
      html.removeAttribute('data-theme');
      html.setAttribute('data-theme', 'auto');
    } else {
      html.setAttribute('data-theme', mode);
    }
  }, [mode]);

  return (
    <div className="theme-toggle" role="group" aria-label="Selector de tema">
      <label>
        Tema:
        <select
          aria-label="Tema de la interfaz"
          value={mode}
          onChange={(e) => setMode(e.target.value as ThemeMode)}
        >
          <option value="auto">Automático</option>
          <option value="light">Claro</option>
          <option value="dark">Oscuro</option>
        </select>
      </label>
    </div>
  );
}
