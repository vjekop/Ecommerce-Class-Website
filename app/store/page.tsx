'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { ShoppingCart, Zap, Shield, Package, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const products = [
  {
    id: 'berserk',
    name: 'The Black Swordsman',
    character: 'Guts',
    series: 'Berserk',
    price: 499.99,
    description:
      'Premium 3D-printed Guts figurine. Hand-finished with industrial-grade resin and matte black coating. Every scar, every sinew — faithfully forged.',
    image: '/images/jakub-zerdzicki-4WwBMdcq-14-unsplash.jpg',
    features: ['Industrial Resin', 'Hand-Finished', 'Limited Edition'],
  },
  {
    id: 'ironman',
    name: 'The Armored Avenger',
    character: 'Tony Stark',
    series: 'Marvel Universe',
    price: 499.99,
    description:
      'Premium 3D-printed Iron Man figurine. Arc reactor LED detail with metallic gold & crimson finish. Stark Industries engineering at its finest.',
    image: '/images/jakub-zerdzicki-AR8vAAw8kv8-unsplash.jpg',
    features: ['LED Detail', 'Metallic Finish', 'Collector\'s Item'],
  },
  {
    id: 'drone',
    name: 'V-9 Scout Drone',
    character: 'Autonomous Recon',
    series: 'Future Warfare',
    price: 499.99,
    description:
      'Premium 3D-printed V-9 Scout Drone model. Stealth composite finish with articulated rotors. The silent eye of the battlefield, on your shelf.',
    image: '/images/karl-hornfeldt-pikP0UyB7I0-unsplash.jpg',
    features: ['Articulated Parts', 'Stealth Finish', 'Display Ready'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function StorePage() {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleCheckout = async (productId: string) => {
    setLoadingId(productId);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('Checkout error:', data.error);
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-black">
      {/* Back to Models button */}
      <div className="absolute top-8 left-6 md:left-12 lg:left-24 z-50">
        <Link 
          href="/" 
          className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3 h-3" />
          Back to Models
        </Link>
      </div>
      {/* Hero Banner */}
      <section className="relative flex flex-col items-start justify-center px-6 md:px-12 lg:px-24 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <h1 className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500 mb-6">
            FrostForge — Premium Collection
          </h1>
          <div className="space-y-1">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-[0.9]">
              THE FORGE
            </h2>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-zinc-600 leading-[0.9]">
              SHOP
            </h2>
          </div>
          <p className="mt-8 max-w-lg text-zinc-500 text-sm leading-relaxed">
            Each piece is precision-engineered and hand-finished in our Frostburg, MD workshop.
            Limited quantities — once they&apos;re gone, they&apos;re gone.
          </p>
        </motion.div>

        {/* Floating price tag */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute top-24 right-6 md:right-12 lg:right-24"
        >
          <div className="border border-zinc-800 bg-zinc-950/80 backdrop-blur-sm px-6 py-4">
            <p className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest mb-1">
              Starting At
            </p>
            <p className="text-3xl font-bold text-white tracking-tight">
              $499<span className="text-lg text-zinc-500">.99</span>
            </p>
          </div>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="px-6 md:px-12 lg:px-24">
        <div className="h-px w-full bg-zinc-900" />
      </div>

      {/* Trust Badges */}
      <section className="px-6 md:px-12 lg:px-24 py-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap gap-8 md:gap-16"
        >
          {[
            { icon: Shield, label: 'Secure Checkout', sub: 'Stripe Encrypted' },
            { icon: Package, label: 'Free Shipping', sub: 'Continental US' },
            { icon: Zap, label: 'Fast Processing', sub: '2-3 Business Days' },
          ].map((badge) => (
            <div key={badge.label} className="flex items-center gap-3">
              <badge.icon className="w-5 h-5 text-zinc-600" strokeWidth={1.5} />
              <div>
                <p className="text-xs font-medium text-zinc-300 uppercase tracking-wider">
                  {badge.label}
                </p>
                <p className="text-[10px] text-zinc-600 font-mono">{badge.sub}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Product Grid */}
      <section className="px-6 md:px-12 lg:px-24 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="group relative border border-zinc-900 bg-zinc-950/50 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-zinc-700"
            >
              {/* Product Image */}
              <div className="relative aspect-[4/5] overflow-hidden bg-zinc-950">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover opacity-70 transition-all duration-700 group-hover:opacity-90 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Series tag */}
                <div className="absolute top-4 left-4">
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest bg-black/60 backdrop-blur-sm px-3 py-1.5 border border-zinc-800">
                    {product.series}
                  </span>
                </div>

                {/* Price tag */}
                <div className="absolute top-4 right-4">
                  <span className="font-mono text-sm font-bold text-white bg-black/60 backdrop-blur-sm px-3 py-1.5 border border-zinc-800">
                    ${product.price}
                  </span>
                </div>

                {/* Bottom content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-1">
                    {product.character}
                  </h3>
                  <h2 className="text-2xl font-bold text-white tracking-tight leading-tight mb-3">
                    {product.name}
                  </h2>
                  <p className="text-zinc-400 text-xs leading-relaxed mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Feature pills */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {product.features.map((feature) => (
                      <span
                        key={feature}
                        className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 border border-zinc-800 px-2 py-1 bg-black/40 backdrop-blur-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Buy Button */}
                  <button
                    id={`buy-${product.id}`}
                    onClick={() => handleCheckout(product.id)}
                    disabled={loadingId === product.id}
                    className="w-full flex items-center justify-center gap-2 bg-white text-black font-mono text-xs font-bold uppercase tracking-widest px-6 py-4 transition-all duration-300 hover:bg-zinc-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loadingId === product.id ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        Buy Now — ${product.price}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Bottom info */}
      <section className="px-6 md:px-12 lg:px-24 py-16">
        <div className="border border-zinc-900 bg-zinc-950/30 p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-4">
                Payment Security
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                All transactions are processed securely through Stripe. Your payment information
                never touches our servers. 256-bit SSL encryption protects every purchase.
              </p>
            </div>
            <div>
              <h3 className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-4">
                Craftsmanship Guarantee
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Every piece is inspected before shipping. If you&apos;re not satisfied with the
                quality, we&apos;ll make it right. That&apos;s the FrostForge promise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 bg-black/20 py-10 text-center text-zinc-500">
        <p>© 2024 FrostForge. Based in Frostburg, Maryland.</p>
      </footer>
    </main>
  );
}
