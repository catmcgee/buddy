import React from 'react';
import Header from '../components/Header';
import Profile from '../components/Profile';
import Settings from '@/components/Settings';

function ProfilePage() {
  return (
    <div>
      <Header />
      <main className='pb-10'>
        <Profile />
        <Settings />
      </main>
      <footer>
        {/* Footer content goes here */}
      </footer>
    </div>
  );
}

export default ProfilePage;
