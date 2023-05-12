import React from 'react';
import dynamic from 'next/dynamic';
import Header from '../components/Header';

const Swipe = dynamic(() => import('../components/Swipe'), { ssr: false });

function Index() {
  return (
    <div>
      <Header />
      <main>
        <Swipe />
      </main>
      <footer>
        {/* Footer */}
      </footer>
    </div>
  );
}

export default Index;
