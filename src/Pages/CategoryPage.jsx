import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { products as initialProducts, categoryFolders } from '../data/productData';
import { useCart } from '../context/CartContext';
import ProductCard from '../Components/ProductCard';

const CategoryPage = () => {
  const { category } = useParams();
  const { products: contextProducts, addToCart } = useCart();
  const productList = contextProducts.length ? contextProducts : initialProducts;
  const categoryInfo = categoryFolders.find((item) => item.slug === category);
  const filteredProducts = productList.filter((item) => item.slug === category);

  if (!categoryInfo) {
    return (
      <main className="min-h-screen bg-[#fcfcfc] text-slate-950 px-3 sm:px-6 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl font-serif font-semibold">Category not found</h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">Please choose one of our collections from the navigation menu.</p>
          <Link to="/" className="mt-6 inline-flex rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-950 hover:bg-amber-400 min-h-[44px] items-center\">Return Home</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fcfcfc] text-slate-950">
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="mb-8 sm:mb-10 text-center">
          <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-amber-400">{categoryInfo.name}</p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-serif font-semibold\">{categoryInfo.name} Collection</h1>
          <p className="mt-3 text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto\">{categoryInfo.description}</p>
        </div>
        {filteredProducts.length > 0 ? (
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3\">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl sm:rounded-[32px] bg-white p-6 sm:p-12 text-center shadow-sm border border-slate-200">
            <h2 className="text-xl sm:text-2xl font-serif font-semibold">No products found</h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">We are updating this collection. Please explore other categories or check back soon.</p>
            <Link to="/menu" className="mt-6 inline-flex rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-950 hover:bg-amber-400 min-h-[44px] items-center">Browse All Products</Link>
          </div>
        )}
      </section>
    </main>
  );
};

export default CategoryPage;
