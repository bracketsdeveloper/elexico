import React, { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet';
import SkeletonLoader from '../components/SkeletonLoader'; // Import the skeleton loader
import NatureImageCard from '../components/NatureImageCard';
import imagesrc from '../assets/banners/desk/desk6.jpg'
import NatureImageCardright from '../components/NaturalImageCardright';
import imagesrc2 from '../assets/cow.png'
import imagesrc3 from '../assets/spices.png'
import imagesrc4 from '../assets/honey.png'
import WhatsAppChat from '../components/Whatsapp';

const CategoryList = lazy(() => import('../components/CategoryList'));
const BannerProduct = lazy(() => import('../components/BannerProduct'));
const HorizontalCardProduct = lazy(() => import('../components/HorizontalCardProduct'));
const VerticalCardProduct = lazy(() => import('../components/VerticalCardProduct'));

const generateFallingLeaves = () => {
  const leaves = [];
  for (let i = 0; i < 10; i++) { // Generate 10 leaves
    leaves.push(<div key={i} className="leaf" style={{ left: `${Math.random() * 100}vw`, animationDelay: `${Math.random() * 5}s` }} />);
  }
  return leaves;
};

const Home = () => {
  return (
    
    <div className='main bg-gray-900'>
      <WhatsAppChat/>
      <Helmet>
        <title>ElexicoDigital</title>
      </Helmet>
      
      <Suspense fallback={<SkeletonLoader />}>

        {/* <CategoryList /> */}
        <BannerProduct/>
        {/* <NatureImageCard
        // imageSrc={imagesrc}
        imageAlt="Image alt"
        heading="image heading"
        description="description"
        category ='Consumer Electronics'
        catdis='category description'
      /> */}
        <HorizontalCardProduct category={"Consumer Electronics"} heading={"Consumer Electronics"} />
        <VerticalCardProduct category={"Consumer Electronics"} heading={"Heading of the description"} />
        <HorizontalCardProduct category={"Standard SMPS"} heading={"Standard SMPS"} />
        {/* <NatureImageCardright
        // imageSrc={imagesrc2}
        imageAlt="Image alt"
        heading="image heading"
        description="description"
        category ='Consumer Electronics'
        catdis='category description'
      />   */}
        <VerticalCardProduct category={"Smart Chargers"} heading={"Smart Chargers"} />
        <HorizontalCardProduct category={"Smart Home Equipment"} heading={"Smart Home Equipment"} />

        
        <HorizontalCardProduct category={"LED Lighting"} heading={"LED Lighting"} />
        <VerticalCardProduct category={"Audio Systems"} heading={"Audio Systems"} />
        <VerticalCardProduct category={"Stage Audio / Power Amplifiers"} heading={"Stage Audio / Power Amplifiers"} />
      </Suspense>
      
      {/* Render falling leaves */}
      <div className="falling-leaves-container">
        {generateFallingLeaves()}
      </div>
    </div>
  );
}

export default Home;
