import React from "react";

import { Product, FooterBanner, HeroBanner } from "@/components";
import client from "../lib/client";

const Home = ({ products, banners }) => {
  return (
    <>
    {/* create heroBanner prop with banners data from sanity, and then pass it to HeroBanner */}
      <HeroBanner heroBanner={banners.length && banners[0]} />
      {console.log(banners, 'banners')}
      <div className="products-heading">
        <h2>Bestsellers.</h2>
      </div>
      <div className="products-container">
        {products?.map((product) => <Product key={product._id} product={product}/>)}
      </div>
      <FooterBanner footerBanner={banners && banners[0]} />
    </>
  );
};


// get product and banner details from sanity
// getServerSideProps
// check groq cheat sheet in sanity docs
export const getServerSideProps = async () => {
  const productQuery = '*[_type == "product"]';
  const bannerQuery = '*[_type == "banner"]';

  const [products, banners] = await Promise.all([
    client.fetch(productQuery),
    client.fetch(bannerQuery),
  ]);

  return {
    props: {
      products,
      banners,
    },
  };
};



export default Home;
