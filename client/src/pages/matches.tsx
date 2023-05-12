import React from 'react';
import Header from '../components/Header';
import Matches from '../components/Matches';
import { ApolloProvider } from '@apollo/client';
import { client } from '@/lib/apollo';

function ProfilePage() {
  return (
    <ApolloProvider client={client}>
    <div>

      <Header />
      <main>
        <Matches />
      </main>
      <footer>
        {/* Footer content goes here */}
      </footer>
    </div>
    </ApolloProvider>
  );
}

export default ProfilePage;
