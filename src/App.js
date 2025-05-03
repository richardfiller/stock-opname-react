import React, { useState } from 'react';
import StockOpnameForm from './components/StockOpnameForm';
import MainMenu from './MainMenu';
import './App.css';

function App() {
  const [selectedMenu, setSelectedMenu] = useState(null);

  const handleMenuSelect = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <div className="app-container">
      {selectedMenu === 'stockOpname' ? (
        <StockOpnameForm onBackToMenu={() => handleMenuSelect(null)} />
      ) : (
        <MainMenu onSelectMenu={handleMenuSelect} />
      )}
    </div>
  );
}

export default App;