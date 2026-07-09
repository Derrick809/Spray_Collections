import React from 'react';

const Contact = () => (
  <main className="min-h-screen bg-[#f8f4ee] text-slate-950">
    <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="grid gap-8 sm:gap-12 lg:grid-cols-[1.2fr_0.8fr] items-start">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-amber-400">Get in touch</p>
          <h1 className="mt-4 text-4xl font-serif font-semibold">Questions about our fragrances?</h1>
          <p className="mt-4 text-slate-700 leading-8">Reach out via WhatsApp, Instagram, or send a message using the contact details below. Our team is ready to help you find your next signature scent.</p>
        </div>
        <div className="rounded-2xl sm:rounded-[32px] bg-white p-6 sm:p-10 shadow-xl shadow-slate-900/5 border border-slate-200">
          <div className="space-y-6 text-slate-700">
            <div>
              <h2 className="text-base font-semibold text-slate-950 mb-2">WhatsApp</h2>
              <a 
                href="https://wa.me/233247283407" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-amber-600 hover:text-amber-700 hover:underline font-semibold transition"
              >
                0247283407 (Click to call/message)
              </a>
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-950 mb-2">Instagram</h2>
              <a 
                href="https://instagram.com/Sheis_cianelle" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-amber-600 hover:text-amber-700 hover:underline font-semibold transition"
              >
                @Sheis_cianelle (Click to visit)
              </a>
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-950 mb-2">Snapchat</h2>
              <a 
                href="https://snapchat.com/add/christel_dior" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-amber-600 hover:text-amber-700 hover:underline font-semibold transition"
              >
                christel_dior (Click to add)
              </a>
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-950">Location</h2>
              <p className="text-sm">Kwadaso-Kumasi</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
);

export default Contact;
