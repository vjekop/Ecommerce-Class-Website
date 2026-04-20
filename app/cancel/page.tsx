'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { XCircle, ShoppingCart, ArrowLeft } from 'lucide-react';

export default function CancelPage() {
  return (
    <main className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md w-full border border-zinc-800 bg-black p-12 space-y-8"
      >
        <div className="flex justify-center">
          <div className="relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 10 }}
              className="bg-zinc-800 rounded-full p-4"
            >
              <XCircle className="w-12 h-12 text-zinc-400" />
            </motion.div>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter text-white uppercase">
            Order Cancelled
          </h1>
          <p className="text-zinc-500 text-sm font-mono uppercase tracking-widest">
            Payment Postponed
          </p>
        </div>

        <p className="text-zinc-400 text-sm leading-relaxed">
          The transaction was interrupted or cancelled. Don't worry, your cart is safe. You can return to the store to complete your purchase whenever you're ready.
        </p>

        <div className="h-px w-full bg-zinc-900" />

        <div className="flex flex-col gap-3">
          <Link
            href="/store"
            className="flex items-center justify-center gap-2 bg-white text-black font-mono text-xs font-bold uppercase tracking-widest px-6 py-4 transition-all hover:bg-zinc-200"
          >
            <ShoppingCart className="w-4 h-4" />
            Return to Store
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 border border-zinc-800 text-zinc-400 font-mono text-xs font-bold uppercase tracking-widest px-6 py-4 transition-all hover:text-white hover:border-zinc-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Home
          </Link>
        </div>

        <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
          No charges were made to your card.
        </p>
      </motion.div>
    </main>
  );
}
