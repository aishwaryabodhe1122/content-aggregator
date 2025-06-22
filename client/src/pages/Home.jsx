import { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ContentFeed from '../components/ContentFeed';

const Home = () => {
  const [category, setCategory] = useState('technology');

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar onCategoryChange={setCategory} />
        <div style={{ flex: 1 }}>
          <ContentFeed category={category} />
        </div>
      </div>
    </>
  );
};

export default Home;
