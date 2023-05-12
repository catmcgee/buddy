import React from 'react';
import Header from '../components/Header';
import Profile from '../components/Profile';
import SignInButton from '@/components/SignInButton';

function ProfilePage() {
  return (
    <div>
      <Header />
      <main>
        <SignInButton />
      </main>
      <footer>
        {/* Footer content goes here */}
      </footer>
    </div>
  );
}

export default ProfilePage;
