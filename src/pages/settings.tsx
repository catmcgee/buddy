import React from 'react';
import Header from '../components/Header';
import Settings from '../components/Settings';

function SettingsPage() {
  return (
    <div>
      <Header />
      <main>
        <Settings />
      </main>
      <footer>
        {/* Footer content goes here */}
      </footer>
    </div>
  );
}

export default SettingsPage;
