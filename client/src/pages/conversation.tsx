import React from 'react';
import Header from '../components/Header';
import Profile from '../components/Profile';
import Conversation from '@/components/Conversation';

function ProfilePage() {
  return (
    <div>
      <Header />
      <main>
        <Conversation/>
      </main>
      <footer>
        {/* Footer content goes here */}
      </footer>
    </div>
  );
}

export default ProfilePage;
