import React from 'react';
import Header from '../components/Header';
import Profile from '../components/Profile';

function ProfilePage() {
  return (
    <div>
      <Header />
      <main>
        <Profile />
      </main>
      <footer>
        {/* Footer content goes here */}
      </footer>
    </div>
  );
}

export default ProfilePage;
