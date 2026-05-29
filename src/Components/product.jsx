import { useEffect, useState } from "react";

import { getProducts } from "../services/api";

const Home = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    const fetchProducts = async () => {

      const data = await getProducts();

      setProducts(data);
    };

    fetchProducts();

  }, []);

  return (
    <div>
      {products.map((product) => (
        <h1 key={product._id}>
          {product.name}
        </h1>
      ))}
    </div>
  );
};

export default Home;