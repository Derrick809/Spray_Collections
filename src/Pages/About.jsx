import React from 'react';

const About = () => (
  <main className="min-h-screen bg-[#f3f4f6] text-slate-950">
    <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
      <div className="mb-10 sm:mb-12 text-center">
        <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-amber-400">About Cianelle_Luxe</p>
        <h1 className="mt-3 sm:mt-4 text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-slate-950">A luxury fragrance brand built for modern elegance.</h1>
      </div>
      <div className="grid gap-8 sm:gap-10 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6 text-slate-600">
          <p>The Cianelle_Luxe experience blends premium fragrance craftsmanship with a modern shopping experience. Our range includes body sprays, perfume oils, long-lasting scents, and everyday sprays designed to elevate your presence.</p>
          <p>We believe in a clean, luxurious interface that allows customers to find the perfect scent quickly. Every product is curated to reflect a premium lifestyle, offering elegant packaging, refined notes, and long-lasting performance.</p>
          <p>From the homepage carousel to the featured collection, our interface mirrors the brand’s identity: polished, minimal, and unforgettable.</p>
        </div>
        <div className="rounded-2xl sm:rounded-[32px] bg-white p-6 sm:p-8 lg:p-10 shadow-lg shadow-slate-900/5 border border-slate-200">
          <h2 className="text-2xl font-serif font-semibold text-slate-950 mb-4">Our Commitment</h2>
          <ul className="space-y-4 text-slate-600">
            <li>Curated luxury fragrances with premium ingredients.</li>
            <li>Responsive design across devices.</li>
            <li>Easy navigation with category-based browsing.</li>
            <li>High-quality product imagery and presentation.</li>
          </ul>
        </div>
      </div>
    </section>
  </main>
);

export default About;
