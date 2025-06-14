import axios from "axios";
import ProductCard from "../clientComponents/product";
import { useEffect, useState } from "react";

const WatchSections = () => {
  const [product, setProduct] = useState([]);
  console.log(product);
  console.log(product);
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get("/api/all-product", {
          withCredentials: true,
        });
        const data = res.data.allProduct;
        setProduct(data);
      } catch (error) {}
    };
    getProduct();
  }, []);

  return (
    <>
      <section className="w-full min-h-screen overflow-hidden  ">
        <div className="w-full min-h-screen md:px-4 mt-33 md:mt-12">
          <ProductCard products={product} />
        </div>
      </section>
    </>
  );
};

export default WatchSections;
