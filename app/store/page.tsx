'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { ShoppingCart, Zap, Shield, Package, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

import type { Product } from '@/lib/db';

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
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch products on mount
  useState(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch products:', err);
        setIsLoading(false);
      });
  });

  const handleCheckout = async (productId: string) => {
    if (!stripePromise) {
      alert('Checkout is not configured yet. Please contact us directly.');
      return;
    }
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

      {/* Hero Banner */}
      <section className="relative flex flex-col items-start justify-center px-6 md:px-12 lg:px-24 pt-8 md:pt-16 pb-10 md:pb-16">

        {/* Back link — inline on mobile, absolute on desktop */}
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500 hover:text-white transition-colors mb-8 md:mb-0 md:absolute md:top-8 md:left-12 lg:left-24"
        >
          <ArrowLeft className="w-3 h-3" />
          Back to Models
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="w-full"
        >
          <h1 className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-4 md:mb-6">
            FrostForge — Premium Collection
          </h1>
          <div className="space-y-1">
              <p className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-[0.9]">
                THE FORGE
              </p>
              <p className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-zinc-600 leading-[0.9]">
                SHOP
              </p>
          </div>
          <p className="mt-6 max-w-lg text-zinc-500 text-sm leading-relaxed">
            Each piece is precision-engineered and hand-finished in our Frostburg, MD workshop.
            Limited quantities — once they&apos;re gone, they&apos;re gone.
          </p>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="px-6 md:px-12 lg:px-24">
        <div className="h-px w-full bg-zinc-900" />
      </div>

      {/* Trust Badges */}
      <section className="px-6 md:px-12 lg:px-24 py-8 md:py-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap gap-6 md:gap-16"
        >
          {[
            { icon: Shield, label: 'Secure Checkout', sub: 'Stripe Encrypted' },
            { icon: Package, label: 'Free Shipping', sub: 'Continental US' },
            { icon: Zap, label: 'Fast Processing', sub: '2-3 Business Days' },
          ].map((badge) => (
            <div key={badge.label} className="flex items-center gap-3">
              <badge.icon className="w-4 h-4 md:w-5 md:h-5 text-zinc-600 flex-shrink-0" strokeWidth={1.5} />
              <div>
                <p className="text-[11px] md:text-xs font-medium text-zinc-300 uppercase tracking-wider">
                  {badge.label}
                </p>
                <p className="text-[10px] text-zinc-600 font-mono">{badge.sub}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Product Grid */}
      <section className="px-6 md:px-12 lg:px-24 py-8 md:py-12 min-h-[50vh]">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p className="font-mono text-zinc-500 uppercase tracking-widest text-sm animate-pulse">
              Loading Forge Inventory...
            </p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
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
                <div className="absolute top-3 left-3 md:top-4 md:left-4">
                  <span className="font-mono text-[9px] md:text-[10px] text-zinc-500 uppercase tracking-widest bg-black/60 backdrop-blur-sm px-2 py-1 md:px-3 md:py-1.5 border border-zinc-800">
                    {product.series}
                  </span>
                </div>

                {/* Price tag */}
                <div className="absolute top-3 right-3 md:top-4 md:right-4">
                  <span className="font-mono text-xs md:text-sm font-bold text-white bg-black/60 backdrop-blur-sm px-2 py-1 md:px-3 md:py-1.5 border border-zinc-800">
                    ${product.price}
                  </span>
                </div>

                {/* Bottom content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <p className="font-mono text-[9px] md:text-[10px] text-zinc-500 uppercase tracking-widest mb-1">
                    {product.character}
                  </p>
                  <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-tight mb-2 md:mb-3">
                    {product.name}
                  </h2>
                  <p className="text-zinc-400 text-[11px] md:text-xs leading-relaxed mb-3 md:mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Feature pills */}
                  <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-5">
                    {product.features.map((feature) => (
                      <span
                        key={feature}
                        className="font-mono text-[8px] md:text-[9px] uppercase tracking-wider text-zinc-500 border border-zinc-800 px-1.5 py-0.5 md:px-2 md:py-1 bg-black/40 backdrop-blur-sm"
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
                    className="w-full flex items-center justify-center gap-2 bg-white text-black font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest px-4 py-3 md:py-4 transition-all duration-300 hover:bg-zinc-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loadingId === product.id ? (
                      <>
                        <svg
                          className="animate-spin h-3 w-3 md:h-4 md:w-4"
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
                        <ShoppingCart className="w-3 h-3 md:w-4 md:h-4" />
                        Buy Now — ${product.price}
                      </>
                    )}
                  </button>
                </div>
              </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* Bottom info */}
      <section className="px-6 md:px-12 lg:px-24 py-12 md:py-16">
        <div className="border border-zinc-900 bg-zinc-950/30 p-6 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div>
              <h3 className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-3 md:mb-4">
                Payment Security
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                All transactions are processed securely through Stripe. Your payment information
                never touches our servers. 256-bit SSL encryption protects every purchase.
              </p>
            </div>
            <div>
              <h3 className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-3 md:mb-4">
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
      <footer className="w-full border-t border-white/5 bg-black/20 py-8 md:py-10 text-center text-zinc-500">
        <p className="text-xs md:text-sm">© 2024 FrostForge. Based in Frostburg, Maryland.</p>
      </footer>
    </main>
  );
}
