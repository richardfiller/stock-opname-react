import React from 'react';
import './MainMenu.css';

function MainMenu({ onSelectMenu }) {
  const handleExportData = () => {
    window.open('/.netlify/functions/export-stock');
  };

  return (
    <div className="main-menu-container">
      <img
        src="/images/cobra-logo.png"
        alt="Logo Cobra Dental"
        className="menu-logo"
      />

      <h1 className="menu-title">📦 Stock Opname App</h1>

      <div className="menu-buttons">
        <button className="menu-button" onClick={() => onSelectMenu('stockOpname')}>
          ➕ Form Stock Opname
        </button>
        <button className="menu-button" onClick={handleExportData}>
          📤 Export Hasil Input SO
        </button>
      </div>

      <footer className="menu-footer">
        <p>Versi 1.0.0</p>
        <p><strong>richardfiller</strong></p>
      </footer>
    </div>
  );
}

export default MainMenu;